import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import InfinityDisplay from './screen';
import {OutputScreen} from './output';

const { width, height } = Dimensions.get('window');
const screenWidth = width * 0.88;
const screenHeight = height * 0.33;
const outputWidth = screenWidth * 0.9; // 90% of the screen width

interface ButtonProps {
  text: string;
  command: string;
}

function Button({ text, command }: ButtonProps){
  const [isActive, setIsActive] = useState<boolean>(false);

  const handlePress = () => {
    setIsActive((prevIsActive) => !prevIsActive);
    // Perform the fetch command or any other action you want
    // when the button is pressed with the 'command' prop value.
    // For example, you can use 'command' to specify the API endpoint to call.
    // Fetch code or other actions here...
  };

  return (
    <TouchableOpacity
      style={[styles.button, isActive && styles.activeButton]}
      onPress={handlePress}
    >
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

function ImmersiveMode() {
  return (
    <View style={styles.container}>
      <InfinityDisplay>
        <View style={[styles.outputContainer, { width: outputWidth }]}>
          <OutputScreen Outputwidth={outputWidth} />
        </View>
      </InfinityDisplay>
      <Text style={styles.title}>Immersive Mode</Text>
      <View style={styles.buttonsContainer}>
        {/* Use the reusable Button component */}
        <Button text="PC Resolution" command="pc_resolution" />
        <Button text="Activate" command="activate" />
        <Button text="Standard" command="standard" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    marginTop: 5,
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#051D5A', // Replace with your desired button background color
    borderRadius: 8,
    marginHorizontal: 5,
  },
  activeButton: {
    backgroundColor: '#0C4502', // Replace with your desired active button background color
  },
  buttonText: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#fff',
  },
  outputContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ImmersiveMode;
