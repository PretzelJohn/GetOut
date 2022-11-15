import "react-native-gesture-handler";
import React from 'react';
import { StatusBar, useColorScheme, LogBox } from "react-native";
import SplashScreen from "react-native-splash-screen";

/** Local Imports */
import Navigation from './navigation';
import { isAndroid } from "@freakycoder/react-native-helpers";
import { getSettings } from "./api/SettingsInterface";

LogBox.ignoreAllLogs();

const App = () => {
  let theme = getSettings().theme;    // User-defined theme
  let scheme = useColorScheme();      // System color scheme
  let isDarkMode = (theme == 'system') ? (scheme === 'dark') : (theme === 'dark');

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
 
  return (
    <Navigation/>
  );
};

export default App;