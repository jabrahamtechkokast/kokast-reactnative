import React, { useState } from 'react';
import { StyleSheet, Dimensions, View, Image, Text } from 'react-native';
import { DraxProvider, DraxView, DraxSnapbackTargetPreset } from 'react-native-drax';

const { width, height } = Dimensions.get('window');
const screenHeight = height * 0.29;
const imageSize = 45; // You can adjust the size of the image here

interface OutputScreenProps {
  Outputwidth: number;
}

export function OutputScreen({ Outputwidth }: OutputScreenProps) {

  const [background, setBackground] = useState('rgba(255, 255, 255, 0.1)');
  const [image, setImage] = useState(require('../Assets/touch.png'));
  const [activeOutput, setActiveOutput] = useState(true);

  // This function will be called when an item is dropped onto the OutputScreen
  const handleReceiveDragDrop =  (inputPayload: any) => {
    //console.log(inputPayload.command);
    setBackground('black');
    setImage(inputPayload.image);


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
      receptive = {activeOutput}
      key={background}
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
        backgroundColor: background, // Semi-transparent white
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      draggable= {false}
    >
      {/* Add the image */}
      <Image
        source={image}
        style={{width: imageSize,
          height: imageSize,
          opacity: 0.3,
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: [{ translateX: -imageSize / 2 }, { translateY: -imageSize / 2 }]}} // Adjust opacity as desired
      />
    </DraxView>
  );
};

