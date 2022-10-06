import React, { useMemo } from "react";
import { View, FlatList } from "react-native";
import { useTheme } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as NavigationService from "react-navigation-helpers";
import Icon from "react-native-dynamic-vector-icons";
import RNBounceable from "@freakycoder/react-native-bounceable";

/* Local Imports */
import createStyles from "./CallLogScreen.style";
import MockData from "./mock/MockData";
import CardItem from "./components/card-item/CardItem";

/* Shared Imports */
import { SCREENS } from "../../shared/constants";
import Text from "../../shared/components/text-wrapper/TextWrapper";
import fonts from "../../shared/theme/fonts";

import test from '../../api/TestInterface'

interface CallLogScreenProps {}

const CallLogScreen: React.FC<CallLogScreenProps> = () => {
    const theme = useTheme();
    const { colors } = theme;
    const styles = useMemo(() => createStyles(theme), [theme]);

    test();

    const handleItemPress = () => {
      NavigationService.push(SCREENS.CALLLOG);
    };
  
    /* -------------------------------------------------------------------------- */
    /*                               Render Methods                               */
    /* -------------------------------------------------------------------------- */

    // TODO: Add menu hamburger here if using menu stack
    const Header = () => (
        <View style={styles.header}>
        </View>
    );
    
    const CallLogsHeader = () => (
      <>
        <Text h1 bold color={colors.text}>
          Call Log
        </Text>
        <Text
          fontFamily={fonts.montserrat.lightItalic}
          color={colors.placeholder}
        >
          Here are the calls blocked by GetOut.
        </Text>
      </>
    );     

    const CallLogs = () => (
      <View style={styles.listContainer}>
        <FlatList
          data={MockData}
          renderItem={({ item }) => (
            <CardItem data={item} onPress={handleItemPress} />
          )}
        />
      </View>
    );

    const Content = () => (
      <View style={styles.contentContainer}>
        <CallLogsHeader />
        <CallLogs />
      </View>
    );

    return (
      <SafeAreaView style={styles.container}>
        <Header />
        <Content />
      </SafeAreaView>
    );
};

export default CallLogScreen;