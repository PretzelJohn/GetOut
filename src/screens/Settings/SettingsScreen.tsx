import React, { useMemo } from "react";
import { Platform, View, NativeModules } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@react-navigation/native";

/* Local Imports */
import createStyles from './SettingsScreen.style';
import ToggleItem from "./components/toggle-item/ToggleItem";
import SelectItem from "./components/select-item/SelectItem";
import { StartService, StopService } from "../../api/CallHandler";
import { _loadBlacklist } from "../../api/BlacklistInterface";
import * as Settings from '../../api/SettingsInterface'
import * as Permissions from "../../api/PermissionInterface";

/* Shared Imports */
import Text from '../../shared/components/text-wrapper/TextWrapper';
import Styles from "../../shared/theme/styles";


interface SettingsScreenProps {}

const SettingsScreen: React.FC<SettingsScreenProps> = () => {
  const theme = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);
  const sharedStyles = useMemo(() => Styles(theme), [theme]);


  /* -------------------------------------------------------------------------- */
  /*                               Render Methods                               */
  /* -------------------------------------------------------------------------- */

  const Header = () => (
    <>
      <Text color={colors.text} style={sharedStyles.header}>
        Settings
      </Text>
    </>
  );

  const data = Settings.getSettings();
  const ToggleSettings = () => {
    return(
      <View style={styles.listContainer}>
        {Platform.OS === "android" && 
          <>
            <ToggleItem style={{borderTopLeftRadius: 10, borderTopRightRadius: 10, marginTop: -5}} data={data.contacts} name="Use Contacts" description="Uses your contact list to block calls" onPress={(value : boolean) => {Settings.setUseContacts(!value)}} />
            <ToggleItem data={data.notifications} name="Notifications" description="Silently notifies you when a call is blocked" onPress={(value : boolean) => {
              if(!value) Permissions.getNotifPermission();
              Settings.setUseNotifications(!value);
            }} />
            <ToggleItem data={data.whitelist} name="Enable Whitelist" description="Uses the whitelist to always allow certain calls" onPress={(value : boolean) => {Settings.setUseWhitelist(!value)}} />
            <ToggleItem data={data.blacklist} name="Enable Blacklist" description="Uses the blacklist to always block certain calls" onPress={(value : boolean) => {Settings.setUseBlacklist(!value)}} />
          </>
        }

        <ToggleItem style={{borderTopLeftRadius: Platform.OS === "ios" ? 10 : 0, borderTopRightRadius: Platform.OS === "ios" ? 10 : 0, marginTop: Platform.OS === "ios" ? -5 : 0, borderBottomLeftRadius: 10, borderBottomRightRadius: 10}} data={data.block_calls} name="Block Calls" description="Prevents spammers from interrupting you" onPress={async(value : boolean) => {
          await Settings.setBlockCalls(!value);
          if(Platform.OS === "android") {
            if(value) StopService();
            else StartService(null);
          } else {
            if(value) {
              console.log("updating blacklist to []");
              NativeModules.CallModuleiOS.updateBlacklist([]);
            } else {
              const blacklist = await _loadBlacklist('');
              console.log("updating blacklist to "+blacklist);
              NativeModules.CallModuleiOS.updateBlacklist(blacklist.map(x => x.phone_number));
            }
          }
        }} />
      </View>
    );
  };

  const SelectSettings = () => (
    <View>
      <SelectItem data={data.theme} name="Select Theme" description={data.theme} onPress={(value: string) => {
        Settings.setTheme(value);
      }} />
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
        <Header/>
        <ToggleSettings />
        <SelectSettings />
      </View>
    </SafeAreaView>
  );
};

export default SettingsScreen;