import { ViewStyle, StyleSheet, TextStyle, ImageStyle } from "react-native";
import { ExtendedTheme } from "@react-navigation/native";
import { ScreenWidth } from "@freakycoder/react-native-helpers";

interface Style {
  container: ViewStyle;
  titleTextStyle: TextStyle;
  buttonStyle: ViewStyle;
  buttonTextStyle: TextStyle;
  header: ViewStyle;
  contentContainer: ViewStyle;
  listContainer: ViewStyle;
  profilePicImageStyle: ImageStyle;
  editIcon: ViewStyle;
  trashIcon: ViewStyle;
}
 
export default (theme: ExtendedTheme) => {
  const { colors } = theme;
  return StyleSheet.create<Style>({
    container: {
      flex: 1,
      alignItems: "center",
      backgroundColor: colors.background,
    },
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
    },
    profilePicImageStyle: {
      height: 50,
      width: 50,
      borderRadius: 30,
    },
    editIcon: {
      color: colors.text,
      position: 'absolute', 
      top: '23%', 
      left: '0%',
    },
    trashIcon: {
      color: colors.text,
      position: 'absolute', 
      top: '23%', 
      left: '0%'
    }
  });
};