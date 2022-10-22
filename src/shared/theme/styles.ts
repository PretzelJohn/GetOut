import { ViewStyle, StyleSheet, TextStyle, ImageStyle } from "react-native";
import { ExtendedTheme } from "@react-navigation/native";
import fonts from "@fonts";
import { ScreenWidth } from "@freakycoder/react-native-helpers";

interface Style {
    container: ViewStyle;
    circle1: ViewStyle;
    circle2: ViewStyle;
    circle: ViewStyle;
    header: ViewStyle;
    textBox: ViewStyle;
}

export default (theme: ExtendedTheme) => {
    const { colors } = theme;
    return StyleSheet.create<Style>({
        container: {
            flex: 1,
            alignItems: "center",
            backgroundColor: colors.background
        },
        circle1: {
            position: 'absolute',
            right: "0%",
            top: -86
        },
        circle2: {
            position: 'absolute',
            right: "-18%",
            top: -25
        },
        circle: {
            width: 120,
            height: 120,
            borderRadius: 500,
            backgroundColor: colors.transparent,
            transform: [{ scaleX: 1.3 }]
        },
        header: {
            fontSize: 40
        },
        textBox: {
            borderColor: colors.transparent,
            borderRadius: 5,
            borderWidth: 2,
            textAlign: "center",
            color: colors.text
        }
    })
}
