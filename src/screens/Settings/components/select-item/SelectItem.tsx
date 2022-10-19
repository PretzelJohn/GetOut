import React, { useMemo, useState } from "react";
import { View, StyleProp, ViewStyle, Image } from "react-native";
import { useTheme } from "@react-navigation/native";
import Icon from "react-native-dynamic-vector-icons";
import RNBounceable from "@freakycoder/react-native-bounceable";

/**
 * ? Local Imports
 */
import createStyles from "./SelectItem.style";
import Text from "../../../../shared/components/text-wrapper/TextWrapper";


type CustomStyleProp = StyleProp<ViewStyle> | Array<StyleProp<ViewStyle>>;

interface ICardItemProps {
  style?: CustomStyleProp;
  data: boolean;
  name: String;
  description: String;
  onPress: () => void;
}

const ToggleItem: React.FC<ICardItemProps> = ({ style, data, name, description, onPress }) => {
  const systemTheme = useTheme();
  const { colors } = systemTheme;
  const styles = useMemo(() => createStyles(systemTheme), [systemTheme]);

  const [isEnabled, setIsEnabled] = useState(data);
  const setTheme = () => {
    
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
        {/* <Image style={styles.value} source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}} /> */}
      </View>
    </>
  );

  return (
    <RNBounceable style={[styles.container, style]} onPress={setTheme}>
      <Info />
      <Action />
    </RNBounceable>
  );
};

export default ToggleItem;