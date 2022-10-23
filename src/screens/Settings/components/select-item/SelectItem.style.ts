import { ScreenWidth } from "@freakycoder/react-native-helpers";
import { ExtendedTheme } from "@react-navigation/native";
import { ViewStyle, StyleSheet, ImageStyle } from "react-native";

interface Style {
  container: ViewStyle;
  contentContainer: ViewStyle;
  keyContainer: ViewStyle;
  valueContainer: ViewStyle;
  value: ImageStyle;
}

export default (theme: ExtendedTheme) => {
  const { colors } = theme;
  return StyleSheet.create<Style>({
    container: {
      padding: 16,
      marginTop: 16,
      borderRadius: 10,
      width: ScreenWidth * 0.9,
      borderColor: colors.secondary,
      backgroundColor: colors.secondary,
    },
    contentContainer: {
      marginTop: 16,
      flexDirection: "row",
      alignItems: "center",
    },
    keyContainer: {
      textAlign: "left",
    },
    valueContainer: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "flex-end",
    },
    value: {
      width: 50,
      height: 50,
      alignSelf: 'flex-end',
    }
  });
};
