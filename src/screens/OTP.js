/* eslint-disable curly */
/* eslint-disable no-unused-vars */
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
import React, {useState, useRef, useEffect} from 'react';
import {Navigation} from 'react-native-navigation';
import HeaderUtilities from '../components/HeaderUtilities';
import Button from '../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';

var width = Dimensions.get('window').width;
export default function OTP({
  componentId,
  user,
  newUserPhoneNumber,
  isNewUser,
}) {
  const [otp, setOtp] = useState(Array(6).fill(''));
  const [focusIndex, setIndexFocus] = useState(-1);
  const [showAlert, setShowAlert] = useState('');
  const [timer, setTimer] = useState(60);
  const inputsRef = useRef([]);

  const handleChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    //Move to the next input
    if (text && index < 5 - 1) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleBackspaceKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  function generateToken(length) {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return Array.from(
      {length},
      () => characters[Math.floor(Math.random() * characters.length)],
    ).join('');
  }

  const handleSubmit = async () => {
    //Register flow
    if (isNewUser) {
      const token = generateToken(10);
      //Fake otp to test
      const pseudoOTP = '12345';
      if (pseudoOTP === otp.join('')) {
        await AsyncStorage.setItem('token', token);
        Navigation.push(componentId, {
          component: {
            name: 'Home',
            passProps: {
              user: user,
            },
          },
        });
        const value = await AsyncStorage.getItem('token');
        console.log(value);
      } else {
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 5000);
      }
    }
    //Sign in flow
    else {
      if (user.otp === otp.join('')) {
        await AsyncStorage.setItem('token', user.token);
        Navigation.push(componentId, {
          component: {
            name: 'Home',
            passProps: {
              user: user,
            },
          },
        });
        const value = await AsyncStorage.getItem('token');
        console.log(value);
      } else {
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 5000);
      }
    }
  };

  //Count down timer
  useEffect(() => {
    if (timer > 0) {
      const countDown = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(countDown);
    } else setTimer(60);
  }, [timer]);

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
            <Text style={styles.title}>Xác minh OTP</Text>
            <Text style={styles.text}>
              Nhập mã OTP gửi đến{' '}
              {isNewUser
                ? `+84${newUserPhoneNumber.substring(1)}`
                : `+84${user?.phoneNumber.substring(1)}`}
            </Text>
            <View style={styles.containerOTP}>
              {Array(5)
                .fill(0)
                .map((_, index) => (
                  <TextInput
                    key={index}
                    value={otp[index]}
                    onChangeText={(text) => handleChange(text, index)}
                    onKeyPress={(e) => {
                      handleBackspaceKeyPress(e, index);
                    }}
                    style={[
                      styles.inputOTP,
                      {
                        borderWidth: focusIndex === index ? 1 : 0,
                        borderColor: '#1ECC78',
                      },
                    ]}
                    keyboardType="numeric"
                    maxLength={1}
                    ref={(ref) => (inputsRef.current[index] = ref)}
                    onFocus={() => setIndexFocus(index)}
                    onBlur={() => setIndexFocus(-1)}
                    autoFocus={index === 0}
                  />
                ))}
            </View>
            <Text
              style={[styles.alert, {display: showAlert ? 'flex' : 'none'}]}>
              Mã OTP không đúng
            </Text>
            <Button
              type="primary"
              text="Đồng ý"
              style={{marginTop: 29}}
              onPress={handleSubmit}
            />
            <Text style={[styles.footerText, {fontFamily: 'Gilroy-Light'}]}>
              Gửi lại sau{' '}
              <Text style={[styles.footerText, {fontFamily: 'Gilroy-Medium'}]}>
                {`(${timer}s)`}
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
  containerOTP: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputOTP: {
    fontFamily: 'Gilroy-Bold',
    fontSize: 20.82,
    color: '#303E65',
    height: 52,
    width: 47,
    borderRadius: 10,
    textAlign: 'center',
    backgroundColor: '#F2F7FF',
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
