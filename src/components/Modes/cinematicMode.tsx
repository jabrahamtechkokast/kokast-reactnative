import React, { useState, useContext, useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import InfinityDisplay from './screen';
import {OutputScreen} from './OutputScreen';
import { GlobalOutputState, OutputData } from '../../store/Types';
import { OutputGlobalStateContext } from '../../store/OutputContexts';
import { ImageName } from '../Assets/InputImages';
import ActivateButton from './Buttons/ActivateButton';

const { width, height } = Dimensions.get('window');
const screenWidth = width * 0.88;
const screenHeight = height * 0.33;
const outputwidth = screenWidth * 0.7;

interface ActivateButtonProps {
  text: string;
  command: string;
  isActive?: boolean;
  onPress?: () => void
}

function Button({ text, command, isActive, onPress }: ActivateButtonProps){


  return (
    <TouchableOpacity
      style={[styles.button, isActive && styles.activeButton]}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

function CinematicMode(){
  const modeName: keyof GlobalOutputState = useMemo(() => 'CinematicMode', []);
  const {outputDispatch, globalOutputState} = useContext(OutputGlobalStateContext)!;

  const outputState: OutputData = globalOutputState[modeName];
  const isActiveMode: boolean = outputState.isActive;

  const setActiveMode = () => outputDispatch({
    type: "setActive",
    modeName,
  });

  console.log(globalOutputState);

  return (
    <View style={styles.container}>
      <InfinityDisplay>
        <View style={styles.outputContainer}>
          <OutputScreen Outputwidth={outputwidth} modeName={modeName}/>
        </View>
      </InfinityDisplay>
      <Text style={styles.title}>Cinematic Mode</Text>
      <View style={styles.buttonsContainer}>
        {/* Use the reusable Button component */}
        <Button text="2:1" command="2:1" />
        <Button text="2:4:1" command="2:4:1" />
        <ActivateButton text="Activate" command="activate" onPress={setActiveMode} isActive={isActiveMode}/>
        <Button text="2:76:1" command="2:76:1" />
        <Button text="3:6:1" command="3:6:1" />
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

export default CinematicMode;
