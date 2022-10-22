import React, { useMemo, useState} from "react";
import { View, FlatList, useColorScheme, Pressable } from "react-native";
import { useTheme } from "@react-navigation/native";
import SearchBar from "react-native-dynamic-search-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import Modal from "react-native-modal";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { TextInput } from "react-native-gesture-handler";

/* Local Imports */
import createStyles from "./WhitelistScreen.style";
import ListItem from "../../shared/components/list-item/ListItem";
 
/* Shared Imports */
import Text from "../../shared/components/text-wrapper/TextWrapper";
import Styles from "../../shared/theme/styles";

import { getWhitelist, insert, search } from "../../api/WhitelistInterface";


interface WhitelistScreenProps {}

const WhitelistScreen: React.FC<WhitelistScreenProps> = () => {
    const theme = useTheme();
    const { colors } = theme;
    const styles = useMemo(() => createStyles(theme), [theme]);
    const sharedStyles = useMemo(() => Styles(theme), [theme]);
    const [isModalVisible, setModalVisible] = useState(false);
    const scheme = useColorScheme();
    const isDarkMode = scheme === "dark";

    const handleItemPress = () => {
      //NavigationService.push(SCREENS.CALLLOG);
    };

    //Testing whitelist, blacklist, and call log - will be moved into their own files
    // insert('678*');
    // insert('678420*');
    // insert('6784205109');
    // search('6784205109');
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
              </>
            )}
          />
      </View>
    );

    const toggleModal = () => {
      setModalVisible(!isModalVisible);
    };

    const AddButton = () => {
      const [number, onChangeNumber] = React.useState('');
      return(
      <>
        <AntDesign style={styles.plusIcon} name="pluscircle"size={40} onPress={toggleModal}/>
          <Modal isVisible={isModalVisible} animationIn={'fadeIn'} animationOut={'fadeIn'}>
            <View style={styles.modalView}>
              <Text h1 color={colors.text}>Add Phone Number</Text>
              <TextInput style={sharedStyles.textBox} value={number} placeholder="Enter Phone Number" keyboardType="numeric" onChangeText={onChangeNumber} />
              <View style={{flex: 1, flexDirection: "row"}}>
                <Pressable style={styles.cancelButton} onPress={toggleModal}>
                  <Text color={colors.text}>Cancel</Text>
                </Pressable>
                <Pressable style={styles.addButton} onPress={toggleModal}>
                  <Text color={colors.text}>Add</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
      </>
      )
    }

    return (
      <SafeAreaView style={sharedStyles.container}>
        <View style={sharedStyles.circle1}>
          <View style={sharedStyles.circle}/>
        </View>
        <View style={sharedStyles.circle2}> 
          <View style={sharedStyles.circle}/>
        </View>
        <View style={styles.contentContainer}>
          <Header/>
          <View>
            <SearchBar
              placeholder="Search here"
              onSearchPress={() => alert("onpress")}
              keyboardType='phone-pad'
              style={{borderWidth: 2, borderColor: colors.primary, borderRadius: 5,alignSelf: "flex-start", width: "85%"}}
              darkMode={isDarkMode}
            />
            <AddButton/>
          </View>
          <Whitelist/>
        </View>
      </SafeAreaView>
    );
};

export default WhitelistScreen;