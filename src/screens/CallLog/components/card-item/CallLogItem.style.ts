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
  buttons: ViewStyle;
  blocked: ViewStyle;
  answeredIcon: ViewStyle;
}

export default (theme: ExtendedTheme) => {
  const { colors } = theme;
  return StyleSheet.create<Style>({
    container: {
      padding: 0,
      borderBottomWidth: 2,
      borderBottomColor: colors.primary,
      width: ScreenWidth,
      backgroundColor: colors.white,
      left: "10%"
    },
    locationTextStyle: {
      margin: 1,
      fontSize: 12
    },
    contentContainer: {
      marginLeft: 200,
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
      marginRight: 1,
      right: "29%", 
      position: "absolute", 
      bottom: 0,  
      top: 16 
    },
    valueTextStyle: {
      marginLeft: 8,
      fontSize: 12,
      fontWeight: "bold"
    },
    buttons: {
      width: 60, 
      height: 28, 
      justifyContent: "center", 
      alignItems: "center",
      borderRadius: 11, 
      backgroundColor: colors.secondary,
      right:"20%"
    },
    blocked: {
      fontWeight: "bold", 
      alignSelf: "center", 
      justifyContent: "center"
    },
    answeredIcon: {
      position: 'absolute', 
      top: '23%', 
      left: '-9%'
    }
  });
};
