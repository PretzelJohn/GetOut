import React, { useMemo, useState, useEffect } from "react";
import { View, Image, useColorScheme, BackHandler, Platform } from "react-native";
import { useTheme } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

/* Local Imports */
import createStyles from "./WelcomeScreen.style";

/* Shared Imports */
import Text from "../../shared/components/text-wrapper/TextWrapper";
import Styles from "../../shared/theme/styles";
import { TouchableHighlight } from "react-native-gesture-handler";
import { navigate } from "react-navigation-helpers";
import { SCREENS } from "../../shared/constants/index";
import { getPermission, getRole, Role } from "../../api/PermissionInterface";
import { PERMISSIONS } from "react-native-permissions";
import { StartService } from "../../api/CallHandler";
import App from "App";

export let initialRoute = SCREENS.CALLLOG;

interface WelcomeScreenProps {}

const WelcomeScreen: React.FC<WelcomeScreenProps> = () => {
    const scheme = useColorScheme();
    const theme = useTheme();
    const { colors } = theme;
    const styles = useMemo(() => createStyles(theme), [theme]);
    const sharedStyles = useMemo(() => Styles(theme), [theme]);
  
    /* -------------------------------------------------------------------------- */
    /*                               Render Methods                               */
    /* -------------------------------------------------------------------------- */

    const Header = () => (
      <View style={sharedStyles.header}>
      </View>
    );
  
    const Welcome = () => (
      <View style={styles.contentContainer}>
        <Text color={colors.text} style={{fontSize: 25}}>
          Hello, welcome to:
        </Text>
      </View>
    );
  
    const Content = () => (
      <View style={{bottom: "26%"}}>
        <Welcome />
        <View>
          <View style={{borderBottomColor: colors.primary, borderBottomWidth: 1}}>
            <Text color={colors.text} style={{fontSize: 28, textAlign: "center", marginBottom: 20}}>
              Ready for your troubles and spammers to go away?
            </Text>
          </View>
          <Text color={colors.text} style={{marginTop: 20, fontSize: 28, textAlign: "center"}}>
            Let me get you started!
          </Text>
        </View>
      </View>
    ); 

    //On "Get Started" button press - go to settings after requesting perms
    const onGetStarted = async() => {
      let hasPermission = await getPermission(Platform.OS === "android" ? PERMISSIONS.ANDROID.READ_CONTACTS : PERMISSIONS.IOS.CONTACTS, true);

      if(hasPermission) {
        if(Platform.OS === "android") {
          getRole(Role.CALL_SCREENING);
          StartService(null);
        } else {
          //iOS call blocking init
        }

        //Open settings screen
        console.log('navigating to settings screen...');
        initialRoute = SCREENS.SETTINGS;
        navigate("SettingsScreen");
        return (<View><Text>Loading...</Text></View>);
      }
    }
  
    //Check if welcome screen should load
    const [loading, setLoading] = useState(true);
    const checkForFirstTimeLoaded = async () => {
      let hasPermission = await getPermission(Platform.OS === "android" ? PERMISSIONS.ANDROID.READ_CONTACTS : PERMISSIONS.IOS.CONTACTS, false);
      
      if(hasPermission) {
        console.log('navigating to recents screen...');
        initialRoute = SCREENS.CALLLOG;
        navigate("RecentsScreen");
        return (<View><Text>Loading...</Text></View>);
      }
      
      setLoading(false);
    };

    useEffect(() => {
      checkForFirstTimeLoaded();
    }, []);


    return (
      <SafeAreaView style={[sharedStyles.container, {marginLeft: "5%", marginRight: "5%"}]}>
        <View style={sharedStyles.circle1}>
          <View style={sharedStyles.circle}/>
        </View>
        <View style={sharedStyles.circle2}> 
          <View style={sharedStyles.circle}/>
        </View>
        <View>
          <Header />
          <Content />
          <View style={{position: "absolute"}}>
            <Image style={{resizeMode: "stretch", width: 390, height: 390, top: "20%", right: "15%"}} source={scheme === "dark" ? require("../../../assets/img/getout_dark.png") : require("../../../assets/img/getout_light.png")} />
          </View>
          <View style={{position: "absolute", justifyContent: "center", top: "80%",left: "5%", right: "5%"}}>
            <TouchableHighlight underlayColor={colors.transparent} onPress={onGetStarted} style={{backgroundColor: colors.primary, borderRadius: 15, height: 80, borderColor: colors.primary}}>
              <Text color={colors.text} style={{top: "22%",fontSize: 30, alignSelf: "center",textAlign: "center"}}>Get Started</Text>
            </TouchableHighlight>
          </View>
        </View>
      </SafeAreaView>
    );
};
  
export default WelcomeScreen;