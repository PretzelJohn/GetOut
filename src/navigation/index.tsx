import React from "react";
import { useColorScheme } from "react-native";
import Icon from "react-native-dynamic-vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { isReadyRef, navigationRef } from "react-navigation-helpers";
import { BottomTabView, createBottomTabNavigator } from "@react-navigation/bottom-tabs";

/* Local Imports */
import { SCREENS } from "../shared/constants";
import { LightTheme, DarkTheme, palette } from "../shared/theme/themes";

/* Screens */
import WelcomeScreen from "../screens/Welcome/WelcomeScreen";
import CallLogScreen from "../screens/CallLog/CallLogScreen";
import WhitelistScreen from "../screens/Whitelist/WhitelistScreen";
import BlacklistScreen from "../screens/Blacklist/BlacklistScreen";
import SettingsScreen from "../screens/Settings/SettingsScreen";
import { Colors } from "react-native/Libraries/NewAppScreen";

/* Navigator Types */
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const Navigation = () => {
    const scheme = useColorScheme();
    const isDarkMode = scheme === 'dark';

    React.useEffect((): any => {
        return () => (isReadyRef.current = false);
    }, []);

    const RenderTabIcon = (
        route: any,
        focused: boolean,
        color: string,
        size: number,
    ) => {
        let iconName = "history";
        switch (route.name) {
            case SCREENS.CALLLOG:
                iconName = focused ? "call" : "call-outline";
            break;
            case SCREENS.WHITELIST:
                iconName = focused ? "shield-checkmark" : "shield-checkmark-outline";
            break;
            case SCREENS.BLACKLIST:
                iconName = focused ? "close" : "close-outline";
            break;
            case SCREENS.SETTINGS:
                iconName = focused ? "cog" : "cog-outline";
            break;
        }
        return <Icon name={iconName} type="Ionicons" size={43} color={color} />;
    };
    
    const RenderTabNavigation = () => {
        return (
            <Tab.Navigator
                screenOptions={({ route }) => ({
                headerShown: false, 
                tabBarIcon: ({ focused, color, size }) => RenderTabIcon(route, focused, color, size),
                tabBarActiveTintColor: palette.black,
                tabBarInactiveTintColor: palette.shadow,
                tabBarHideOnKeyboard: true,
                tabBarStyle: {
                    backgroundColor: isDarkMode ? palette.primary : palette.primary,
                    height: 100
                },
                tabBarLabelStyle: {
                    fontSize: 18,
                    fontFamily: "JockeyOne-Regular",
                    bottom: 15
                  },
                })}
                >
                <Tab.Screen name={SCREENS.CALLLOG} component={CallLogScreen} />
                <Tab.Screen name={SCREENS.WHITELIST} component={WhitelistScreen} />
                <Tab.Screen name={SCREENS.BLACKLIST} component={BlacklistScreen} />
                <Tab.Screen name={SCREENS.SETTINGS} component={SettingsScreen} />
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
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={SCREENS.HOME} component={RenderTabNavigation} />
            <Stack.Screen name={SCREENS.CALLLOG} component={CallLogScreen} />
            <Stack.Screen name={SCREENS.WHITELIST} component={WhitelistScreen} />
            <Stack.Screen name={SCREENS.BLACKLIST} component={BlacklistScreen} />
            <Stack.Screen name={SCREENS.SETTINGS} component={SettingsScreen} />
        </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;