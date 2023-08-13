import React from 'react';
import { StyleSheet, Dimensions, View, Image, Text } from 'react-native';
import { DraxProvider, DraxView, DraxSnapbackTargetPreset } from 'react-native-drax';

const { width, height } = Dimensions.get('window');
const screenHeight = height * 0.29;
const imageSize = 25; // You can adjust the size of the image here

interface Props {
  Outputwidth: number;
}

export const OutputScreen: React.FC<Props> = ({ Outputwidth }) => {

  // This function will be called when an item is dropped onto the OutputScreen
  const handleReceiveDragDrop =  (command: any) => {
    console.log(command);

    // Assuming the IP and endpoint are something like this:
    // const IP_ADDRESS = 'http://192.168.1.1';
    // const ENDPOINT = '/execute-command';

    // try {
    //     const response = await fetch(`${IP_ADDRESS}${ENDPOINT}`, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({ command }),
    //     });

    //     const data = await response.json();
    //     console.log(data);  // Handle the response as needed

    // } catch (error) {
    //     console.error('Error sending command:', error);
    // }
};

  return (
    <DraxView
      receivingStyle={
        { borderColor: 'blue', borderWidth: 2 }
      }
      onReceiveDragDrop={({ dragged }) => {
        // Handle the received payload here
        if(dragged && dragged.payload){
          handleReceiveDragDrop(dragged.payload);
          return DraxSnapbackTargetPreset.None;
        }
      }}
      style={{
        width: Outputwidth,
        height: screenHeight,
        backgroundColor: 'rgba(255, 255, 255, 0.1)', // Semi-transparent white
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      draggable= {false}
    >
      {/* Add the image */}
      <Image
        source={require('../Assets/touch.png')}
        style={{ width: imageSize, height: imageSize, opacity: 0.3 }} // Adjust opacity as desired
      />
    </DraxView>
  );
};

