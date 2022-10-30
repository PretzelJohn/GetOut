import React, { useMemo } from "react";
import { View, Image } from "react-native";
import { useTheme } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

/* Local Imports */
import createStyles from "./WelcomeScreen.style";

/* Shared Imports */
import Text from "../../shared/components/text-wrapper/TextWrapper";
import fonts from "../../shared/theme/fonts";
import Styles from "../../shared/theme/styles";
import { TouchableHighlight } from "react-native-gesture-handler";

interface WelcomeScreenProps {}

const WelcomeScreen: React.FC<WelcomeScreenProps> = () => {
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
            <Image style={{resizeMode: "stretch", width: 350, height: 350, top: "20%", right: "10%"}} source={theme === "dark" ? require("../../../assets/img/getout_dark.png") : require("../../../assets/img/getout_light.png")} />
          </View>
          <View style={{position: "absolute", justifyContent: "center", top: "80%",left: "5%", right: "5%"}}>
            <TouchableHighlight style={{backgroundColor: colors.primary, borderRadius: 15, height: 80, borderColor: colors.primary}}>
              <Text color={colors.text} style={{top: "22%",fontSize: 30, alignSelf: "center",textAlign: "center"}}>Get Started</Text>
            </TouchableHighlight>
          </View>
        </View>
      </SafeAreaView>
    );
};
  
export default WelcomeScreen;