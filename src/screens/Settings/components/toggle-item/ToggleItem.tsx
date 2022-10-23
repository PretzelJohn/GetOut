import React, { useMemo, useState } from "react";
import { View, StyleProp, ViewStyle } from "react-native";
import { useTheme } from "@react-navigation/native";

/* Local Imports */
import createStyles from "./ToggleItem.style";
import Text from "../../../../shared/components/text-wrapper/TextWrapper";
import { Switch } from 'react-native-switch';
import { TouchableHighlight } from "react-native-gesture-handler";

type CustomStyleProp = StyleProp<ViewStyle> | Array<StyleProp<ViewStyle>>;

interface ICardItemProps {
  style?: CustomStyleProp;
  data: boolean;
  name: String;
  description: String;
  hasPermission?: boolean;
  onPress: (value : boolean) => void;
}

const ToggleItem: React.FC<ICardItemProps> = ({ style, data, name, description, hasPermission=true, onPress }) => {
  const systemTheme = useTheme();
  const { colors } = systemTheme;
  const styles = useMemo(() => createStyles(systemTheme), [systemTheme]);


  //Updates the toggle state
  const [isEnabled, setIsEnabled] = useState(data);
  const toggle = () => {
    onPress(isEnabled && hasPermission);
    setIsEnabled((previous : boolean) => !previous && hasPermission);
  }


  //Render methods...
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
        <View style={{}}>
          <Switch 
            value={isEnabled}
            activeText={''}
            inActiveText={''}
            circleSize={20}
            barHeight={25}
            switchBorderRadius={500}
            switchLeftPx={2}
            switchRightPx={2}
            switchWidthMultiplier={2.5}
            backgroundActive={colors.black}
            backgroundInactive={colors.white}
            circleBorderWidth={2}
            innerCircleStyle={{borderWidth: 2}}
          />
        </View>
      </View>
    </>
  );

  return (
    <TouchableHighlight style={[styles.container, style]} onPress={toggle} underlayColor={colors.transparent}>
      <View>
        <Info />
        <Action />
      </View>
    </TouchableHighlight>
  );
};

export default ToggleItem;