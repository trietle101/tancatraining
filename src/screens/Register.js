/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  KeyboardAvoidingView,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import HeaderUtilities from '../components/HeaderUtilities';
import PhoneInput from '../components/PhoneInput';
import Button from '../components/Button';
import {Navigation} from 'react-native-navigation';

var width = Dimensions.get('window').width;
export default function Register({componentId}) {
  const [newUserName, setNewUserName] = useState('');
  const [newUserPhoneNumber, setNewUserPhoneNumber] = useState('');
  const [showAlert, setShowAlert] = useState('');

  const handleNameChange = (inputName) => {
    setNewUserName(inputName);
  };

  const handlePhoneNumberChange = (inputPhoneNumber) => {
    setNewUserPhoneNumber(inputPhoneNumber);
  };

  const handleSubmit = () => {
    //Validate name input
    const letters = newUserName.replace(/[^a-zA-Z]/g, '');
    if (newUserPhoneNumber.length > 9 && letters.length > 0) {
      Navigation.push(componentId, {
        component: {
          name: 'OTP',
          passProps: {
            newUserPhoneNumber: newUserPhoneNumber,
            isNewUser: true,
          },
        },
      });
    } else {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 5000);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.image}
        source={require('../assets/images/Maskgroup.png')}
      />
      <HeaderUtilities />
      <KeyboardAvoidingView
        behavior="position"
        style={styles.keyboardAvoidingContainer}>
        <View style={styles.modalContainer}>
          <View style={styles.formContainer}>
            <Text style={styles.title}>Đăng ký</Text>
            <Text style={styles.text}>Hãy cho chúng tôi biết về bạn</Text>
            <View style={styles.inputContainer}>
              <View style={styles.iconContainer}>
                <Image
                  source={require('../assets/icons/People.png')}
                  style={{width: 24, height: 24}}
                />
              </View>
              <TextInput
                style={styles.input}
                placeholderTextColor={'#DCE7F9'}
                placeholder="Nhập họ và tên"
                autoCapitalize="words"
                onChangeText={handleNameChange}
                autoFocus
              />
            </View>
            <PhoneInput
              phoneNumber={newUserPhoneNumber}
              onChange={handlePhoneNumberChange}
            />
            <Text
              style={[styles.alert, {display: showAlert ? 'flex' : 'none'}]}>
              Tên hoặc số điện thoại không hợp lệ
            </Text>
            <Button
              onPress={handleSubmit}
              type="primary"
              text="Đăng ký"
              style={{marginTop: 29}}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    position: 'relative',
    backgroundColor: '#F3FBF9',
    paddingTop: 0,
  },
  image: {
    position: 'absolute',
    width: width,
    top: 0,
    right: 0,
  },
  keyboardAvoidingContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: 'white',
    height: 341,
    width: width,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  modalContainer: {
    backgroundColor: 'white',
    height: 341,
    width: width,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  formContainer: {
    paddingTop: 29,
    paddingHorizontal: 19,
  },
  title: {
    fontFamily: 'Gilroy-SemiBold',
    fontSize: 23.43,
    marginBottom: 13,
  },
  text: {
    fontFamily: 'Gilroy-Regular',
    fontSize: 17,
    color: '#96A0BD',
    marginBottom: 40,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: '#F2F7FF',
  },
  iconContainer: {
    paddingRight: 0,
    backgroundColor: '#F2F7FF',
  },
  input: {
    flex: 1,
    height: 50,
    paddingLeft: 10,
    fontSize: 16,
    backgroundColor: '#F2F7FF',
  },
  alert: {
    fontFamily: 'Gilroy-Regular',
    fontSize: 17,
    color: 'red',
    marginTop: 7,
  },
});
