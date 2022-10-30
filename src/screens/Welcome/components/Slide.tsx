import React from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import ISlides from './ISlide';

interface ICardItemProps {
  item: ISlides;
}

const Slide: React.FC<ICardItemProps>  = ({ item }) => {
  const { title, desc, backgroundColor } = item;
  return (
    <View style={[styles.slide, { backgroundColor }]}>
      <Text style={styles.text}>{title}</Text>
      <Text style={styles.text}>{desc}</Text>
    </View>
  );
};

const { width, height } = Dimensions.get('screen');

const styles = StyleSheet.create({
  slide: {
    width,
    height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 20,
  },
});

export default Slide;