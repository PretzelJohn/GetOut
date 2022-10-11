import React, { useMemo, useState } from "react";
import { View, StyleProp, ViewStyle } from "react-native";
import { useTheme } from "@react-navigation/native";
import Icon from "react-native-dynamic-vector-icons";
import RNBounceable from "@freakycoder/react-native-bounceable";

/**
 * ? Local Imports
 */
import createStyles from "./ToggleItem.style";
import Text from "../../../../shared/components/text-wrapper/TextWrapper";
import { Switch } from "react-native-gesture-handler";

type CustomStyleProp = StyleProp<ViewStyle> | Array<StyleProp<ViewStyle>>;

interface ICardItemProps {
  style?: CustomStyleProp;
  data: boolean;
  name: String;
  description: String;
  onPress: (value : boolean) => void;
}

const ToggleItem: React.FC<ICardItemProps> = ({ style, data, name, description, onPress }) => {
  const systemTheme = useTheme();
  const { colors } = systemTheme;
  const styles = useMemo(() => createStyles(systemTheme), [systemTheme]);

  const [isEnabled, setIsEnabled] = useState(data);
  const toggle = () => {
    onPress(isEnabled);
    setIsEnabled((previous : Boolean) => !previous);
  }

  const Info = () => (
    <>
      <View style={styles.keyContainer}>
        <Text h3 bold color={colors.text}>{name}</Text>
        <Text h5 color={colors.text}>{description}</Text>
      </View>
    </>
  );

  const Action = () => (
    <>
      <View style={styles.valueContainer}>
        <Switch trackColor={colors.text} value={isEnabled} onValueChange={() => {}} />
      </View>
    </>
  );

  return (
    <RNBounceable style={[styles.container, style]} onPress={toggle}>
      <Info />
      <Action />
    </RNBounceable>
  );
};

export default ToggleItem;