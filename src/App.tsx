import "react-native-gesture-handler";
import React from 'react';
import { StatusBar, useColorScheme, LogBox, NativeModules } from "react-native";
import SplashScreen from "react-native-splash-screen";

/** Local Imports */
import Navigation from './navigation';
import { isAndroid } from "@freakycoder/react-native-helpers";
import { getBlacklist } from "./api/BlacklistInterface";

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

  //iOS call native module
  const blacklist = getBlacklist('');
  NativeModules.CallModuleiOS.updateBlacklist(blacklist.map(x => x.phone_number));
 
  return (
    <Navigation/>
  );
};

export default App;