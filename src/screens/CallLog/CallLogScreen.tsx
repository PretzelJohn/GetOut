import React, { useMemo, useState } from "react";
import { View, FlatList, TouchableHighlight } from "react-native";
import { useTheme } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native-gesture-handler";

/* Local Imports */
import createStyles from "./CallLogScreen.style";
import CallLogItem from "./components/card-item/CallLogItem";

/* Shared Imports */
import Text from "../../shared/components/text-wrapper/TextWrapper";
import fonts from "../../shared/theme/fonts";
import { getCallList, insert } from "../../api/CallLogInterface";
import Styles from "../../shared/theme/styles";
import { ScreenWidth } from "@freakycoder/react-native-helpers";

interface CallLogScreenProps {}
const CallLogScreen: React.FC<CallLogScreenProps> = () => {
    const theme = useTheme();
    const { colors } = theme;
    const styles = useMemo(() => createStyles(theme), [theme]);
    const sharedStyles = useMemo(() => Styles(theme), [theme]);
    const [ isPressed, setIsPressed ] = React.useState(true);

    const handleItemPress = () => {
      //NavigationService.push(SCREENS.CALLLOG);
    };

    
    /* -------------------------------------------------------------------------- */
    /*                               Render Methods                               */
    /* -------------------------------------------------------------------------- */

    const Header = () => {
      const allProps = {
        activeOpacity: 1,
        underlayColor: colors.primary,
        style: [styles.allButton, {backgroundColor: isPressed ? colors.transparent : colors.secondary}],
        onPress: () => setIsPressed(true)
      };
      const missedProps = {
        activeOpacity: 1,
        underlayColor: colors.primary,
        style: [styles.missedButton, {backgroundColor: isPressed ? colors.secondary : colors.transparent}],
        onPress: () => setIsPressed(false)
      }; 
      return(
      <>
        <Text color={colors.text} style={sharedStyles.header}>
          Recents
        </Text>
        <View style={{position: 'absolute', top: '2.5%', left: '15%', right: 0, bottom: 0, justifyContent: 'flex-start', alignItems: 'center'}}>
          <TouchableHighlight {...allProps}>
            <Text color={colors.text} style={styles.allmissedButtons}>All</Text>
          </TouchableHighlight>
        </View>
        <View style={{position: 'absolute', top: '2.5%', left: '47%', right: 0, bottom: 0, justifyContent: 'flex-start', alignItems: 'center'}}>
          <TouchableHighlight {...missedProps}>
            <Text color={colors.text} style={styles.allmissedButtons}>Missed</Text>
          </TouchableHighlight>
        </View>
      </>
      )
    };

    const CallLogs = () => (
      <View style={styles.listContainer}>
        <FlatList
          data={getCallList()}
          renderItem={({ item }) => (
            <CallLogItem data={item} onPress={handleItemPress} />
          )}
        />
      </View>
    );

    return (
      <SafeAreaView style={sharedStyles.container}>
        <View style={sharedStyles.circle1}>
          <View style={sharedStyles.circle}/>
        </View>
        <View style={sharedStyles.circle2}> 
          <View style={sharedStyles.circle}/>
        </View>
        <View style={styles.contentContainer}>
          <Header />
          <CallLogs />
        </View>
      </SafeAreaView>
    );
};

export default CallLogScreen;