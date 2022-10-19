import React, { useMemo } from "react";
import { View, FlatList } from "react-native";
import { useTheme } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

/* Local Imports */
import createStyles from "./BlacklistScreen.style";
import ListItem from "../../shared/components/list-item/ListItem";

/* Shared Imports */
import Text from "../../shared/components/text-wrapper/TextWrapper";
import fonts from "../../shared/theme/fonts";

import {getBlacklist, insert, edit, remove} from "../../api/BlacklistInterface";


interface BlacklistScreenProps {}

const BlacklistScreen: React.FC<BlacklistScreenProps> = () => {
    const theme = useTheme();
    const { colors } = theme;
    const styles = useMemo(() => createStyles(theme), [theme]);

    const handleItemPress = () => {
      //NavigationService.push(SCREENS.CALLLOG);
    };


    //Testing whitelist, blacklist, and call log - will be moved into their own files
    insert('678*');
    insert('678420*');
    insert('6784205109');

    /* -------------------------------------------------------------------------- */
    /*                               Render Methods                               */
    /* -------------------------------------------------------------------------- */


    // TODO: Add menu hamburger here if using menu stack    
    const Header = () => (
      <>
        <Text h1 bold color={colors.text}>
          Blocked
        </Text>
        <Text
          fontFamily={fonts.montserrat.lightItalic}
          color={colors.placeholder}
        >
          Here are the numbers blocked by GetOut.
        </Text>
      </>
    );

    
    const Blacklist = () => (
      <View style={styles.listContainer}>
        <FlatList
          data={getBlacklist()}
          renderItem={({ item }) => (
            <ListItem data={item} onPress={handleItemPress} />
          )}
        />
      </View>
    );
    
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.contentContainer}>
          <Header />
          <Blacklist />
        </View>
      </SafeAreaView>
    );
};

export default BlacklistScreen;