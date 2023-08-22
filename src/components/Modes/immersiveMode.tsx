import React, { useContext, useMemo, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import InfinityDisplay from './screen';
import {OutputScreen} from './OutputScreen';
import { GlobalOutputState, OutputData } from '../../store/Types';
import { OutputGlobalStateContext } from '../../store/OutputContexts';
import ActivateButton from './Buttons/ActivateButton';
import ModeSettingsButton from './Buttons/ModeSettingsButton';

const { width, height } = Dimensions.get('window');
const screenWidth = width * 0.88;
const screenHeight = height * 0.33;
const outputWidth = screenWidth * 0.9; // 90% of the screen width

function ImmersiveMode() {

  const modeName: keyof GlobalOutputState = useMemo(() => "ImmersiveMode", []);
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
      <Text style={styles.title}>Immersive Mode</Text>
      <View style={styles.buttonsContainer}>
        {/* Use the reusable Button component */}
        <ModeSettingsButton setting='PC Resolution' command='SET OUT MD3 CDT 1280. 1280. 66\r\n' modeName={modeName}/>
        <ActivateButton text="Activate" command="SET IN0 TMDS ON \r\n SET OUT0 VCPM1 \r\n" onPress={setActiveMode} isActive={isActiveMode}/>
        <ModeSettingsButton setting='Standard' command='SET OUT MD3 CDT 1280. 1280. 45\r\n' modeName={modeName}/>
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
