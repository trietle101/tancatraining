/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
import {View, StyleSheet} from 'react-native';
import React from 'react';

export default function PaginationIndicator({itemsData, currentSlideIndex}) {
  return (
    <View style={styles.container}>
      {itemsData.map((_, index) => (
        <View
          style={[
            styles.indicator,
            {
              backgroundColor:
                index === currentSlideIndex ? '#1ECC78' : '#E4ECFF',
            },
          ]}
          key={index}></View>
      ))}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicator: {
    height: 8,
    width: 8,
    marginHorizontal: 4,
    borderRadius: 8,
  },
});
