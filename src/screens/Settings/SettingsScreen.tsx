import React, { useMemo, useState, useEffect } from "react";
import { View } from "react-native";
import { useTheme } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { PERMISSIONS } from "react-native-permissions";

/* Local Imports */
import createStyles from './SettingsScreen.style';
import * as Settings from '../../api/SettingsInterface'
import * as Permissions from "../../api/PermissionInterface";
import { StartService, StopService } from "../../api/CallHandler";

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


  /* -------------------------------------------------------------------------- */
  /*                               State Handlers                               */
  /* -------------------------------------------------------------------------- */

  // //Updates the contact permission state
  // const [canUseContacts, setCanUseContacts] = useState(Settings.getContacts());
  // const getCanUseContacts = async(shouldRequest : boolean = false) => {
  //   setCanUseContacts(await Permissions.getPermission(PERMISSIONS.ANDROID.READ_CONTACTS, shouldRequest));
  // }

  // //Updates the notification permission state
  // const [canUseNotifs, setCanUseNotifs] = useState(Settings.getNotifications());
  // const getCanUseNotifs = async(shouldRequest : boolean = false) => {
  //   setCanUseNotifs(await Permissions.getNotifPermission());
  // }

  // //Updates the database with the new contact value
  // const updateContacts = async(value : boolean) => {
  //   if(!value && canUseContacts) {
  //     Settings.setContacts(true);
  //   } else if(!value) {
  //     await getCanUseContacts(!canUseContacts);
  //     Settings.setContacts(canUseContacts);
  //   } else {
  //     Settings.setContacts(false);
  //   }
  // }

  // //Updates the database with the new contact value
  // const updateNotifs = async(value : boolean) => {
  //   if(!value && canUseNotifs) {
  //     Settings.setNotifications(true);
  //   } else if(!value) {
  //     await getCanUseNotifs(!canUseNotifs);
  //     Settings.setNotifications(canUseNotifs);
  //   } else {
  //     Settings.setNotifications(false);
  //   }
  // }


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
        <ToggleItem style={{borderTopLeftRadius: 10, borderTopRightRadius: 10, marginTop: -5}} data={data.contacts} name="Use Contacts" description="Uses your contact list to block calls" onPress={(value : boolean) => {
          if(!value) Permissions.getPermission(PERMISSIONS.ANDROID.READ_CONTACTS, true);
          Settings.setUseContacts(!value);
        }} />
        <ToggleItem data={data.notifications} name="Notifications" description="Silently notifies you when a call is blocked" onPress={(value : boolean) => {
          if(!value) Permissions.getNotifPermission();
          Settings.setUseNotifications(!value);
        }} />
        <ToggleItem data={data.whitelist} name="Enable Whitelist" description="Uses the whitelist to always allow certain calls" onPress={(value : boolean) => {Settings.setUseWhitelist(!value)}} />
        <ToggleItem data={data.blacklist} name="Enable Blacklist" description="Uses the blacklist to always block certain calls" onPress={(value : boolean) => {Settings.setUseBlacklist(!value)}} />
        <ToggleItem style={{borderBottomLeftRadius: 10, borderBottomRightRadius: 10}} data={data.block_calls} name="Block Calls" description="Prevents spammers from interrupting you" onPress={async(value : boolean) => {
          await Settings.setBlockCalls(!value);
          if(value) {
            StopService();
          } else {
            StartService(null);
          }
        }} />
      </View>
    );
  };

  const SelectSettings = () =>(
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