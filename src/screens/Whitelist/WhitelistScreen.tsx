import React, { useMemo } from "react";
import { View, FlatList } from "react-native";
import { useTheme } from "@react-navigation/native";
import SearchBar from "react-native-dynamic-search-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

/* Local Imports */
import createStyles from "./WhitelistScreen.style";
import ListItem from "../../shared/components/list-item/ListItem";
 
/* Shared Imports */
import Text from "../../shared/components/text-wrapper/TextWrapper";
import fonts from "../../shared/theme/fonts";
import Styles from "../../shared/theme/styles";

import { getWhitelist, insert, search } from "../../api/WhitelistInterface";
import Icon from "react-native-dynamic-vector-icons";


interface WhitelistScreenProps {}

const WhitelistScreen: React.FC<WhitelistScreenProps> = () => {
    const theme = useTheme();
    const { colors } = theme;
    const styles = useMemo(() => createStyles(theme), [theme]);
    const sharedStyles = useMemo(() => Styles(theme), [theme]);

    const handleItemPress = () => {
      //NavigationService.push(SCREENS.CALLLOG);
    };

    //Testing whitelist, blacklist, and call log - will be moved into their own files
    insert('678*');
    insert('678420*');
    insert('6784205109');
    search('6784205109');
    /* -------------------------------------------------------------------------- */
    /*                               Render Methods                               */
    /* -------------------------------------------------------------------------- */

    const Header = () => (
      <>
        <Text color={colors.text} style={sharedStyles.header}>
          Allowed
        </Text>
      </>
    );

    const Whitelist = () => (
      <View style={styles.listContainer}>
        <FlatList
          data={getWhitelist()}
            renderItem={({ item }) => (
              <>
              <ListItem data={item} onPress={handleItemPress} />
              <Feather.Button style={styles.editIcon} name="edit" color={colors.text} size={30}/>
              <Ionicons.Button style={styles.trashIcon} name="trash" color={colors.text} size={30}/>
              </>
            )}
          />
      </View>
    );
    
    return (
      <SafeAreaView style={sharedStyles.container}>
        <View style={sharedStyles.circle1}>
          <View style={sharedStyles.circle}/>
        </View>
        <View style={sharedStyles.circle2}> 
          <View style={sharedStyles.circle}/>
        </View>
        <View style={styles.contentContainer}>
          <Header />
          <View>
            <SearchBar
              placeholder="Search here"
              onSearchPress={() => alert("onpress")}
              style={{borderWidth: 2, borderColor: colors.primary, borderRadius: 5,alignSelf: "flex-start", width: "85%"}}
            />
          </View>
          <Whitelist />
        </View>
      </SafeAreaView>
    );
};

export default WhitelistScreen;