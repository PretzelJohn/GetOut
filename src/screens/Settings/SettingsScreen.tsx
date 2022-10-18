import React, { useMemo } from "react";
import { View } from "react-native";
import { useTheme } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { PERMISSIONS } from "react-native-permissions";

/* Local Imports */
import createStyles from './SettingsScreen.style';
import * as Settings from '../../api/SettingsInterface'
import * as SettingsHandlers from "../../services/SettingsServices";

/* Shared Imports */
import Text from '../../shared/components/text-wrapper/TextWrapper';
import ToggleItem from "./components/toggle-item/ToggleItem";
import SelectItem from "./components/select-item/SelectItem";



interface SettingsScreenProps {}

const SettingsScreen: React.FC<SettingsScreenProps> = () => {
    const theme = useTheme();
    const { colors } = theme;
    const styles = useMemo(() => createStyles(theme), [theme]);

    const handleItemPress = () => {
        //NavigationService.push(SCREENS.CALLLOG);
    };


    /* -------------------------------------------------------------------------- */
    /*                               Render Methods                               */
    /* -------------------------------------------------------------------------- */

    const Header = () => (
        <View style={styles.header}>
        </View>
    );

    const Label = () => (
        <>
            <Text h1 bold color={colors.black}>
                Settings
            </Text>
        </>
    );

    const data = Settings.getSettings();
    const ToggleSettings = () => (
        <View style={styles.listContainer}>
            <ToggleItem data={data.contacts} name="Use contacts" description="Uses your contact list to block calls" onPress={(value : boolean) => {SettingsHandlers.getPermission(PERMISSIONS.ANDROID.READ_CONTACTS)}} />
            <ToggleItem data={data.notifications} name="Notifications" description="Silently notifies you when a call is blocked" onPress={(value : boolean) => {SettingsHandlers.notifsPermissionsHandler(!value)}} />
            <ToggleItem data={data.whitelist} name="Enable whitelist" description="Uses the whitelist to always allow certain calls" onPress={(value : boolean) => {Settings.setWhitelist(!value)}} />
            <ToggleItem data={data.blacklist} name="Enable blacklist" description="Uses the blacklist to always block certain calls" onPress={(value : boolean) => {Settings.setBlacklist(!value)}} />
            <ToggleItem data={data.block_calls} name="Block calls" description="Prevents spammers from interrupting you :D" onPress={(value : boolean) => {Settings.setBlockCalls(!value)}} />
        </View>
    );

    const SelectSettings = () =>(
        <View>
            <SelectItem data={data.theme} name="Select Theme" description={data.theme} onPress={() => {}} />
        </View>
    );

    const Content = () => (
        <View style={styles.contentContainer}>
          <Label />
          <ToggleSettings />
          <SelectSettings />
        </View>
      );

    return (
        <SafeAreaView style={styles.container}>
          <Header />
          <Content />
        </SafeAreaView>
      );
};

export default SettingsScreen;