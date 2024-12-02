/* eslint-disable react-native/no-inline-styles */
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';

export default function Button({onPress, type, width, text, style}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        {
          backgroundColor: type === 'primary' ? '#1ECC78' : '#ffffff',
          width: width,
          ...style,
        },
      ]}>
      <Text
        style={[
          styles.text,
          {color: type === 'primary' ? '#ffffff' : '#1ECC78'},
        ]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 53,
    borderWidth: 1,
    borderRadius: 14,
    borderColor: '#1ECC78',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Gilroy-Medium',
    fontSize: 18.51,
    letterSpacing: 0.07,
  },
});
