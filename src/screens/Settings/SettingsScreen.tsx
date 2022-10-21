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
import Styles from "../../shared/theme/styles";


interface SettingsScreenProps {}

const SettingsScreen: React.FC<SettingsScreenProps> = () => {
    const theme = useTheme();
    const { colors } = theme;
    const styles = useMemo(() => createStyles(theme), [theme]);
    const sharedStyles = useMemo(() => Styles(theme), [theme]);

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
          <Text color={colors.text} style={sharedStyles.header}>
            Settings
          </Text>
          <Text
            color={colors.placeholder}
            style={{marginBottom: 15}}
          >
          </Text>
        </>
    );

    const data = Settings.getSettings();
    const ToggleSettings = () => (
        <View style={styles.listContainer}>
            <ToggleItem data={data.contacts} name="Use Contacts" description="Uses your contact list to block calls" onPress={(value : boolean) => {SettingsHandlers.getPermission(PERMISSIONS.ANDROID.READ_CONTACTS)}} />
            <ToggleItem data={data.notifications} name="Notifications" description="Silently notifies you when a call is blocked" onPress={(value : boolean) => {SettingsHandlers.notifsPermissionsHandler(!value)}} />
            <ToggleItem data={data.whitelist} name="Enable Whitelist" description="Uses the whitelist to always allow certain calls" onPress={(value : boolean) => {Settings.setWhitelist(!value)}} />
            <ToggleItem data={data.blacklist} name="Enable Blacklist" description="Uses the blacklist to always block certain calls" onPress={(value : boolean) => {Settings.setBlacklist(!value)}} />
            <ToggleItem data={data.block_calls} name="Block Calls" description="Prevents spammers from interrupting you :D" onPress={(value : boolean) => {Settings.setBlockCalls(!value)}} />
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
          <View style={sharedStyles.circle1}/>
          <View style={sharedStyles.circle2}/> 
          <Header />
          <Content />
        </SafeAreaView>
      );
};

export default SettingsScreen;