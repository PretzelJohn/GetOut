import React, { useMemo, useState } from "react";
import { View, StyleProp, ViewStyle, TouchableHighlight } from "react-native";
import { useTheme } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

/**
 * ? Local Imports
 */
import createStyles from "./CallLogItem.style";
import { ICallLogItem } from "./ICallLogItem";
import Text from "../../../../shared/components/text-wrapper/TextWrapper";
// import { TouchableOpacity } from "react-native-gesture-handler";
// import { ScreenStackHeaderLeftView } from "react-native-screens";

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

  const { phone_number, location, timestamp, blocked } = data;
  const phoneNumber = phone_number.replace(/\D/g, '').replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2 $3");
  const datetime = new Date(timestamp);
  const date = datetime.toLocaleDateString();
  const time = datetime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const date_or_time = (date === new Date(Date.now()).toLocaleDateString() ? time : date);

  const Header = () => (
    <>
      <Text color={blocked ? colors.red : colors.text} style={{fontSize: 25}}>
        {phoneNumber} 
      </Text>
      <Text color={colors.text} style={styles.locationTextStyle} >
        {blocked ? "Blocked call" : "Allowed Call"} ● {location}                       
      </Text>
    </>
  );

  const Time = () => (
    <View style={styles.timeContainer}>
      <Text color={colors.text} style={styles.valueTextStyle}>{date_or_time}</Text>
    </View>
  );

  const [ isPress, setIsPress ] = React.useState(false);

  const TouchProps = {
    activeOpacity: 1,
    underlayColor: colors.primary,
    style: [styles.buttons, {backgroundColor: isPress ? colors.transparent : colors.secondary}],
    onPress: () => setIsPress(current => !current)
  };

  return (    
  <View style={styles.container}>
    <Icon color={blocked ? colors.red : colors.text} style={styles.answeredIcon} name="phone-incoming" size={30}/>
    <Header/>
    <Time />
    <View style={{ alignSelf: "flex-end", position: "absolute", top: "21%", right:"10%"}}>
      <TouchableHighlight {...TouchProps}>
        <Text color={colors.text} style={styles.blocked}>{isPress ? "Block" : "Unblock"}</Text>
      </TouchableHighlight>
    </View>
  </View>
  );
};

export default CallLogItem;