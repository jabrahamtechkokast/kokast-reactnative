import React from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';

const { width, height } = Dimensions.get('window');
const screenHeight = height * 0.29;

interface Props {
  Outputwidth: number;
}

const OutputScreen: React.FC<Props> = ({ Outputwidth }) => {
  return (
    <View
      style={{
        width: Outputwidth,
        height: screenHeight,
        backgroundColor: 'rgba(255, 255, 255, 0.1)', // Semi-transparent white
        borderRadius: 10,
      }}
    />
  );
};

export default OutputScreen;
