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
}

export default (theme: ExtendedTheme) => {
  const { colors } = theme;
  return StyleSheet.create<Style>({
    container: {
      padding: 10,
      marginTop: 0,
      borderWidth: 1,
      width: ScreenWidth * 0.9,
      borderColor: colors.primary,
      backgroundColor: colors.white,
    },
    locationTextStyle: {
      marginTop: 8,
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
      marginRight: 1
    },
    valueTextStyle: {
      marginLeft: 8,
    }
  });
};
