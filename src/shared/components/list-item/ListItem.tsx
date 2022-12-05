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
  onEdit: (old_number : string, new_number : string) => void;
  onDelete: (phone_number : string) => void;
}

//Returns a formatted version of the given phone number
export const format = (number : string) => {
  const stripped = strip(number);
  let fmt = stripped.length > 6 ? "($1) $2 $3" : stripped.length > 3 ? "($1) $2" : "($1)";
  return stripped.replace(/(\d{3}(?=(\d{1,3})(\d{0,4})))(\d{0,3}(?=(\d{1,4})))(\d{0,4})$/, fmt);
}

//Returns a stripped version of the given formatted phone number
export const strip = (number : string) => {
  return number.replace(/\D/g, '');
}

const ListItem: React.FC<ICardItemProps> = ({ style, data, onEdit, onDelete }) => {
  const theme = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);
  const sharedStyles = useMemo(() => Styles(theme), [theme]);
  const phone_number = data.phone_number;
  const phoneNumber = format(phone_number);
  

  /* -------------------------------------------------------------------------- */
  /*                               State Handlers                               */
  /* -------------------------------------------------------------------------- */

  //Updates the edit modal visibility state
  const [isModalEdit, setModalEdit] = useState(false);
  const toggleModalEdit = () => {
    setModalEdit(!isModalEdit);
  };

  //Updates the trash modal visibility state
  const [isModalTrash, setModalTrash] = useState(false);
  const toggleModalTrash = () => {
    setModalTrash(!isModalTrash);
  };

  //Submits the edit request to the parent
  const submitEdit = (new_number : string) => {
    onEdit(phone_number, new_number);
    toggleModalEdit();
  }

  //Submits the delete request to the parent
  const submitDelete = () => {
    onDelete(phone_number);
    toggleModalTrash();
  }


  /* -------------------------------------------------------------------------- */
  /*                               Render Methods                               */
  /* -------------------------------------------------------------------------- */

  const Header = () => (
    <>
      <Text color={colors.text} style={{fontSize: 25}}>
        {phoneNumber}
      </Text>
    </>
  );

  const EditIcon = () => {
    const [number, onChangeNumber] = React.useState(phone_number);
    return(
    <>
      <Feather style={styles.editIcon} name="edit"size={35} onPress={toggleModalEdit}/>
      <Modal isVisible={isModalEdit} animationIn={'fadeIn'} animationOut={'fadeIn'}>
        <View style={sharedStyles.modalView}>
          <Text h1 color={colors.text}>Edit Phone Number</Text>
          <TextInput style={sharedStyles.textBox} value={format(number)} placeholderTextColor="#777" placeholder={format(number)} keyboardType="phone-pad" maxLength={14} onChangeText={onChangeNumber}/>
          <View style={{flex: 1, flexDirection: "row"}}>
            <Pressable style={styles.cancelButton} onPress={toggleModalEdit}>
              <Text color={colors.text}>Cancel</Text>
            </Pressable>
            <Pressable style={styles.doneButton} onPress={() => submitEdit(strip(number))}>
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
        <View style={sharedStyles.modalView}>
          <Text h1 color={colors.text}>Delete Phone Number</Text>
          <Text h4 color={colors.text}>Are you sure you want to erase this phone number?</Text>
          <View style={{flex: 1, flexDirection: "row"}}>
            <Pressable style={styles.cancelButton} onPress={toggleModalTrash}>
              <Text color={colors.text}>Cancel</Text>
            </Pressable>
            <Pressable style={styles.doneButton} onPress={submitDelete}>
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