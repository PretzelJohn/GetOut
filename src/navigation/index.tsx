import React from "react";
import { useColorScheme } from "react-native";
import Icon from "react-native-dynamic-vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { isReadyRef, navigationRef } from "react-navigation-helpers";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

/* Local Imports */
import { SCREENS } from "../shared/constants";
import { LightTheme, DarkTheme, palette } from "../shared/theme/themes";

/* Screens */
import HomeScreen from "../screens/Home/HomeScreen";

/* Navigator Types */
const Tab = createBottomTabNavigator();
//const Stack = createStackNavigator();

const Navigation = () => {
    const scheme = useColorScheme();
    const isDarkMode = scheme === "dark";

    React.useEffect((): any => {
        return () => (isReadyRef.current = false);
    }, []);

    const renderTabIcon = (
        route: any,
        focused: boolean,
        color: string,
        size: number,
      ) => {
        let iconName = "home";
        switch (route.name) {
          case SCREENS.HOME:
            iconName = focused ? "home" : "home-outline";
            break;
          default:
            iconName = focused ? "home" : "home-outline";
            break;
        }
        return <Icon name={iconName} type="Ionicons" size={size} color={color} />;
      };
    
    const renderTabNavigation = () => {
        return (
            <Tab.Navigator
                screenOptions={({ route }) => ({
                headerShown: false, tabBarIcon: ({ focused, color, size }) => renderTabIcon(route, focused, color, size),
                tabBarActiveTintColor: palette.primary,
                tabBarInactiveTintColor: "gray",
                tabBarStyle: {
                    backgroundColor: isDarkMode ? palette.black : palette.white,
                },
                })}
            >
            <Tab.Screen name={SCREENS.HOME} component={HomeScreen} />
            </Tab.Navigator>
        );
    };  

    return (
        <NavigationContainer 
            ref={navigationRef}
            onReady={() => {
                isReadyRef.current = true;
            }}
            theme = {isDarkMode ? DarkTheme : LightTheme}
        >

        </NavigationContainer>
    );
};

export default Navigation;