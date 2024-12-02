/* eslint-disable curly */
/* eslint-disable react-native/no-inline-styles */
import {View, Text, Image, StyleSheet, Dimensions} from 'react-native';
import React, {useState, useRef} from 'react';
import {Navigation} from 'react-native-navigation';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import PaginationIndicator from './PaginationIndicator';
import Button from './Button';

var width = Dimensions.get('window').width;

const carouselData = [
  {
    img: require('../assets/images/Artwork1.png'),
    content: 'Chấm công qua GPS, Wifi,\nQR Code tích hợp sâu với AI',
  },
  {
    img: require('../assets/images/Artwork2.png'),
    content: 'Đăng ký Ca làm, Xếp ca\nlàm tự động',
  },
  {
    img: require('../assets/images/Artwork3.png'),
    content: 'Giao việc, quản lý công việc,\nquy trình và tiến độ',
  },
  {
    img: require('../assets/images/Artwork4.png'),
    content: 'Ứng lương, nhận phiếu lương\nvà tiền lương hàng tháng',
  },
  {
    img: require('../assets/images/Artwork5.png'),
    content: 'Số hóa 100% giấy tờ trong\ndoanh nghiệp',
  },
  {
    img: require('../assets/images/Artwork6.png'),
    content: 'Quản lý các thông báo, bản\ntin nội bộ',
  },
  {
    img: require('../assets/images/Artwork7.png'),
    content: 'Quản lý vị trí nhân viên trên\nbản đồ số',
  },
];

export default function MainCarousel({componentId}) {
  const scrollX = useSharedValue(0);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const onScrollHandler = useAnimatedScrollHandler({
    onScroll: (e) => {
      scrollX.value = e.contentOffset.x;
    },
  });

  //Carousel animation config
  const onViewableItemsChanged = ({viewableItems}) => {
    if (viewableItems[0].index !== undefined && viewableItems[0].index !== null)
      setCurrentSlideIndex(viewableItems[0].index);
  };

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  const viewabilityConfigCallbackPairs = useRef([
    {viewabilityConfig, onViewableItemsChanged},
  ]);

  return (
    <View>
      <Animated.FlatList
        horizontal
        style={styles.listContainer}
        data={carouselData}
        keyExtractor={(item) => item.img.toString()}
        renderItem={({item, index}) => (
          <View style={styles.itemContainer} key={index}>
            <Image source={item.img} />
            <Text style={styles.text}>{item.content}</Text>
          </View>
        )}
        onScroll={onScrollHandler}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
      />
      <PaginationIndicator
        currentSlideIndex={currentSlideIndex}
        itemsData={carouselData}
      />

      <View style={styles.buttonContainer}>
        <Button
          width={160}
          type={'secondary'}
          text={'Login'}
          style={{marginRight: 16}}
          onPress={() =>
            Navigation.push(componentId, {component: {name: 'Login'}})
          }
        />
        <Button
          width={160}
          type={'primary'}
          text={'Join Now'}
          onPress={() =>
            Navigation.push(componentId, {component: {name: 'Register'}})
          }
        />
      </View>
      <Text style={[styles.footerText, {fontFamily: 'Gilroy-Light'}]}>
        Sign in with{' '}
        <Text style={[styles.footerText, {fontFamily: 'Gilroy-Medium'}]}>
          Azure AD
        </Text>
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  itemContainer: {
    width: width,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    maxHeight: 373,
    marginBottom: 59,
  },
  text: {
    fontFamily: 'Mulish',
    fontSize: 24,
    lineHeight: 26.36,
    letterSpacing: 0.07,
    marginTop: 55,
    fontWeight: '500',
    textAlign: 'center',
  },
  buttonContainer: {
    flex: 1,
    maxHeight: 53,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 80,
  },
  footerText: {
    height: 23,
    marginTop: 27,
    fontSize: 16.45,
    lineHeight: 22.49,
    letterSpacing: 0.07,
    textAlign: 'center',
  },
});
