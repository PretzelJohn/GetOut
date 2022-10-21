import { ViewStyle, StyleSheet, TextStyle, ImageStyle } from "react-native";
import { ExtendedTheme } from "@react-navigation/native";
import { ScreenWidth } from "@freakycoder/react-native-helpers";
import { arrayFilterNotEmpty } from "rxdb";

interface Style {
  container: ViewStyle;
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
      marginTop: 8,
      borderTopWidth: 2,
      borderTopColor: colors.primary,
    },
    profilePicImageStyle: {
      height: 50,
      width: 50,
      borderRadius: 30,
    },
    allButton: {
      width: 70, 
      height: '23%', 
      justifyContent: "center", 
      alignItems: "center",
      borderBottomLeftRadius: 11, 
      borderTopLeftRadius: 11, 
      backgroundColor: colors.primary
    },
    missedButton: {
      width: 70, 
      height: '23%', 
      justifyContent: "center", 
      alignItems: "center",
      borderBottomRightRadius: 11, 
      borderTopRightRadius: 11, 
      backgroundColor: colors.secondary
    },
    allmissedButtons: {
      fontWeight: "bold", 
      alignSelf: "center", 
      justifyContent: "center"
    }
  });
};