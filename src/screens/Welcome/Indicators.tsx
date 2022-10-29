import React from 'react';
import { View, StyleSheet } from 'react-native';

interface ICardItemProps {
  indicatorCount: number;
  currentSlideIndex: number;
}

const Indicators: React.FC<ICardItemProps>= ({ indicatorCount, currentSlideIndex }) => {

  let indicators = [];
  for (let i = 0; i < indicatorCount; i++) {
    indicators.push(i);
  }
  return (
  <>
    {indicators.map((indicator, index) => (
      <View
        key={indicator.toString()}
        style={[
          styles.indicator,
          index === currentSlideIndex ? styles.selected : styles.unSelected,
        ]}
      />
    ))}
  </>
  );
};

const styles = StyleSheet.create({
  indicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  selected: {
    backgroundColor: 'white',
  },
  unSelected: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: 'white',
  },
});

export default Indicators;