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
  allButton: ViewStyle;
  missedButton: ViewStyle;
  allmissedButtons: ViewStyle;
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
      backgroundColor: colors.black,
      shadowRadius: 5,
      shadowOpacity: 0.7,
      shadowColor: colors.shadow,
      shadowOffset: {
        width: 0,
        height: 3,
      },
    },
    buttonTextStyle: {
      color: colors.black,
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
      borderTopWidth: 1,
      borderTopColor: colors.primary,
    },
    profilePicImageStyle: {
      height: 50,
      width: 50,
      borderRadius: 30,
    },
    allButton: {
      width: 77, 
      height: 32,
      left: -30,
      justifyContent: "center", 
      borderBottomLeftRadius: 10,
      borderTopLeftRadius: 10,
      backgroundColor: colors.transparent
    },
    missedButton: {
      width: 76, 
      height: 32,
      left: -20,
      justifyContent: "center", 
      borderBottomRightRadius: 10,
      borderTopRightRadius: 10,
      backgroundColor: colors.secondary
    },
    allmissedButtons: {
      alignSelf: "center", 
      justifyContent: "center",
      fontSize: 18
    }
  });
};