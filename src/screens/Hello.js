import React, {useEffect} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {Navigation} from 'react-native-navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Hello({componentId}) {
  const isSignedIn = async () => {
    // await AsyncStorage.clear();
    try {
      const value = await AsyncStorage.getItem('token');
      if (value !== null) {
        Navigation.push(componentId, {
          component: {
            name: 'Home',
          },
        });
      } else {
        Navigation.push(componentId, {
          component: {
            name: 'Main',
          },
        });
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      isSignedIn();
    }, 3000);
  });

  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/Logo.png')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Hello;
