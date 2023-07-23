import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import InfinityDisplay from './screen';
import OutputScreen from './output';

const { width, height } = Dimensions.get('window');
const screenWidth = width * 0.88;
const screenHeight = height * 0.33;
const outputwidth = screenWidth * 0.7;

interface ButtonProps {
  text: string;
  command: string;
  isActive: boolean;
  isActivateButton: boolean;
  onPress: (command: string) => void;
}

const Button: React.FC<ButtonProps> = ({ text, command, isActive, isActivateButton, onPress }) => {
  const handleButtonPress = () => {
    if (isActive) {
      if (isActivateButton) {
        onPress(command);
      } else {
        onPress('Activate');
        onPress(command);
      }
    }
  };

  return (
    <TouchableOpacity
      style={[styles.button, isActive ? styles.activeButton : null]}
      onPress={handleButtonPress}
      disabled={!isActive && !isActivateButton}
    >
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

export default function CinematicMode() {
  const [activateButtonActive, setActivateButtonActive] = useState<boolean>(false);
  const [activeButton, setActiveButton] = useState<string | null>(null);

  const handleActivateButtonPress = () => {
    setActivateButtonActive(!activateButtonActive);
    setActiveButton(null);
  };

  const handleButtonPress = (command: string) => {
    if (command === 'Activate') {
      handleActivateButtonPress();
    } else if (activateButtonActive) {
      setActiveButton((prevActive) => (prevActive === command ? null : command));
    }
  };

  return (
    <View style={styles.container}>
      <InfinityDisplay>
        <View style={styles.outputContainer}>
          <OutputScreen Outputwidth={outputwidth} />
        </View>
      </InfinityDisplay>
      <Text style={styles.title}>Cinematic Mode</Text>
      <View style={styles.buttonsContainer}>
        <Button
          text="2:1"
          command="2:1"
          isActive={activeButton === '2:1'}
          isActivateButton={activateButtonActive}
          onPress={handleButtonPress}
        />
        <Button
          text="2:4:1"
          command="2:4:1"
          isActive={activeButton === '2:4:1'}
          isActivateButton={activateButtonActive}
          onPress={handleButtonPress}
        />
        <TouchableOpacity
          style={[styles.button, styles.activateButton, activateButtonActive && styles.activeButton]}
          onPress={() => handleButtonPress('Activate')}
          disabled={!activateButtonActive}
        >
          <Text style={styles.buttonText}>Activate</Text>
        </TouchableOpacity>
        <Button
          text="2:76:1"
          command="2:76:1"
          isActive={activeButton === '2:76:1'}
          isActivateButton={activateButtonActive}
          onPress={handleButtonPress}
        />
        <Button
          text="3:6:1"
          command="3:6:1"
          isActive={activeButton === '3:6:1'}
          isActivateButton={activateButtonActive}
          onPress={handleButtonPress}
        />
      </View>
    </View>
  );
}

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
  activateButton: {
    paddingHorizontal: 30, // Wider activate button
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
