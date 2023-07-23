import React, { ReactNode } from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';

const { width, height } = Dimensions.get('window');
const screenWidth = width * 0.9;
const screenHeight = height * 0.33;

interface InfinityDisplayProps {
  children?: ReactNode; // Add the children prop
}

const InfinityDisplay: React.FC<InfinityDisplayProps> = ({ children }) => {
  return (
    <View style={styles.container}>
      {/* Render the children prop inside the display */}
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: screenWidth,
    height: screenHeight,
    backgroundColor: '#051D5A',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default InfinityDisplay;
