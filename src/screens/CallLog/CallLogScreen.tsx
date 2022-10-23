import React, { useMemo, useState } from "react";
import { View, FlatList, TouchableHighlight } from "react-native";
import { useTheme } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

/* Local Imports */
import createStyles from "./CallLogScreen.style";
import CallLogItem from "./components/card-item/CallLogItem";

/* Shared Imports */
import Text from "../../shared/components/text-wrapper/TextWrapper";
import { getCallList, insert } from "../../api/CallLogInterface";
import Styles from "../../shared/theme/styles";


interface CallLogScreenProps {}
const CallLogScreen: React.FC<CallLogScreenProps> = () => {
    const theme = useTheme();
    const { colors } = theme;
    const styles = useMemo(() => createStyles(theme), [theme]);
    const sharedStyles = useMemo(() => Styles(theme), [theme]);

    const handleItemPress = () => {
      //NavigationService.push(SCREENS.CALLLOG);
    };

    //Insert mock data - will be removed for production
    insert('678-923-1102', 1664349720000, 'Mableton, GA', false);
    insert('678-223-8694', 1663912800000, 'Mableton, GA', true);
    insert('970-885-8195', 1663887600000, 'Fort Collins, CO', true);
    insert('470-303-1102', 1663797600000, 'Atlanta, GA', false);

    
    /* -------------------------------------------------------------------------- */
    /*                               Render Methods                               */
    /* -------------------------------------------------------------------------- */

    const Header = () => {
      const [ isPressed, setIsPressed ] = React.useState(true);
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
        <View style={{flex: 1, flexDirection: "row", position: "absolute", top: "2.75%", left: "37%"}}>
          <View style={{justifyContent: 'flex-start', alignItems: 'center'}}>
            <TouchableHighlight {...allProps}>
              <Text color={colors.text} style={styles.allmissedButtons}>All</Text>
            </TouchableHighlight>
          </View>
          <View style={{justifyContent: 'flex-start', alignItems: 'center'}}>
            <TouchableHighlight {...missedProps}>
              <Text color={colors.text} style={styles.allmissedButtons}>Missed</Text>
            </TouchableHighlight>
          </View>
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