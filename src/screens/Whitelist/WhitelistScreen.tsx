import React, { useMemo } from "react";
import { View, FlatList } from "react-native";
import { useTheme } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

/* Local Imports */
import createStyles from "./WhitelistScreen.style";
import ListItem from "../../shared/components/list-item/ListItem";

/* Shared Imports */
import Text from "../../shared/components/text-wrapper/TextWrapper";
import fonts from "../../shared/theme/fonts";

import { getWhitelist, insert } from "../../api/WhitelistInterface";


interface WhitelistScreenProps {}

const WhitelistScreen: React.FC<WhitelistScreenProps> = () => {
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


    const Header = () => (
      <>
        <Text h1 bold color={colors.text}>
          Allowed
        </Text>
        <Text
          fontFamily={fonts.montserrat.lightItalic}
          color={colors.placeholder}
        >
          Here are the calls allowed by GetOut.
        </Text>
      </>
    );

    
    const Whitelist = () => (
      <View style={styles.listContainer}>
        <FlatList
          data={getWhitelist()}
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
          <Whitelist />
        </View>
      </SafeAreaView>
    );
};

export default WhitelistScreen;