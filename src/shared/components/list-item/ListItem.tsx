import React, { useMemo, useState } from "react";
import { View, StyleProp, ViewStyle, TextStyle, Button, Alert, Pressable } from "react-native";
import { useTheme } from "@react-navigation/native";
import Modal from "react-native-modal";
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TextInput } from "react-native-gesture-handler";

//Local Imports
import createStyles from "./ListItem.style";
import { IListItem } from "./IListItem";
import Text from "../text-wrapper/TextWrapper";

//Shared Imports
import Styles from "../../theme/styles";

type CustomStyleProp = StyleProp<ViewStyle> | Array<StyleProp<ViewStyle>>;

interface ICardItemProps {
  style?: CustomStyleProp;
  data: IListItem;
  onPress: () => void;
}

const ListItem: React.FC<ICardItemProps> = ({ style, data }) => {
  const theme = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);
  const sharedStyles = useMemo(() => Styles(theme), [theme]);
  const [isModalEdit, setModalEdit] = useState(false);
  const [isModalTrash, setModalTrash] = useState(false);
  const { phone_number } = data;
  
  const toggleModalEdit = () => {
    setModalEdit(!isModalEdit);
  };

  const toggleModalTrash = () => {
    setModalTrash(!isModalTrash);
  };

  const deleteModal = () => {
    Alert.alert(
      'Delete Phone Number?',
      `Are you sure you want to delete?`,
      [
          {
              text: 'Go Back',
              style: 'default',
          },
          {
              text: 'Delete',
              // onPress: 
          },
      ]
  );
  };

  const Header = () => (
    <>
      <Text color={colors.text} style={{fontSize: 25}}>
        {phone_number}
      </Text>
    </>
  );

  const EditIcon = () => {
    const [number, onChangeNumber] = React.useState('');
    return(
    <>
      <Feather style={styles.editIcon} name="edit"size={35} onPress={toggleModalEdit}/>
        <Modal isVisible={isModalEdit} animationIn={'fadeIn'} animationOut={'fadeIn'}>
          <View style={styles.modalView}>
            <Text h1 color={colors.text}>Edit Phone Number</Text>
            <TextInput style={sharedStyles.textBox} value={number} placeholder="Enter Phone Number" keyboardType="numeric" onChangeText={onChangeNumber}/>
            <View style={{flex: 1, flexDirection: "row"}}>
              <Pressable style={styles.cancelButton} onPress={toggleModalEdit}>
                <Text color={colors.text}>Cancel</Text>
              </Pressable>
              <Pressable style={styles.doneButton} onPress={toggleModalEdit}>
                <Text color={colors.text}>Done</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
    </>
    )
  }

  const TrashIcon = () => (
    <>
      <Ionicons style={styles.trashIcon} name="trash"size={35} onPress={toggleModalTrash}/>
        <Modal isVisible={isModalTrash} animationIn={'fadeIn'} animationOut={'fadeIn'}>
          <View style={styles.modalView}>
            <Text h1 color={colors.text}>Delete Phone Number</Text>
            <Text h4 color={colors.text}>Are you sure you want to erase this phone number?</Text>
            <View style={{flex: 1, flexDirection: "row"}}>
              <Pressable style={styles.cancelButton} onPress={toggleModalTrash}>
                <Text color={colors.text}>Cancel</Text>
              </Pressable>
              <Pressable style={styles.doneButton} onPress={toggleModalTrash}>
                <Text color={colors.text}>Yes</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
    </>
  );

  return (
  <View style={[styles.container, style]}>
    <Header/>
    <EditIcon/>
    <TrashIcon/>
  </View>
  );
};

export default ListItem;