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

  const { number, location, date, time  } = data;

  const Header = () => (
    <>
      <Text color={colors.text} style={{fontSize: 23}}>
        {number} 
      </Text>
      <Text color={colors.text} style={styles.locationTextStyle}>
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
      <Text color={colors.text} style={styles.valueTextStyle}>{time}</Text>
    </View>
  );

  const [ isPress, setIsPress ] = React.useState(false);

  const TouchProps = {
    activeOpacity: 1,
    underlayColor: colors.primary,
    style: [styles.buttons, {backgroundColor: isPress ? colors.primary : colors.secondary}],
    onPress: () => setIsPress(current => !current)
  };

  return (    
  <View style={styles.container}>
    <Icon style={styles.answeredIcon} name="phone-outgoing" color={colors.Text} size={30}/>
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