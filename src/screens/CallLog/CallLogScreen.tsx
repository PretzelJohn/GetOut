import React, { useMemo } from "react";
import { View, FlatList, Image } from "react-native";
import { useTheme } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as NavigationService from "react-navigation-helpers";

/* Local Imports */
import createStyles from "./CallLogScreen.style";
import MockData from "./mock/MockData";
import CardItem from "./components/card-item/CardItem";

/* Shared Imports */
import { SCREENS } from "@shared-constants";

interface CallLogScreenProps {}

const CallLogScreen: React.FC<CallLogScreenProps> = () => {
    const theme = useTheme();
    const { colors } = theme;
    const styles = useMemo(() => createStyles(theme), [theme]);
  
    const handleItemPress = () => {
      NavigationService.push(SCREENS.CALLLOG);
    };
  
    /* -------------------------------------------------------------------------- */
    /*                               Render Methods                               */
    /* -------------------------------------------------------------------------- */

    const Header = () => (
        <View style={styles.header}>
        </View>
      );
    
      const List = () => (
        <View style={styles.listContainer}>
          <FlatList
            data={MockData}
            renderItem={({ item }) => (
              <CardItem data={item} onPress={handleItemPress} />
            )}
          />
        </View>
      );

    return (
        <SafeAreaView style={styles.container}>
          <Header />
        </SafeAreaView>
      );
};

export default CallLogScreen;