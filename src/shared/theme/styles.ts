import { ViewStyle, StyleSheet } from "react-native";
import { ExtendedTheme } from "@react-navigation/native";


interface Style {
    container: ViewStyle;
    circle1: ViewStyle;
    circle2: ViewStyle;
    circle: ViewStyle;
    header: ViewStyle;
    textBox: ViewStyle;
    modalView: ViewStyle;
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
            fontSize: 45
        },
        textBox: {
            borderColor: colors.transparent,
            borderRadius: 5,
            borderWidth: 2,
            textAlign: "center",
            color: colors.text,
            width: "90%"
        },
        modalView:{
            justifyContent: "center", 
            alignItems: "center", 
            backgroundColor: colors.dynamicBackground, 
            paddingTop: 25,
            paddingBottom: 85, 
            borderColor: colors.black,
            borderWidth: 1.5
        }
    })
}
