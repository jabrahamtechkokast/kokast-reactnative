import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');
const boxWidth = width;
const boxHeight = height/2.6
const leftPadding = (boxWidth - (boxWidth/7.5)) / 2

export const KokastHeader = () => {
  return (
    <View>
      <Image source={require('./Assets/HeaderLogo.png')} style={styles.image} resizeMode='contain'/>
    </View>
  );
};

const styles = StyleSheet.create({
    image:{
        width: boxWidth/7.5,
        height: boxHeight/4,
        left: leftPadding,
    }
})