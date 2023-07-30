// created by Jonathan Abraham on May 14th
// email - jabrahamtech@gmail.com

import { fetchData } from './src/telnet';

// import React, {useRef} from 'react';
import { styles } from './src/styles/styles';


import { View, Button, ScrollView, Text, Dimensions } from 'react-native';

import { InputItem } from './src/components/inputs';
import { KokastHeader } from './src/components/header.js'
import { Provider } from 'react-redux';
import { Store } from './src/redux/store';
import React, { useState } from 'react';
import InputCarousel from './src/components/inputCarousel';
import CinematicMode from './src/components/Modes/cinematicMode';
import TripleMode from './src/components/Modes/tripleMode';
import ImmersiveMode from './src/components/Modes/immersiveMode';
import TvMode from './src/components/Modes/tvMode';
import OutputCarousel from './src/components/Modes/outputCarousel';



const App = () => {
  const [inputPageNo, setInputPageNo] = useState(0);
  const {width, height} = Dimensions.get('window');
  const [outputPageNo, setoutputPageNo] = useState(0);
  


  return (
    <Provider store={Store}>
      <View style={styles.Container}>
        <View style={styles.headerContainer}>
          <KokastHeader />
        </View>
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
            <InputItem storageKey={"input1"} />
            <InputItem storageKey={"input2"} />
            <InputItem storageKey={"input3"} />
            <InputItem storageKey={"input4"} />
            <InputItem storageKey={"input5"} />
            <InputItem storageKey={"input6"} />
            <InputItem storageKey={"input7"} />
            <InputItem storageKey={"input8"} />
          </InputCarousel>
        </View>
      </View>
    </Provider>
  );
};

export default App;
