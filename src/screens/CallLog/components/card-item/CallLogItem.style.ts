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
      borderBottomWidth: 1,
      borderBottomColor: colors.primary,
      width: ScreenWidth*0.9,
      left: "10%"
    },
    locationTextStyle: {
      margin: 1,
      fontSize: 14,
      marginTop: -4
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
      top: 17 
    },
    valueTextStyle: {
      marginLeft: 8,
      fontSize: 12,
    },
    buttons: {
      width: 60, 
      height: 29, 
      justifyContent: "center", 
      alignItems: "center",
      borderRadius: 11, 
      backgroundColor: colors.secondary
    },
    blocked: {
      alignSelf: "center", 
      justifyContent: "center"
    },
    answeredIcon: {
      color: colors.text,
      position: 'absolute', 
      top: '23%',
      left: "-11%"
    }
  });
};
