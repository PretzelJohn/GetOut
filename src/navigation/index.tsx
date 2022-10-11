import React from "react";
import { useColorScheme } from "react-native";
import Icon from "react-native-dynamic-vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { isReadyRef, navigationRef } from "react-navigation-helpers";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

/* Local Imports */
import { SCREENS } from "../shared/constants";
import { LightTheme, DarkTheme, palette } from "../shared/theme/themes";

/* Screens */
import HomeScreen from "../screens/Home/HomeScreen";
import CallLogScreen from "../screens/CallLog/CallLogScreen";

/* Navigator Types */
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const Navigation = () => {
    const scheme = useColorScheme();
    const isDarkMode = scheme === "dark";

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
                iconName = focused ? "history" : "history-outline";
            break;
            case SCREENS.WHITELIST:
                iconName = focused ? "phone" : "phone-outline";
            break;
            case SCREENS.BLACKLIST:
                iconName = focused ? "phone-slash" : "phone-slash-outline";
            break;
            case SCREENS.SETTINGS:
                iconName = focused ? "gear" : "gear-outline";
            break;
        }
        return <Icon name={iconName} type="Ionicons" size={size} color={color} />;
    };
    
    const RenderTabNavigation = () => {
        return (
            <Tab.Navigator
                screenOptions={({ route }) => ({
                headerShown: false, tabBarIcon: ({ focused, color, size }) => RenderTabIcon(route, focused, color, size),
                tabBarActiveTintColor: palette.primary,
                tabBarInactiveTintColor: "gray",
                tabBarStyle: {
                    backgroundColor: isDarkMode ? palette.black : palette.white,
                },
                })}
            >
                <Tab.Screen name={SCREENS.CALLLOG} component={CallLogScreen} />
                <Tab.Screen name={SCREENS.WHITELIST} component={HomeScreen} />
                <Tab.Screen name={SCREENS.BLACKLIST} component={HomeScreen} />
                <Tab.Screen name={SCREENS.SETTINGS} component={HomeScreen} />
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
        </Stack.Navigator>

        </NavigationContainer>
    );
};

export default Navigation;