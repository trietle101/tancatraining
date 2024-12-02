import React from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import MainCarousel from '../components/MainCarousel';

function Main({componentId}) {
  return (
    <SafeAreaView style={styles.container}>
      <MainCarousel componentId={componentId} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 180,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Main;
