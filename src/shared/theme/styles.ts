import { ViewStyle, StyleSheet, TextStyle, ImageStyle } from "react-native";
import { ExtendedTheme } from "@react-navigation/native";
import fonts from "@fonts";
import { ScreenWidth } from "@freakycoder/react-native-helpers";
import { Icon } from "react-native-vector-icons/Icon";

interface Style {
    circle1: ViewStyle;
    circle2: ViewStyle;
    header: ViewStyle;
}

export default (theme: ExtendedTheme) => {
    const { colors } = theme;
    return StyleSheet.create<Style>({
        circle1: {
            width: 120,
            height: 120,
            borderRadius: 500,
            backgroundColor: colors.transparent,
            position: 'absolute', 
            marginLeft: '10%',
            marginTop: 0,
            transform: [{ scaleX: 1 }]
        },
        circle2: {
            width: 120,
            height: 120,
            borderRadius: 500,
            backgroundColor: colors.transparent,
            position: 'absolute', 
            marginLeft: 0, 
            marginTop: 0,
            transform: [{ scaleX: 1 }]
        },
        header: {
            fontSize: 40
        }
    })
}
