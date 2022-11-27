import React, { useMemo, useState, useEffect } from "react";
import { View, Image, useColorScheme, Platform } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import { useTheme } from "@react-navigation/native";
import { navigate } from "react-navigation-helpers";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScreenWidth } from "@freakycoder/react-native-helpers";

/* Local Imports */
import createStyles from "./WelcomeScreen.style";
import { StartService } from "../../api/CallHandler";
import { getNotifPermission, getRole, Role } from "../../api/PermissionInterface";

/* Shared Imports */
import Text from "../../shared/components/text-wrapper/TextWrapper";
import Styles from "../../shared/theme/styles";
import { SCREENS } from "../../shared/constants/index";


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
      let hasNotifPermission = await getNotifPermission(true);

      if(hasNotifPermission) {
        if(Platform.OS === "android") {
          getRole(Role.CALL_SCREENING);
          StartService(null);
        } else {
          //TODO: Open modal with instructions to enable call directory extension
          
        }

        //Open settings screen
        initialRoute = SCREENS.SETTINGS;
        navigate("SettingsScreen");
        return (<View><Text h1 style={{textAlign: "center"}}>Loading...</Text></View>);
      }
    }
  
    //Check if welcome screen should load
    const [loading, setLoading] = useState(true);
    const checkForFirstTimeLoaded = async () => {
      let hasNotifPermission = await getNotifPermission(false);
      
      if(hasNotifPermission) {
        if(Platform.OS === "android") {
          initialRoute = SCREENS.CALLLOG;
          navigate("RecentsScreen");
        } else {
          initialRoute = SCREENS.BLACKLIST;
          navigate("BlockedScreen");
        }
        
        return (<View><Text h1 style={{textAlign: "center"}}>Loading...</Text></View>);
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
            <Image style={{resizeMode: "stretch", width: ScreenWidth, height: ScreenWidth, top: "20%", right: "15%"}} source={scheme === "dark" ? require("../../../assets/img/getout_dark.png") : require("../../../assets/img/getout_light.png")} />
          </View>
          <View style={{position: "absolute", justifyContent: "center", top: "80%", left: "5%", right: "5%"}}>
            <TouchableHighlight underlayColor={colors.transparent} onPress={onGetStarted} style={{backgroundColor: colors.primary, borderRadius: 15, height: 80, borderColor: colors.primary}}>
              <Text color={colors.text} style={{top: "22%", fontSize: 30, alignSelf: "center", textAlign: "center"}}>Get Started</Text>
            </TouchableHighlight>
          </View>
        </View>
      </SafeAreaView>
    );
};
  
export default WelcomeScreen;