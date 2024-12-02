/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
} from 'react-native';

export default function PhoneInput({phoneNumber, onChange}) {
  const phoneNumberRegex = /^[0-9]{10,15}$/;

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.countryCodeContainer}>
          <Text style={styles.countryCode}>+84</Text>
          <Image
            source={require('../assets/icons/Arrow-Down-2.png')}
            style={{width: 15, height: 15}}
          />
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder="Your phone number"
          placeholderTextColor={'#DCE7F9'}
          keyboardType="numeric"
          value={phoneNumber}
          onChangeText={(text) => onChange(text.replace(/[^0-9]/g, ''))}
        />

        {phoneNumberRegex.test(phoneNumber) && (
          <Image
            source={require('../assets/icons/check.png')}
            style={styles.checkIcon}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  inputContainer: {
    flexDirection: 'row',
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#F1F0E8',
    height: 50,
  },
  countryCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F7FF',
    paddingHorizontal: 10,
    height: '100%',
    borderRightWidth: 1,
    borderColor: '#E4ECFF',
  },
  countryCode: {
    fontSize: 16,
    marginRight: 5,
    color: '#333',
  },
  input: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#F2F7FF',
  },
  checkIcon: {
    width: 15,
    height: 15,
    position: 'absolute',
    right: 10,
    top: 18,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    width: '80%',
    borderRadius: 8,
    padding: 20,
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  dropdownText: {
    fontSize: 16,
    color: '#333',
  },
});
