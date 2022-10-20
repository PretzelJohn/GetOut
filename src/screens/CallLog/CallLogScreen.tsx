import React, { useMemo, useState } from "react";
import { View, FlatList, Switch } from "react-native";
import { useTheme } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

/* Local Imports */
import createStyles from "./CallLogScreen.style";
import CallLogItem from "./components/card-item/CallLogItem";

/* Shared Imports */
import Text from "../../shared/components/text-wrapper/TextWrapper";
import fonts from "../../shared/theme/fonts";
import { getCallList, insert } from "../../api/CallLogInterface";

interface CallLogScreenProps {}
const CallLogScreen: React.FC<CallLogScreenProps> = () => {
    const [isEnabled, setIsEnabled] = React.useState(false);
    const toggleSwitch = () => setIsEnabled(!isEnabled);
    const theme = useTheme();
    const { colors } = theme;
    const styles = useMemo(() => createStyles(theme), [theme]);
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
        <Text bold color={colors.black} style={{fontSize: 45}}>
          Recents
        </Text>
        <View style={{ flex: 1, flexDirection: "row", justifyContent: "flex-end" }}>
          <Switch value={isEnabled} onValueChange={toggleSwitch}/>
        </View>
        <Text
          fontFamily={fonts.montserrat.lightItalic}
          color={colors.placeholder}
          style={{marginBottom: 15}}
        >
          Here are your recent calls.
        </Text>
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
        <View style={styles.contentContainer}>
          <Header />
          <CallLogs />
        </View>
      </SafeAreaView>
    );
};

export default CallLogScreen;