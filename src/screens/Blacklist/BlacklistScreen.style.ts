import { ViewStyle, StyleSheet, TextStyle, ImageStyle } from "react-native";
import { ExtendedTheme } from "@react-navigation/native";
import { ScreenWidth } from "@freakycoder/react-native-helpers";

interface Style {
  titleTextStyle: TextStyle;
  buttonStyle: ViewStyle;
  buttonTextStyle: TextStyle;
  header: ViewStyle;
  contentContainer: ViewStyle;
  listContainer: ViewStyle;
  profilePicImageStyle: ImageStyle;
  modalView: ViewStyle;
  cancelButton: ViewStyle;
  addButton: ViewStyle;
  plusIcon: ViewStyle;
}

export default (theme: ExtendedTheme) => {
  const { colors } = theme;
  return StyleSheet.create<Style>({
    titleTextStyle: {
      fontSize: 32,
    },
    buttonStyle: {
      height: 45,
      width: ScreenWidth * 0.9,
      marginTop: 32,
      borderRadius: 12,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.primary,
      shadowRadius: 5,
      shadowOpacity: 0.7,
      shadowColor: colors.shadow,
      shadowOffset: {
        width: 0,
        height: 3,
      },
    },
    buttonTextStyle: {
      color: colors.white,
      fontWeight: "700",
    },
    header: {
      width: ScreenWidth * 0.9,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    contentContainer: {
      flex: 1,
      marginTop: '3.5%',
    },
    listContainer: {
      marginTop: '1.5%',
      borderTopWidth: 1,
      borderTopColor: colors.primary,
    },
    profilePicImageStyle: {
      height: 50,
      width: 50,
      borderRadius: 30,
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
    addButton: {
      width: 70, 
      height: 40, 
      justifyContent: "center", 
      alignItems: "center",
      borderRadius: 10,
      marginTop: 10,
      backgroundColor: colors.transparent 
    },
    plusIcon: {
      color: colors.transparent,
      position: 'absolute', 
      left: '87%',
      top: 2
    },
  });
};