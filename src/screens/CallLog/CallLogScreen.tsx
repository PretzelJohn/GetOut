import React, { useMemo, useState } from "react";
import { View, FlatList } from "react-native";
import { useTheme } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

/* Local Imports */
import createStyles from "./CallLogScreen.style";
import CallLogItem from "./components/card-item/CallLogItem";
import { TouchableOpacity } from "react-native-gesture-handler";

/* Shared Imports */
import Text from "../../shared/components/text-wrapper/TextWrapper";
import fonts from "../../shared/theme/fonts";
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
    insert('678-223-8694', 1663912800000, 'Mableton, GA', false);
    insert('970-885-8195', 1663887600000, 'Fort Collins, CO', false);
    insert('470-303-1102', 1663797600000, 'Atlanta, GA', false);
    
    /* -------------------------------------------------------------------------- */
    /*                               Render Methods                               */
    /* -------------------------------------------------------------------------- */

    const Header = () => (
      <>
        <Text bold color={colors.text} style={sharedStyles.header}>
          Recents
        </Text>
        <View style={{position: 'absolute', top: '2.5%', left: '15%', right: 0, bottom: 0, justifyContent: 'flex-start', alignItems: 'center'}}>
          <TouchableOpacity style={styles.allButton}>
            <Text color={colors.black} style={styles.allmissedButtons}>All</Text>
          </TouchableOpacity>
        </View>
        <View style={{position: 'absolute', top: '2.5%', left: '47%', right: 0, bottom: 0, justifyContent: 'flex-start', alignItems: 'center'}}>
          <TouchableOpacity style={styles.missedButton}>
            <Text color={colors.black} style={styles.allmissedButtons}>Missed</Text>
          </TouchableOpacity>
        </View>
      </>
    );

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
      <SafeAreaView style={styles.container}>
        <View style={sharedStyles.circle1}/>
        <View style={sharedStyles.circle2}/> 
        <View style={styles.contentContainer}>
          <Header />
          <CallLogs />
        </View>
      </SafeAreaView>
    );
};

export default CallLogScreen;