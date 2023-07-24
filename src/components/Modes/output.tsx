import React from 'react';
import { StyleSheet, Dimensions, View, Image } from 'react-native';

const { width, height } = Dimensions.get('window');
const screenHeight = height * 0.29;
const imageSize = 25; // You can adjust the size of the image here

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
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* Add the image */}
      <Image
        source={require('../Assets/touch.png')}
        style={{ width: imageSize, height: imageSize, opacity: 0.3 }} // Adjust opacity as desired
      />
    </View>
  );
};

export default OutputScreen;
