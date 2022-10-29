import { ExtendedTheme } from "@react-navigation/native";
import { ViewStyle, StyleSheet } from "react-native";

interface Style {
    container: ViewStyle;
}

export default (theme: ExtendedTheme) => {
    return StyleSheet.create<Style>({
        container: {
            minWidth: "90%"
        }
    });
};
