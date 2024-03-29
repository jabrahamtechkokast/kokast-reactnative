import React, { useContext, useMemo, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import InfinityDisplay from './screen';
import {OutputScreen} from './OutputScreen';
import { GlobalOutputState, OutputData } from '../../store/Types';
import ActivateButton from './Buttons/ActivateButton';
import { OutputGlobalStateContext } from '../../store/OutputContexts';

const { width } = Dimensions.get('window');
const screenWidth = width * 0.88;
const outputWidth = screenWidth * 0.5; // 50% of the screen width

interface ButtonProps {
  text: string;
  command: string;
}

const Button: React.FC<ButtonProps> = ({ text, command }) => {
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

function TvMode() {

  const modeName: keyof GlobalOutputState = useMemo(() => 'TvMode', []);
  const {outputDispatch, globalOutputState} = useContext(OutputGlobalStateContext)!;
  const outputState: OutputData = globalOutputState[modeName];
  const isActiveMode: boolean = outputState.isActive;

  const setActiveMode = () => outputDispatch({
    type: "setActive",
    modeName,
  });

  return (
    <View style={styles.container}>
      <InfinityDisplay>
        <View style={[styles.outputContainer, { width: outputWidth }]}>
          <OutputScreen Outputwidth={outputWidth} modeName={modeName} receptive={isActiveMode}/>
        </View>
      </InfinityDisplay>
      <Text style={styles.title}>TV Mode</Text>
      <View style={styles.buttonsContainer}>
        {/* Use the reusable Button component */}
        <ActivateButton text="Activate" command="SET OUT0 VCPM0\r\n SET IN0 TMDS OFF \r\n " onPress={setActiveMode} isActive={isActiveMode}/>
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
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    marginTop: 5,
    top:20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    top:20,
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

export default TvMode;
