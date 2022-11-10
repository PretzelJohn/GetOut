import React, { useMemo, useState} from "react";
import { View, FlatList, useColorScheme, Pressable } from "react-native";
import { useTheme } from "@react-navigation/native";
import SearchBar from "react-native-dynamic-search-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import Modal from "react-native-modal";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { TextInput } from "react-native-gesture-handler";

/* Local Imports */
import createStyles from "./BlacklistScreen.style";
import ListItem from "../../shared/components/list-item/ListItem";
import ListEmpty from "../../shared/components/list-empty/ListEmpty";
import {getBlacklist, insert, edit, remove} from "../../api/BlacklistInterface";
import {getSettings} from "../../api/SettingsInterface";

/* Shared Imports */
import Text from "../../shared/components/text-wrapper/TextWrapper";
import Styles from "../../shared/theme/styles";
import { ScreenHeight } from "@freakycoder/react-native-helpers";


interface BlacklistScreenProps {}

const BlacklistScreen: React.FC<BlacklistScreenProps> = () => {
  const colorTheme = useTheme();
  const { colors } = colorTheme;
  const styles = useMemo(() => createStyles(colorTheme), [colorTheme]);
  const sharedStyles = useMemo(() => Styles(colorTheme), [colorTheme]);

  const theme = getSettings().theme;
  let scheme = useColorScheme();      // System color scheme
  let isDarkMode = (theme == 'system') ? (scheme === 'dark') : (theme === 'dark');

  
  /* -------------------------------------------------------------------------- */
  /*                               State Handlers                               */
  /* -------------------------------------------------------------------------- */

  //Updates the search text state
  const [searchText, setSearchText] = useState('');
  const submitSearch = async(phone_number : string) => {
    setSearchText(phone_number);
  }

  //Updates the modal visibility state
  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  //Uses the apis to add/edit/delete items
  const submitAdd = async(phone_number : string) => {
    toggleModal();
    await insert(phone_number);
  }
  const submitEdit = async(old_number : string, new_number : string) => {
    await edit(old_number, new_number);
  }
  const submitRemove = async(phone_number : string) => {
    await remove(phone_number);
  }


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
        data={getBlacklist(searchText)}
        style={{maxHeight: ScreenHeight-329}}
        ListEmptyComponent={<ListEmpty message="No blacklisted phone numbers found"/>}
        renderItem={({ item }) => (
          <ListItem data={item} onEdit={submitEdit} onDelete={submitRemove} />
        )}
      />
    </View>
  );

  const AddButton = () => {
    const [number, onChangeNumber] = React.useState('');
    return(
      <>
        <AntDesign style={styles.plusIcon} name="pluscircle"size={42} onPress={toggleModal}/>
        <Modal isVisible={isModalVisible} animationIn={'fadeIn'} animationOut={'fadeIn'}>
          <View style={styles.modalView}>
            <Text h1 color={colors.text}>Add phone number</Text>
            <Text h4 color={colors.text}>Enter the phone number you wish to add to the blacklist:</Text>
            <TextInput style={sharedStyles.textBox} value={number} placeholderTextColor="#777" placeholder="(###) ###-####" keyboardType="phone-pad" onChangeText={onChangeNumber} />
            <View style={{flex: 1, flexDirection: "row"}}>
              <Pressable style={styles.cancelButton} onPress={toggleModal}>
                <Text color={colors.text}>Cancel</Text>
              </Pressable>
              <Pressable style={styles.addButton} onPress={() => submitAdd(number)}>
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
        <Header />
        <View>
          <SearchBar
            placeholder="Search"
            onChangeText={submitSearch}
            onClearPress={() => submitSearch('')}
            keyboardType='phone-pad'
            style={{borderWidth: 2, borderColor: colors.primary, borderRadius: 5,alignSelf: "flex-start", width: "85%", height: 48}}
            darkMode={isDarkMode}
          />
          <AddButton/>
        </View>
        <Blacklist />
      </View>
    </SafeAreaView>
  );
};

export default BlacklistScreen;