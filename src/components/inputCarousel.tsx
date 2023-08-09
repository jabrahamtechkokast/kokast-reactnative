import React, { Children, useState } from 'react';
import { Button, Image, ScrollView, Text, TouchableOpacity } from 'react-native';
import { styles } from '../styles/styles';
import { DraxProvider, DraxView } from 'react-native-drax';

type inputCarouselType = {
  children: React.JSX.Element[];
  pageNo: number;
  setInputPageNo: React.Dispatch<React.SetStateAction<number>>;
};

const numberOfInputElementsPerRender: number = 4;

export default function InputCarousel({
  children,
  pageNo,
  setInputPageNo,
}: inputCarouselType) {
  const allInputsAsArray = Children.toArray(children);
  const startIndex = pageNo * numberOfInputElementsPerRender;
  const stopIndex = startIndex + numberOfInputElementsPerRender;
  const renderedInputs = allInputsAsArray.slice(startIndex, stopIndex);

  function getNextPage() {
    setInputPageNo(1);
    setBackVisible(true);
    setForwardVisible(false);
  }

  function getPrevPage() {
    setInputPageNo(0);
    setBackVisible(false);
    setForwardVisible(true);
  }

  const [isForwardVisible, setForwardVisible] = useState(true);
  const [isBackVisible, setBackVisible] = useState(false);

  return (
    <>
      <TouchableOpacity
        onPress={getPrevPage}
        style={[styles.buttonContainer, !isBackVisible && styles.hiddenButton]}
      >
        <Image source={require('./Assets/backArrow.png')} style={styles.button} />
      </TouchableOpacity>
        <ScrollView contentContainerStyle={styles.inputContainer} horizontal>
          {renderedInputs.map((item, index) => {
            // Check if the item is a React element before accessing its props
            if (React.isValidElement(item)) {
              return (
                // Wrap each item with DraxView to make them draggable
                <DraxView
                  key={item.props.storageKey} // Use the index as the key since there's no unique storageKey for each component
                  payload={item.props.storageKey}
                  dragPayload={item.props.command} // Use command as the payload for identification
                  draggable
                >
                  {item}
                </DraxView>
              );
            }
            return null;
          })}
        </ScrollView>
      <TouchableOpacity
        onPress={getNextPage}
        style={[styles.buttonContainer, !isForwardVisible && styles.hiddenButton]}
      >
        <Image source={require('./Assets/forwardArrow.png')} style={styles.button} />
      </TouchableOpacity>
    </>
  );
}
