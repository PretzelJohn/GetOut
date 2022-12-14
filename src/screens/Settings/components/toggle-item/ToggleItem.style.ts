import { ScreenWidth } from "@freakycoder/react-native-helpers";
import { ExtendedTheme } from "@react-navigation/native";
import { ViewStyle, StyleSheet, TextStyle } from "react-native";

interface Style {
  container: ViewStyle;
  contentContainer: ViewStyle;
  keyContainer: ViewStyle;
  valueContainer: ViewStyle;
}

export default (theme: ExtendedTheme) => {
  const { colors } = theme;
  return StyleSheet.create<Style>({
    container: {
      padding: 16,
      marginTop: 0,
      // borderTopLeftRadius: 10,
      // borderTopRightRadius: 10,
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
      bottom: 35,
    }
  });
};
