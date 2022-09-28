import React, { useMemo } from "react";
import { View, FlatList, Image } from "react-native";
import { useTheme } from "@react-navigation/native";
import * as NavigationService from "react-navigation-helpers";
import { SafeAreaView } from "react-native-safe-area-context";

/* Local Imports */
import createStyles from "./HomeScreen.style";

/* Shared Imports */
import { SCREENS } from "../../shared/constants";
import Text from "../../shared/components/text-wrapper/TextWrapper";
import fonts from "../../shared/theme/fonts";

interface HomeScreenProps {}

const HomeScreen: React.FC<HomeScreenProps> = () => {
    const theme = useTheme();
    const { colors } = theme;
    const styles = useMemo(() => createStyles(theme), [theme]);
  
    const handleItemPress = () => {
      NavigationService.push(SCREENS.HOME);
    };
  
    /* -------------------------------------------------------------------------- */
    /*                               Render Methods                               */
    /* -------------------------------------------------------------------------- */

    const Header = () => (
      <View style={styles.header}>
      </View>
    );
  
    const Welcome = () => (
      <>
        <Text h1 bold color={colors.text}>
          Hello, user.
        </Text>
        <Text
          fontFamily={fonts.montserrat.lightItalic}
          color={colors.placeholder}
        >
          Welcome Back
        </Text>
      </>
    );
  
    const Content = () => (
      <View style={styles.contentContainer}>
        <Welcome />
      </View>
    );
  
    return (
      <SafeAreaView style={styles.container}>
        <Header />
        <Content />
      </SafeAreaView>
    );
};
  
export default HomeScreen;