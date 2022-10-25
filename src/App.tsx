import "react-native-gesture-handler";
import React from "react";
import { StatusBar, useColorScheme, LogBox, Platform } from "react-native";
import SplashScreen from "react-native-splash-screen";

/** Local Imports */
import Navigation from './navigation';
import { isAndroid } from "@freakycoder/react-native-helpers";
import { Role, getRole } from "./api/PermissionInterface";

LogBox.ignoreAllLogs();

const App = () => {
  const scheme = useColorScheme();
  const isDarkMode = scheme === "dark";

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
  }

  return (
    <>
      <Navigation />
    </>
  );
};

export default App;