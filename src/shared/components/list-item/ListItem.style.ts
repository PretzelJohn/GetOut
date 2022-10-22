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
      padding: 7,
      marginTop: 0,
      borderBottomWidth: 1,
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
    }
  });
};
