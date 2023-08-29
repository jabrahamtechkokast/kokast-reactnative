import React, { useState, useContext, useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import InfinityDisplay from './screen';
import {OutputScreen} from './OutputScreen';
import { GlobalOutputState, OutputData } from '../../store/Types';
import { OutputGlobalStateContext } from '../../store/OutputContexts';
import ActivateButton from './Buttons/ActivateButton';
import ModeSettingsButton from './Buttons/ModeSettingsButton';
import sendTelnetCommand from '../telnet';

const { width, height } = Dimensions.get('window');
const screenWidth = width * 0.88;
const screenHeight = height * 0.33;
const outputwidth = screenWidth * 0.7;

function CinematicMode(){
  const modeName: keyof GlobalOutputState = useMemo(() => 'CinematicMode', []);
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
        <View style={styles.outputContainer}>
          <OutputScreen Outputwidth={outputwidth} modeName={modeName} receptive={isActiveMode}/>
        </View>
      </InfinityDisplay>
      <Text style={styles.title}>Cinematic Mode</Text>
      <View style={styles.buttonsContainer}>
        {/* Use the reusable Button component */}
        {/* TODO: Create object that holds all the commands */}
        <ModeSettingsButton setting='2:1' command='SET OUT MD4 CDT 220. 220. 122\r\n SET OUT VTD BEV 117. 117\r\n' modeName={modeName}/>
        <ModeSettingsButton setting='2:4:1' command='SET OUT MD4 CDT 490. 490. 102\r\n SET OUT VTD BEV 280. 280\r\n' modeName={modeName}/>
        <ActivateButton text="Activate" command="SET IN0 TMDS ON \r\n SET OUT0 VCPM2 \r\n" onPress={setActiveMode} isActive={isActiveMode}/>
        <ModeSettingsButton setting='2:76:1' command='SET OUT MD4 CDT 680. 680. 87\r\n SET OUT VTD BEV 360. 360\r\n' modeName={modeName}/>
        <ModeSettingsButton setting='3:6:1' command='SET OUT MD4 CDT 1200. 1200. 50\r\n SET OUT VTD BEV 360. 360\r\n' modeName={modeName}/>
      </View>
    </View>
  );
};

// type ModeSettingsButtonProps = {
//   setting: CinematicModeSetting | ImmersiveModeSetting,
//   command: string,
//   modeName: SelectSettingModeNames
// }

// function ModeSettingsButton({setting, command, modeName}: ModeSettingsButtonProps){
//   const {outputDispatch, globalOutputState} = useContext(OutputGlobalStateContext)!;

//   const outputState = globalOutputState[modeName];
//   const isActiveButton = outputState['setting'] === setting;
//   const isActiveMode = outputState.isActive;

//   const onPress = () => {
//     if (!isActiveMode){
//       return;
//     }

//     const dispatchAction: SelectSettingAction = {
//       type: "selectSetting",
//       modeName,
//       setting
//     };
//     outputDispatch(dispatchAction);

//     // TODO: fire some event: e.g. fireCommand(command)
//   }

//   return (
//     <TouchableOpacity
//     style={[styles.button, isActiveButton && styles.activeButton]}
//     onPress={onPress}
//     >
//       <Text style={styles.buttonText}>{setting}</Text>
//     </TouchableOpacity>
//   );
// }

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

export default CinematicMode;
