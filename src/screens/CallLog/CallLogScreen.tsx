import React, { useMemo, useState, useEffect, useCallback } from "react";
import { View, FlatList, TouchableHighlight } from "react-native";
import { useTheme } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

/* Local Imports */
import createStyles from "./CallLogScreen.style";
import CallLogItem from "./components/card-item/CallLogItem";
import ListEmpty from "../../shared/components/list-empty/ListEmpty";

/* Shared Imports */
import Text from "../../shared/components/text-wrapper/TextWrapper";
import { getCallList } from "../../api/CallLogInterface";
import Styles from "../../shared/theme/styles";
import { ScreenHeight } from "@freakycoder/react-native-helpers";


interface CallLogScreenProps {}
const CallLogScreen: React.FC<CallLogScreenProps> = () => {
    const theme = useTheme();
    const { colors } = theme;
    const styles = useMemo(() => createStyles(theme), [theme]);
    const sharedStyles = useMemo(() => Styles(theme), [theme]);
    const [ showAll, setShowAll ] = useState(true);
    
    
    /* -------------------------------------------------------------------------- */
    /*                               Render Methods                               */
    /* -------------------------------------------------------------------------- */

    const Header = () => {
      
      const allProps = {
        activeOpacity: 1,
        underlayColor: colors.primary,
        style: [styles.allButton, {backgroundColor: showAll ? colors.transparent : colors.secondary}],
        onPress: () => {
          setShowAll(true);
        }
      };
      const missedProps = {
        activeOpacity: 1,
        underlayColor: colors.primary,
        style: [styles.missedButton, {backgroundColor: showAll ? colors.secondary : colors.transparent}],
        onPress: () => {
          setShowAll(false);
        }
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
              <Text color={colors.text} style={styles.allmissedButtons}>Blocked</Text>
            </TouchableHighlight>
          </View>
        </View>
      </>
      )
    };

    const CallLogs = () => {
      return (
        <View style={styles.listContainer}>
          <FlatList
            data={getCallList(showAll)}
            style={{maxHeight: ScreenHeight-275}}
            ListEmptyComponent={<ListEmpty message="No blocked or allowed incoming calls yet"/>}
            renderItem={({ item }) => (
              <CallLogItem data={item}/>
            )}
          />
        </View>
      );
    };

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