import React, { useMemo, useState } from "react";
import { View, StyleProp, ViewStyle, Image, Pressable } from "react-native";
import { useTheme } from "@react-navigation/native";
import Modal from 'react-native-modal';
import RNBounceable from "@freakycoder/react-native-bounceable";

/**
 * ? Local Imports
 */
import createStyles from "./SelectItem.style";
import Text from "../../../../shared/components/text-wrapper/TextWrapper";
import Styles from "../../../../shared/theme/styles";

type CustomStyleProp = StyleProp<ViewStyle> | Array<StyleProp<ViewStyle>>;

interface ICardItemProps {
  style?: CustomStyleProp;
  data: string;
  name: string;
  description: string;
  onPress: (theme : string) => void;
}

const SelectItem: React.FC<ICardItemProps> = ({ style, data, name, description, onPress }) => {
  const theme = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);
  const sharedStyles = useMemo(() => Styles(theme), [theme]);

  const Info = () => (
    <>
      <View style={styles.keyContainer}>
        <Text h3 color={colors.text}>{name}</Text>
        <Text h5 color={colors.text}>{description}</Text>
      </View>
    </>
  );

  const Action = () => (
    <>
      <View style={styles.valueContainer}>
        { <Image style={styles.value} source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}} /> }
      </View>
    </>
  );

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentTheme, setCurrentTheme] = useState(data);
  const Popup = () => {
    const setTheme = (new_theme : string) => {
      setIsModalVisible(false);
      onPress(new_theme);
      setCurrentTheme(new_theme);
    }

    return (
      <Modal isVisible={isModalVisible} animationIn={'fadeIn'} animationOut={'fadeIn'}>
        <View style={styles.modalView}>
          <Text h1 color={colors.text}>Select Theme</Text>
          <View>
            <Pressable style={[styles.select, { backgroundColor: currentTheme === "system" ? colors.transparent : colors.secondary }]} onPress={() => setTheme("system")}>
              <Text color={colors.text}>System</Text>
            </Pressable>
            <Pressable style={[styles.select, { backgroundColor: currentTheme === "light" ? colors.transparent : colors.secondary }]} onPress={() => setTheme("light")}>
              <Text color={colors.text}>Light</Text>
            </Pressable>
            <Pressable style={[styles.select, { backgroundColor: currentTheme === "dark" ? colors.transparent : colors.secondary }]} onPress={() => setTheme("dark")}>
              <Text color={colors.text}>Dark</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    );
  }

  return (
    <View>
      <RNBounceable style={[styles.container, style]} onPress={() => setIsModalVisible(true)}>
        <Info />
        <Action />
      </RNBounceable>
      <Popup />
    </View>
  );
};

export default SelectItem;