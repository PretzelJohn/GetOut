import "react-native-gesture-handler";
import React, { useEffect, useState } from 'react';
import { StatusBar, useColorScheme, LogBox, Platform } from "react-native";
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
      title: 'Hello, welcome to: ',
      desc: 'Welcome Screen One Description!',
      image: require('../assets/img/getout_dark.png'),
      backgroundColor: 'blue',
    },
    {
      key: 2,
      title: 'Welcome Two',
      desc: 'Welcome Screen Two Description!',
      image: require('../assets/img/getout_dark.png'),
      backgroundColor: 'green',
    },
  ];

  const handleDone = async () => {
    let result = await getPermission(PERMISSIONS.ANDROID.READ_CONTACTS, true);
    if (result) setIsFirstTimeLoad(false);

    if (Platform.OS === 'android'){
      getRole(Role.CALL_SCREENING);
      StartService(null);

    }
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

};

export default App;