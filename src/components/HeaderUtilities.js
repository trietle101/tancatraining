/* eslint-disable react-native/no-inline-styles */
import {View, StyleSheet, Image} from 'react-native';
import React from 'react';

export default function HeaderUtilities() {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/icons/X.png')} />
      <View style={styles.rightIconsContainer}>
        <Image
          style={{marginRight: 10}}
          source={require('../assets/icons/DownTriangle.png')}
        />
        <Image source={require('../assets/icons/VN.png')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 22,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  rightIconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
