import React, { useMemo } from "react";
import { View, StyleProp, ViewStyle } from "react-native";
import { useTheme } from "@react-navigation/native";
import Icon from "react-native-dynamic-vector-icons";
import RNBounceable from "@freakycoder/react-native-bounceable";

/**
 * ? Local Imports
 */
import createStyles from "./CallLogItem.style";
import { ICallLogItem } from "./ICallLogItem";
import Text from "../../../../shared/components/text-wrapper/TextWrapper";

type CustomStyleProp = StyleProp<ViewStyle> | Array<StyleProp<ViewStyle>>;

interface ICardItemProps {
  style?: CustomStyleProp;
  data: ICallLogItem;
  onPress: () => void;
}

const CallLogItem: React.FC<ICardItemProps> = ({ style, data, onPress }) => {
  const theme = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);

  const { number, location, date, time  } = data;

  const Header = () => (
    <>
      <Text h4 bold color={colors.black}>
        {number} 
      </Text>
      <Text h5 color={colors.black} style={styles.locationTextStyle}>
        {date} ⚫️ {location}                       
      </Text>
    </>
  );

  // const Date = () => (
  //   <View style={styles.dateContainer}>
  //     <Icon name="" type="FontAwesome" color={colors.text} />
  //     <Text style={styles.valueTextStyle}>{date}</Text>
  //   </View>
  // );

  const Time = () => (
    <View style={styles.timeContainer}>
      <Text style={styles.valueTextStyle}>{time}</Text>
    </View>
  );

  return (
  <RNBounceable style={[styles.container, style]} onPress={onPress}>
    <Header/>
    <View style={styles.contentContainer}>
      <Time/>
    </View>
  </RNBounceable>
  );
};

export default CallLogItem;