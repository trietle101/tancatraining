/* eslint-disable curly */
/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useState} from 'react';
import {Navigation} from 'react-native-navigation';
import HeaderUtilities from '../components/HeaderUtilities';
import PhoneInput from '../components/PhoneInput';
import Button from '../components/Button';

var width = Dimensions.get('window').width;
export default function Login({componentId}) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showAlert, setShowAlert] = useState('');

  const handleChange = (inputPhoneNumber) => {
    setPhoneNumber(inputPhoneNumber);
  };

  async function handleSubmit() {
    try {
      const response = await fetch(
        'https://api.jsonbin.io/v3/b/674c9abee41b4d34e45dee54',
        {
          method: 'GET',
          headers: {
            'X-Master-Key':
              '$2a$10$csjuoFDdYnpFAuUwd/4ubekiDfcxiBFCFeuNwmu94Bdu8FoTAu7pe',
          },
        },
      );

      const data = await response.json();
      const user = await data.record.filter(
        (u) => u.phoneNumber === phoneNumber,
      );
      if (user.length > 0) {
        Navigation.push(componentId, {
          component: {
            name: 'OTP',
            passProps: {
              user: user[0],
              isNewUser: false,
            },
          },
        });
        console.log(user[0]);
      } else {
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 5000);
      }
    } catch (error) {
      console.error(
        'There has been a problem with your fetch operation:',
        error,
      );
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.backGround}
        source={require('../assets/images/Bg-Gradiend.png')}
      />

      <HeaderUtilities />
      <Image
        style={styles.logo}
        source={require('../assets/images/Logo2.png')}
      />
      <KeyboardAvoidingView
        behavior="position"
        style={styles.keyboardAvoidingContainer}>
        <View style={styles.modalContainer}>
          <View style={styles.formContainer}>
            <Text style={styles.title}>Đăng nhập</Text>
            <Text style={styles.text}>
              Xin chào, rất vui khi bạn đã quay lại
            </Text>
            <PhoneInput phoneNumber={phoneNumber} onChange={handleChange} />
            <Text
              style={[styles.alert, {display: showAlert ? 'flex' : 'none'}]}>
              Không tìm thấy người dùng
            </Text>
            <Button
              type="primary"
              text="Đăng nhập"
              style={{marginTop: 29}}
              onPress={handleSubmit}
            />
            <Text style={[styles.footerText, {fontFamily: 'Gilroy-Light'}]}>
              Sign in with{' '}
              <Text style={[styles.footerText, {fontFamily: 'Gilroy-Medium'}]}>
                Azure AD
              </Text>
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#F3FBF9',
    paddingTop: 0,
  },
  backGround: {
    position: 'absolute',
    width: width,
    height: 812,
    top: 10,
    right: 0,
  },
  logo: {
    position: 'absolute',
    top: 250,
    left: 106,
  },
  keyboardAvoidingContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: 'white',
    height: 425,
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
    height: 425,
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
  alert: {
    fontFamily: 'Gilroy-Regular',
    fontSize: 17,
    color: 'red',
    marginTop: 7,
  },
  footerText: {
    height: 23,
    marginTop: 44,
    fontSize: 16.45,
    lineHeight: 22.49,
    letterSpacing: 0.07,
    textAlign: 'center',
  },
});
