import React, { useMemo, useState } from "react";
import { View, StyleProp, ViewStyle, TouchableHighlight } from "react-native";
import { useTheme } from "@react-navigation/native";
import Icon from "react-native-dynamic-vector-icons";
import RNBounceable from "@freakycoder/react-native-bounceable";

/**
 * ? Local Imports
 */
import createStyles from "./CallLogItem.style";
import { ICallLogItem } from "./ICallLogItem";
import Text from "../../../../shared/components/text-wrapper/TextWrapper";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ScreenStackHeaderLeftView } from "react-native-screens";

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
      <Text bold color={colors.black} style={{fontSize: 23}}>
        {number} 
      </Text>
      <Text color={colors.black} style={styles.locationTextStyle}>
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
      <Text color={colors.black} style={styles.valueTextStyle}>{time}</Text>
    </View>
  );

  const [ isPress, setIsPress ] = React.useState(false);

  const touchProps = {
    activeOpacity: 1,
    underlayColor: colors.primary,
    style: styles.buttons,
    onPress: () => setIsPress(current => !current)
  };

  return (
  <View style={[styles.container, style]}>
    <Header/>
    <View style={{ right: "19%", position: "absolute", bottom: 0, top: 16 }}>
      <Time/>
    </View>
    <View style={{ alignSelf: "flex-end", position: "absolute", top: "21%" }}>
      <TouchableHighlight {...touchProps}>
        <Text color={colors.black} style={{fontWeight: "bold", alignSelf: "center", justifyContent: "center"}}>Block</Text>
      </TouchableHighlight>
    </View>
  </View>
  );
};

export default CallLogItem;