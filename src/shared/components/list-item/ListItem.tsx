import React, { useMemo } from "react";
import { View, StyleProp, ViewStyle } from "react-native";
import { useTheme } from "@react-navigation/native";
import Icon from "react-native-dynamic-vector-icons";
import RNBounceable from "@freakycoder/react-native-bounceable";

/**
 * ? Local Imports
 */
import createStyles from "./ListItem.style";
import { IListItem } from "./IListItem";
import Text from "../text-wrapper/TextWrapper";

type CustomStyleProp = StyleProp<ViewStyle> | Array<StyleProp<ViewStyle>>;

interface ICardItemProps {
  style?: CustomStyleProp;
  data: IListItem;
  onPress: () => void;
}

const ListItem: React.FC<ICardItemProps> = ({ style, data, onPress }) => {
  const theme = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);

  const { phone_number } = data;

  const Header = () => (
    <>
      <Text h4 bold color={colors.text}>
        {phone_number}
      </Text>
    </>
  );

  return (
  <RNBounceable style={[styles.container, style]} onPress={onPress}>
    <Header />
  </RNBounceable>
  );
};

export default ListItem;