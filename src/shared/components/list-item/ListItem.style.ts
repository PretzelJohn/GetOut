import { ScreenWidth } from "@freakycoder/react-native-helpers";
import { ExtendedTheme } from "@react-navigation/native";
import { ViewStyle, StyleSheet, TextStyle } from "react-native";

interface Style {
  container: ViewStyle;
  locationTextStyle: TextStyle;
  contentContainer: ViewStyle;
  dateContainer: ViewStyle;
  dateColorStyle: ViewStyle;
  timeContainer: ViewStyle;
  valueTextStyle: ViewStyle;
  editIcon: ViewStyle;
  trashIcon: ViewStyle;
  cancelButton: ViewStyle;
  doneButton: ViewStyle;
  modalView: ViewStyle;
}

export default (theme: ExtendedTheme) => {
  const { colors } = theme;
  return StyleSheet.create<Style>({
    container: {
      padding: 16,
      marginTop: 0,
      borderWidth: 1,
      borderLeftColor: colors.white,
      borderRightColor: colors.white,
      borderTopColor: colors.white,
      borderBottomColor: colors.primary,
      borderRadius: 0,
      width: ScreenWidth * 0.9,
    },
    locationTextStyle: {
      marginTop: 8,
    },
    contentContainer: {
      marginTop: 16,
      flexDirection: "row",
      alignItems: "center",
    },
    dateContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    dateColorStyle: {
      width: 15,
      height: 15,
      borderWidth: 1,
      borderRadius: 15,
      borderColor: colors.borderColor,
      backgroundColor: colors.calpyse,
    },
    timeContainer: {
      marginLeft: 16,
      flexDirection: "row",
      alignItems: "center",
    },
    valueTextStyle: {
      marginLeft: 8,
    },
    editIcon: {
      color: colors.text,
      position: 'absolute', 
      left: '83%',
      top: 10,
    },
    trashIcon: {
      color: colors.text,
      position: 'absolute', 
      left: '95%',
      top: 10,
    },
    cancelButton: {
      width: 70, 
      height: 40, 
      justifyContent: "center", 
      alignItems: "center",
      borderRadius: 10,
      marginTop: 10,
      marginRight: 10,
      backgroundColor: colors.transparent 
    },
    doneButton: {
      width: 70, 
      height: 40, 
      justifyContent: "center", 
      alignItems: "center",
      borderRadius: 10,
      marginTop: 10,
      backgroundColor: colors.transparent 
    },
    modalView:{
      justifyContent: "center", 
      alignItems: "center", 
      backgroundColor: colors.dynamicBackground, 
      paddingTop: 25,
      paddingBottom: 85, 
      borderColor: colors.black,
      borderWidth: 1.5
    },
  });
};
