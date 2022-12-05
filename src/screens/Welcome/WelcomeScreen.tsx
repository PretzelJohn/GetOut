import React, { useMemo, useState, useEffect } from "react";
import { View, Image, useColorScheme, Platform, TextInput, Pressable } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import { useTheme } from "@react-navigation/native";
import { navigate } from "react-navigation-helpers";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScreenWidth } from "@freakycoder/react-native-helpers";
import Modal from 'react-native-modal';

/* Local Imports */
import createStyles from "./WelcomeScreen.style";
import { StartService } from "../../api/CallHandler";
import { getNotifPermission, getPermission, getRole, Role } from "../../api/PermissionInterface";

/* Shared Imports */
import Text from "../../shared/components/text-wrapper/TextWrapper";
import Styles from "../../shared/theme/styles";
import { SCREENS } from "../../shared/constants/index";
import { PERMISSIONS } from "react-native-permissions";


export let initialRoute = SCREENS.CALLLOG;

interface WelcomeScreenProps {}

const WelcomeScreen: React.FC<WelcomeScreenProps> = () => {
  const scheme = useColorScheme();
  const theme = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);
  const sharedStyles = useMemo(() => Styles(theme), [theme]);

  const [ isModalVisible, setModalVisible ] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  }


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
            Block unwanted calls
          </Text>
        </View>
        <Text color={colors.text} style={{marginTop: 20, fontSize: 28, textAlign: "center"}}>
          Let's get started!
        </Text>
      </View>
    </View>
  ); 

  //Instruction modal to show users how to enable call blocking on iOS
  const CallBlockingModal = () => (
    <Modal isVisible={isModalVisible} animationIn={'fadeIn'} animationOut={'fadeIn'}>
      <View style={sharedStyles.modalView}>
        <View style={{alignItems: "flex-start"}}>
          <Text h1 color={colors.text}>Enable call blocking</Text>
          <Text h3 color={colors.text}>1. Go to Settings -&gt; Phone</Text>
          <Text h3 color={colors.text}>2. Tap Call Blocking & Identification</Text>
          <Text h3 color={colors.text}>3. Enable GetOut</Text>
        </View>
        <View style={{flex: 1, flexDirection: "row"}}>
          <Pressable style={styles.doneButton} onPress={() => {
            toggleModal();
            onGetStarted();
          }}>
            <Text color={colors.text}>Done</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  )

  //On "Get Started" button press - go to settings after requesting perms
  const onGetStarted = async() => {
    let hasContactPermission = await getPermission(Platform.OS === "android" ? PERMISSIONS.ANDROID.READ_CONTACTS : PERMISSIONS.IOS.CONTACTS, true);
    let hasNotifPermission = await getNotifPermission(true);

    if(hasContactPermission && hasNotifPermission) {
      if(Platform.OS === "android") {
        getRole(Role.CALL_SCREENING);
        StartService(null);
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
    let hasContactPermission = await getPermission(Platform.OS === "android" ? PERMISSIONS.ANDROID.READ_CONTACTS : PERMISSIONS.IOS.CONTACTS, false);
    let hasNotifPermission = await getNotifPermission(false);
    
    if(hasContactPermission && hasNotifPermission) {
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


  const TouchProps = {
    underlayColor: colors.transparent,
    style: {backgroundColor: colors.primary, borderRadius: 15, height: 80, borderColor: colors.primary},
    onPress: () => {
      if(Platform.OS === "ios") {
        toggleModal();
      } else {
        onGetStarted();
      }
    }
  };

  return (
    <SafeAreaView style={sharedStyles.container}>
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
          <Image style={{resizeMode: "stretch", width: ScreenWidth, height: ScreenWidth, top: "20%", right: "23%"}} source={scheme === "dark" ? require("../../../assets/img/getout_dark.png") : require("../../../assets/img/getout_light.png")} />
        </View>
        <View style={{position: "absolute", justifyContent: "center", top: "80%", left: "5%", right: "5%"}}>
          <TouchableHighlight {...TouchProps}>
            <Text color={colors.text} style={{top: "22%", fontSize: 30, alignSelf: "center", textAlign: "center"}}>Get Started</Text>
          </TouchableHighlight>
        </View>
      </View>
      <CallBlockingModal/>
    </SafeAreaView>
  );
};
  
export default WelcomeScreen;