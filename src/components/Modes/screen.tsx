import React from 'react'
import {StyleSheet, Dimensions, View} from 'react-native';

const {width, height} = Dimensions.get('window');
const screenWidth = width*0.88;
const screenHeight = height*0.33;



export default function InfinityDisplay() {
  return (
    <View
      style={{
        width: screenWidth,
        height: screenHeight,
        backgroundColor: 'darkblue', // Replace with your desired background color
      }}
    />
  );
}
