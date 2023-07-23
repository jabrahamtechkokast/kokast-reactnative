import React from 'react';
import { TouchableOpacity, Image, StyleSheet, View, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const boxWidth = width;
const boxHeight = height / 2.6;

export const Audio = () => {
  return (
    <View style={styles.audioContainer}>
      <TouchableOpacity
        style={styles.audioButton}
        onPress={() => setModalVisible(true)}
      >
        <Image
          source={require('./Assets/audio.png')} // Replace with the audio icon image
          style={styles.audioImage}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  audioContainer: {
    position: 'absolute',
    top: 8, // Adjust this value to set the gap from the top edge
    right: 10, // Position on the right side of the screen
  },
  audioButton: {
    width: boxWidth / 7.5,
    height: boxHeight / 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    padding: 5,
  },
  audioImage: {
    width: '200%',
    height: '200%',
  },
});

export default Audio;
