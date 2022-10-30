import React, { useState, useRef, useMemo} from 'react';
import { View, StyleSheet, FlatList, Text, Dimensions, Image } from 'react-native';
import Indicators from './components/Indicators';
import Slide from './components/Slide';
import ISlides from './components/ISlide';
import { useTheme } from "@react-navigation/native";

/* Local Imports */
import WelcomeScreen from "./WelcomeScreen";

/* Shared Imports */
import Styles from "../../shared/theme/styles";

interface ICardItemProps {
  slides: ISlides[];
  onDone: () => void ;
}

const Welcome:React.FC<ICardItemProps>  = ({ slides, onDone }) => {
  const theme = useTheme();
  const { colors } = theme;
  const sharedStyles = useMemo(() => Styles(theme), [theme]);

  if (!slides || !slides.length) return null;
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const onViewableItemsChanged = useRef((item: any) => {
    const index = item.viewableItems[0].index;
    setCurrentSlideIndex(index);
  });

  const handleSkip = () => {
    flatListRef.current?.scrollToEnd({ animated: true }); 
  };

  const handleNext = () => {
    if (currentSlideIndex >= slides.length - 1) return;
    flatListRef.current?.scrollToIndex({ index: currentSlideIndex + 1 });
  };

  return (
    <>
      <FlatList
        ref={flatListRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        data={slides}
        keyExtractor={item => item.key.toString()}
        renderItem={({ item }) => <Slide item={item}/>}
        onViewableItemsChanged={onViewableItemsChanged.current}
      />
      <View style={styles.indicatorContainer}>
        <Indicators
          currentSlideIndex={currentSlideIndex}
          indicatorCount={slides.length}
        />
      </View>
      {currentSlideIndex < slides.length - 1 && (
        <>
          <WelcomeScreen/>
          <Text onPress={handleSkip} style={[styles.button, styles.leftButton]}>
            Skip
          </Text>
          <WelcomeScreen/>
        </>
      )}
      {currentSlideIndex < slides.length - 1 ? (
        <Text onPress={handleNext} style={[styles.button, styles.rightButton]}>
          Next
        </Text>
      ) : (
        <Text onPress={onDone} style={[styles.button, styles.rightButton]}>
          Done
        </Text>
      )}
    </>
  );
};

const { width } = Dimensions.get('screen');

const styles = StyleSheet.create({
  indicatorContainer: {
    position: 'absolute',
    width,
    bottom: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    fontSize: 18,
    color: 'white',
    letterSpacing: 2,
  },
  leftButton: {
    position: 'absolute',
    left: 10,
    bottom: 20,
  },
  rightButton: {
    position: 'absolute',
    right: 10,
    bottom: 20,
  },
});

export default Welcome;
