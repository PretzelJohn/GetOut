import React, { useEffect, useMemo, useState } from "react";
import { View, StyleProp, ViewStyle, TouchableHighlight } from "react-native";
import { useTheme } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

/**
 * ? Local Imports
 */
import createStyles from "./CallLogItem.style";
import { ICallLogItem } from "./ICallLogItem";
import Text from "../../../../shared/components/text-wrapper/TextWrapper";
import * as Whitelist from "../../../../api/WhitelistInterface";
import {getWhitelist} from "../../../../api/WhitelistInterface";
import * as Blacklist from "../../../../api/BlacklistInterface";
import {getBlacklist} from "../../../../api/BlacklistInterface";
import {_checkList} from "../../../../api/CallHandler";
// import { TouchableOpacity } from "react-native-gesture-handler";
// import { ScreenStackHeaderLeftView } from "react-native-screens";

type CustomStyleProp = StyleProp<ViewStyle> | Array<StyleProp<ViewStyle>>;

interface ICardItemProps {
  style?: CustomStyleProp;
  data: ICallLogItem;
}

const CallLogItem: React.FC<ICardItemProps> = ({ style, data }) => {
  const theme = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);

  const { phone_number, timestamp, blocked } = data;
  const phoneNumber = phone_number.replace(/\D/g, '').replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2 $3");
  const datetime = new Date(timestamp);
  const date = datetime.toLocaleDateString();
  const time = datetime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const date_or_time = (date === new Date(Date.now()).toLocaleDateString() ? time : date);

  const [ isPress, setIsPress ] = React.useState(false);
  const [ isWhitelisted, setIsWhitelisted ] = React.useState(false);
  const [ isBlacklisted, setIsBlacklisted ] = React.useState(false);

  const Header = () => (
    <>
      <Text color={blocked ? colors.red : colors.text} style={{fontSize: 25}}>
        {phoneNumber} 
      </Text>
      <Text color={colors.text} style={styles.locationTextStyle} >
        {blocked ? "Blocked call" : "Allowed Call"}
      </Text>
    </>
  );

  const Time = () => (
    <View style={styles.timeContainer}>
      <Text color={colors.text} style={styles.valueTextStyle}>{date_or_time}</Text>
    </View>
  );

  useEffect(() => {
    const onLoad = async function() {
      setIsWhitelisted(await _checkList(getWhitelist, number));
      setIsBlacklisted(await _checkList(getBlacklist, number));
    }
    onLoad();
  }, []);

  const TouchProps = {
    activeOpacity: 1,
    underlayColor: colors.primary,
    style: [styles.buttons, {backgroundColor: isPress ? colors.transparent : colors.secondary}],
    onPress: () => {
      setIsPress(current => !current);
      if(isWhitelisted || !isBlacklisted) {
        Whitelist.remove(phone_number);
        Blacklist.insert(phone_number);
      } else {
        Blacklist.remove(phone_number);
        Whitelist.insert(phone_number);
      }
    }
  };

  return (
  <View style={styles.container}>
    <Icon color={blocked ? colors.red : colors.text} style={styles.answeredIcon} name="phone-incoming" size={30}/>
    <Header/>
    <Time />
    <View style={{ alignSelf: "flex-end", position: "absolute", top: "21%", right:"10%"}}>
      <TouchableHighlight {...TouchProps}>
        <Text color={colors.text} style={styles.blocked}>{(isWhitelisted || !isBlacklisted) ? "Block" : "Unblock"}</Text>
      </TouchableHighlight>
    </View>
  </View>
  );
};

export default CallLogItem;