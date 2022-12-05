import React, { useEffect, useMemo, useState } from "react";
import { View, StyleProp, ViewStyle, TouchableHighlight } from "react-native";
import { useTheme } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

/* Local Imports */
import createStyles from "./CallLogItem.style";
import { ICallLogItem } from "./ICallLogItem";
import * as Whitelist from "../../../../api/WhitelistInterface";
import * as Blacklist from "../../../../api/BlacklistInterface";
import {checkList} from "../../../../api/CallHandler";
import { getDatabase } from "../../../../database/Database";

/* Shared Imports */
import Text from "../../../../shared/components/text-wrapper/TextWrapper";
import { format } from "../../../../shared/components/list-item/ListItem";


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
  const datetime = new Date(timestamp);
  const date = datetime.toLocaleDateString();
  const time = datetime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const date_or_time = (date === new Date(Date.now()).toLocaleDateString() ? time : date);

  //Updates block/unblock button states
  const [ willBlock, setWillBlock ] = useState(blocked);
  useEffect(() => {
    const fetchData = async() => {
      const isWhitelisted = await checkList(Whitelist._loadWhitelist, phone_number);
      const isBlacklisted = await checkList(Blacklist._loadBlacklist, phone_number);
      setWillBlock(!isWhitelisted && isBlacklisted);
    }
    const subscribe = async() => {
      const db = await getDatabase();
      db.blacklist.insert$.subscribe((event : any) => {
        if(event["documentData"]["phone_number"] === phone_number) setWillBlock(true);
      });
      db.blacklist.remove$.subscribe((event : any) => {
        if(event["documentData"]["phone_number"] === phone_number) setWillBlock(false);
      });
    }
    subscribe();
    fetchData();
  }, []);
  

  const Header = () => (
    <>
      <Text color={blocked ? colors.red : colors.text} style={{fontSize: 25}}>
        {format(phone_number)}
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

  const TouchProps = {
    activeOpacity: 1,
    underlayColor: colors.primary,
    style: [styles.buttons, {backgroundColor: willBlock ? colors.secondary : colors.transparent}],
    onPress: async() => {
      if(willBlock) {
        Blacklist.remove(phone_number);
        Whitelist.insert(phone_number);
      } else {
        Whitelist.remove(phone_number);
        Blacklist.insert(phone_number);
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
          <Text color={colors.text} style={styles.blocked}>
            {willBlock ? "Unblock" : "Block"}
          </Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

export default CallLogItem;