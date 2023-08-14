import React, { useContext, useMemo, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import InfinityDisplay from './screen';
import {OutputScreen} from './OutputScreen';
import { GlobalOutputState, OutputData } from '../../store/Types';
import { OutputGlobalStateContext } from '../../store/OutputContexts';
import ActivateButton from './Buttons/ActivateButton';

const { width, height } = Dimensions.get('window');
const screenWidth = width * 0.88;
const screenHeight = height * 0.33;
const outputWidth = (screenWidth - 40) / 3; // Three outputs with 10% spacing on each side

function Button(){
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
      <Text style={styles.buttonText}>Activate</Text>
    </TouchableOpacity>
  );
};

function TripleMode(){
  const modeName1: keyof GlobalOutputState = useMemo(() => 'TripleMode1', []);
  const modeName2: keyof GlobalOutputState = useMemo(() => 'TripleMode2', []);
  const modeName3: keyof GlobalOutputState = useMemo(() => 'TripleMode3', []);


  const {outputDispatch, globalOutputState} = useContext(OutputGlobalStateContext)!;
  const outputState1: OutputData = globalOutputState[modeName1];
  const outputState2: OutputData = globalOutputState[modeName2];
  const outputState3: OutputData = globalOutputState[modeName3];
  const isActiveMode: boolean = outputState1.isActive;

  const setActiveMode = () => outputDispatch({
    type: "setActive",
    modeName: modeName1,
  });

  return (
    <View style={styles.container}>
      <InfinityDisplay>
        <View style={styles.outputContainer}>
          <View style={styles.outputWrapper}>
            <OutputScreen Outputwidth={outputWidth} modeName={modeName1} receptive={isActiveMode}/>
          </View>
          <View style={styles.outputWrapper}>
            <OutputScreen Outputwidth={outputWidth} modeName={modeName2} receptive={isActiveMode}/>
          </View>
          <View style={styles.outputWrapper}>
            <OutputScreen Outputwidth={outputWidth} modeName={modeName3} receptive={isActiveMode}/>
          </View>
        </View>
      </InfinityDisplay>
      <Text style={styles.title}>Triple Mode</Text>
      <View style={styles.buttonsContainer}>
        {/* Use the reusable Button component */}
        <ActivateButton text="Activate" command="activate" onPress={setActiveMode} isActive={isActiveMode}/>
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
    flexDirection: 'row', // Display outputs side by side
    justifyContent: 'center',
    alignItems: 'center', // Center outputs vertically
  },
  outputWrapper: {
    width: outputWidth,
    marginHorizontal: 5,
    justifyContent: 'center', // Center outputs vertically
    alignItems: 'center', // Center outputs horizontally
  },
});

export default TripleMode;
