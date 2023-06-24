// created by Jonathan Abraham on May 14th
// email - jabrahamtech@gmail.com

import {fetchData} from './src/telnet';

// import React, {useRef} from 'react';
import {styles} from './src/styles/styles';

import {View, Button, ScrollView, Text} from 'react-native';

import {InputItem} from './src/components/inputs';
import {KokastHeader} from './src/components/header.js'
import {Provider} from 'react-redux';
import {Store} from './src/redux/store';
import React from 'react';

const HelpBT = () => {
  const dataToSend = 'H\r\n';

  const sendDataToTelnet = () => {
    fetchData(dataToSend);
  };
  return (
    <View>
      <Button title="Send Request" onPress={sendDataToTelnet} />
    </View>
  );
};

const App = () => {
  return (
    <Provider store={Store}>
      <View style={styles.Container}>
        <View style={styles.headerContainer}>
          <KokastHeader />
        </View>
        <View style={styles.box}>
          <Text style={styles.inputtext}>Inputs</Text>
          <ScrollView
            contentContainerStyle={styles.inputContainer}
            horizontal={true}>
            <InputItem command={undefined} />
            <InputItem command={undefined} />
            <InputItem command={undefined} />
            <InputItem command={undefined} />
            <InputItem command={undefined} />
            <InputItem command={undefined} />
            <InputItem command={undefined} />
            <InputItem command={undefined} />
            <InputItem command={undefined} />
          </ScrollView>
        </View>
      </View>
    </Provider>
  );
};

export default App;
