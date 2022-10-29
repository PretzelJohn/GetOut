import React, { useMemo } from "react";
import { View, FlatList } from "react-native";
import { useTheme } from "@react-navigation/native";
import SearchBar from "react-native-dynamic-search-bar";
import { SafeAreaView } from "react-native-safe-area-context";

/* Local Imports */
import createStyles from "./BlacklistScreen.style";
import ListItem from "../../shared/components/list-item/ListItem";

/* Shared Imports */
import Text from "../../shared/components/text-wrapper/TextWrapper";
import fonts from "../../shared/theme/fonts";
import Styles from "../../shared/theme/styles";

import {getBlacklist, insert, edit, search, remove} from "../../api/BlacklistInterface";


interface BlacklistScreenProps {}

const BlacklistScreen: React.FC<BlacklistScreenProps> = () => {
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

    edit('6784205109', '6788223861');

    let s = search('6788223861');
    //console.log(s[0].phone_number);

    /* -------------------------------------------------------------------------- */
    /*                               Render Methods                               */
    /* -------------------------------------------------------------------------- */


    // TODO: Add menu hamburger here if using menu stack    
    const Header = () => (
      <>
        <Text color={colors.text} style={sharedStyles.header}>
          Blocked
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
              placeholder="Search"
              onSearchPress={() => alert("onpress")}
              style={{borderWidth: 2, borderColor: colors.primary, borderRadius: 5,alignSelf: "flex-start", width: "85%"}}
            />
          </View>
          <Blacklist />
        </View>
      </SafeAreaView>
    );
};

export default BlacklistScreen;