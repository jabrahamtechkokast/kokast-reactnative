import React from 'react'
import {StyleSheet, Dimensions, View} from 'react-native';

const {width, height} = Dimensions.get('window');
const screenHeight = height*0.29;

export default function OutputScreen(width: number) {
  return (
    <View
      style={{
        width: width,
        height: screenHeight,
        backgroundColor: 'darkblue', // Replace with your desired background color
      }}
    />
  );
}
