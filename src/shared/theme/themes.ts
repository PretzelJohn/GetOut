import { DefaultTheme, ExtendedTheme } from "@react-navigation/native";

export const palette = {
    primary: "#5CE1E6",
    secondary: 'rgba(92, 225, 230, 0.25)',
    transparent: 'rgba(92, 225, 230, 0.65)',
    background: "#ffffff",
    white: "#ffffff",
    black: "#000000",
    button: "#1c1e21",
    shadow: "#3A8689",
    text: "#30363b",
    borderColor: "#d0d7de",
    borderColorDark: "#333942",
    placeholder: "#a1a1a1",
    danger: "rgb(208, 2, 27)",
    title: "rgb(102, 102, 102)",
    separator: "rgb(194, 194, 195)",
    highlight: "rgb(199, 198, 203)",
    blackOverlay: "rgba(0,0,0,0.6)",
    iconWhite: "#fff",
    iconBlack: "#101214",
    dynamicWhite: "#fff",
    dynamicBlack: "#1c1e21",
    dynamicBackground: "#fff",
    calpyse: "#2b7488",
};
  
export const LightTheme: ExtendedTheme = {
    dark: false,
    colors: {
      ...DefaultTheme.colors,
      ...palette,
    },
};
  
export const DarkTheme: ExtendedTheme = {
    ...DefaultTheme,
    colors: {
      ...LightTheme.colors,
      background: palette.black,
      foreground: palette.white,
      text: palette.white,
      tabBar: palette.black,
      iconWhite: palette.black,
      iconBlack: palette.white,
      dynamicBackground: palette.dynamicBlack,
      shadow: palette.transparent,
      borderColor: palette.borderColorDark,
    },
};