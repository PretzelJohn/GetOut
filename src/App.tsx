import "react-native-gesture-handler";
import React, { useEffect, useState } from 'react';
import { StatusBar, useColorScheme, LogBox, Text, View, Platform } from "react-native";
import SplashScreen from "react-native-splash-screen";

/** Local Imports */
import Navigation from './navigation';
import Welcome from './screens/Welcome/Welcome';
import { isAndroid } from "@freakycoder/react-native-helpers";
import { getPermission, getRole, Role } from "./api/PermissionInterface";
import { PERMISSIONS } from "react-native-permissions";
import { StartService } from "./api/CallHandler";

LogBox.ignoreAllLogs();

const App = () => {
  const scheme = useColorScheme();
  const isDarkMode = scheme === "dark";
  const [loading, setLoading] = useState(true);
  const [isFirstTimeLoad, setIsFirstTimeLoad] = useState(false);

  const checkForFirstTimeLoaded = async () => {
    // const result = await AsyncStorage.getItem('isFirstTimeOpen');
    let result = await getPermission(PERMISSIONS.ANDROID.READ_CONTACTS, false);

    if (!result) setIsFirstTimeLoad(true);
    
    setLoading(false);
  };

  useEffect(() => {
    checkForFirstTimeLoaded();
  }, []);

  const slides = [
    {
      key: 1,
      title: 'Welcome One',
      desc: 'Welcome Screen One Description!',
      backgroundColor: 'red',
    },
    {
      key: 2,
      title: 'Welcome Two',
      desc: 'Welcome Screen Two Description!',
      backgroundColor: 'blue',
    },
    {
      key: 3,
      title: 'Welcome Three',
      desc: 'Welcome Screen Three Description!',
      backgroundColor: 'green',
    },
  ];

  const handleDone = async () => {
    let result = await getPermission(PERMISSIONS.ANDROID.READ_CONTACTS, true);
    if (result) setIsFirstTimeLoad(false);
    // AsyncStorage.setItem('isFirstTimeOpen', 'no');
  };

  if (loading) return null;

  if (isFirstTimeLoad)
    return (
      <>
        <StatusBar hidden />
        <Welcome onDone={handleDone} slides={slides} />
      </>
    );

  if (!isFirstTimeLoad)
    return (
      <Navigation/>
    );

  React.useEffect(() => {
    StatusBar.setBarStyle(isDarkMode ? "light-content" : "dark-content");
    if (isAndroid) {
      StatusBar.setBackgroundColor("rgba(0,0,0,0)");
      StatusBar.setTranslucent(true);
    }

    setTimeout(() => {
      SplashScreen.hide();
    }, 750);
  }, [scheme, isDarkMode]);

  //Request default app for spam blocking
  if(Platform.OS === "android") {
    getRole(Role.CALL_SCREENING);
    StartService(null);
  }

  return (
    <>
      <Navigation/>
    </>
  );
};

export default App;