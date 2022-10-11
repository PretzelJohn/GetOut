import React, { useMemo } from "react";
import { View, FlatList } from "react-native";
import { useTheme } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

/* Local Imports */
import createStyles from "./CallLogScreen.style";
import CardItem from "./components/card-item/CardItem";

/* Shared Imports */
import Text from "../../shared/components/text-wrapper/TextWrapper";
import fonts from "../../shared/theme/fonts";

import { getCallList, insert } from "../../api/CallLogInterface";
import { getWhitelist } from "../../api/WhitelistInterface";
import { getBlacklist } from "../../api/BlacklistInterface";


interface CallLogScreenProps {}

const CallLogScreen: React.FC<CallLogScreenProps> = () => {
    const theme = useTheme();
    const { colors } = theme;
    const styles = useMemo(() => createStyles(theme), [theme]);

    const handleItemPress = () => {
      //NavigationService.push(SCREENS.CALLLOG);
    };


    //Testing whitelist, blacklist, and call log - will be moved into their own files
    const whitelist = getWhitelist();
    const blacklist = getBlacklist();
    insert('678-923-1102', 1664349720000, 'Mableton, GA', false);
    insert('678-223-8694', 1663912800000, 'Mableton, GA', false);
    insert('970-885-8195', 1663887600000, 'Fort Collins, CO', false);
    insert('470-303-1102', 1663797600000, 'Atlanta, GA', false);
    

    /* -------------------------------------------------------------------------- */
    /*                               Render Methods                               */
    /* -------------------------------------------------------------------------- */


    // TODO: Add menu hamburger here if using menu stack    
    const CallLogsHeader = () => (
      <>
        <Text h1 bold color={colors.text}>
          Call Log
        </Text>
        <Text
          fontFamily={fonts.montserrat.lightItalic}
          color={colors.placeholder}
        >
          Here are the calls blocked by GetOut.
        </Text>
      </>
    );

    
    const CallLogs = () => (
      <View style={styles.listContainer}>
        <FlatList
          data={getCallList()}
          renderItem={({ item }) => (
            <CardItem data={item} onPress={handleItemPress} />
          )}
        />
      </View>
    );
    
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.contentContainer}>
          <CallLogsHeader />
          <CallLogs />
        </View>
      </SafeAreaView>
    );
};

export default CallLogScreen;