// created by Jonathan Abraham on May 14th
// email - jabrahamtech@gmail.com

import { styles } from './src/styles/styles';
import { View, Text, Dimensions } from 'react-native';
import { InputItem } from './src/components/inputs';
import { KokastHeader } from './src/components/header.js'
import React, { createContext, useContext, useEffect, useReducer, useState } from 'react';
import InputCarousel from './src/components/inputCarousel';
import CinematicMode from './src/components/Modes/cinematicMode';
import TripleMode from './src/components/Modes/tripleMode';
import ImmersiveMode from './src/components/Modes/immersiveMode';
import TvMode from './src/components/Modes/tvMode';
import OutputCarousel from './src/components/Modes/outputCarousel';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { DraxProvider } from 'react-native-drax';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GetInitialOutputState, GlobalOutputState, outputGlobalStateReducer } from './src/store/Types';
import { OutputGlobalStateContext } from './src/store/OutputContexts';
import SplashScreen from 'react-native-splash-screen';
import Orientation from 'react-native-orientation';

const App = () => {

  Orientation.lockToLandscape();
  const [inputPageNo, setInputPageNo] = useState(0);
  const {width, height} = Dimensions.get('window');
  const [outputPageNo, setoutputPageNo] = useState(0);
  
  const [globalOutputState, outputDispatch] = useReducer(outputGlobalStateReducer, null, GetInitialOutputState)
  //console.log(JSON.stringify(outputGlobalState));


  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 4000);
    
}, []);


  return (
    <SafeAreaView style={{flex: 1}}>
    <OutputGlobalStateContext.Provider value={{globalOutputState, outputDispatch}}>
    
      <GestureHandlerRootView style={{ flex: 1}}>
      {
        <View style={styles.Container}>
          <View style={styles.headerContainer}>
            <KokastHeader />
          </View>
          <DraxProvider>
            <View style={styles.modeContainer}>
              <OutputCarousel pageNo={outputPageNo} setOutputPageNo={setoutputPageNo}>
                <CinematicMode />
                <TripleMode />
                <ImmersiveMode />
                <TvMode />
              </OutputCarousel> 
            </View>
            <View style={styles.box}>
              <Text style={styles.inputtext}>Inputs</Text>
              <InputCarousel pageNo={inputPageNo} setInputPageNo={setInputPageNo}>
                <InputItem storageKey={"input1"} command={"IN1"}/>
                <InputItem storageKey={"input2"} command={'IN2'}/>
                <InputItem storageKey={"input3"} command={'IN3'}/>
                <InputItem storageKey={"input4"} command={'IN4'}/>
                <InputItem storageKey={"input5"} command={'IN5'}/>
                <InputItem storageKey={"input6"} command={'IN6'}/>
                <InputItem storageKey={"input7"} command={'IN7'}/>
                <InputItem storageKey={"input8"} command={'IN8'}/>
              </InputCarousel>
            </View>
          </DraxProvider>
        </View>
      }
      </GestureHandlerRootView>
    
    </OutputGlobalStateContext.Provider>
    </SafeAreaView>
  );
};

export default App;

