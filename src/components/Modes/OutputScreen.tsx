import React, { useContext, useState } from 'react';
import { StyleSheet, Dimensions, View, Image, Text } from 'react-native';
import { DraxProvider, DraxView, DraxSnapbackTargetPreset } from 'react-native-drax';
import InputImageBackgrounds, { ImageName } from '../Assets/InputImages';
import { OutputGlobalStateContext } from '../../store/OutputContexts';
import { GlobalOutputState, InputPayload, OutputData } from '../../store/Types';

const { width, height } = Dimensions.get('window');
const screenHeight = height * 0.29;
const imageSize = 45; // You can adjust the size of the image here

type OutputScreenProps = {
  Outputwidth: number,
  modeName: keyof GlobalOutputState
}

export function OutputScreen({ Outputwidth, modeName }: OutputScreenProps) {
  const {outputDispatch, globalOutputState} = useContext(OutputGlobalStateContext)!;

  const outputState: OutputData = globalOutputState[modeName]; 
  const background = outputState.background;
  const image = InputImageBackgrounds.GetImage(outputState.imageName);
  const isActive: boolean = outputState.isActive;

  
  // This function will be called when an item is dropped onto the OutputScreen
  function handleReceiveDragDrop(inputPayload: InputPayload){
    //console.log(inputPayload.command);

    outputDispatch({
      type: "setImage",
      imageName: inputPayload.imageName as ImageName,
      modeName,
    });
  }

  return (
    <DraxView
      receptive={ true }
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

