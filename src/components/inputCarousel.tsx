import React, { Children, useState } from 'react';
import { Button, Image, ScrollView, TouchableOpacity } from 'react-native';
import { styles } from '../styles/styles';

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
        style={[styles.buttonContainer, !isBackVisible && styles.hiddenButton]}>
        <Image source={require('./Assets/backArrow.png')} style={styles.button} />
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.inputContainer} horizontal>
        {renderedInputs}
      </ScrollView>
      <TouchableOpacity
        onPress={getNextPage}
        style={[styles.buttonContainer, !isForwardVisible && styles.hiddenButton]}>
        <Image source={require('./Assets/forwardArrow.png')} style={styles.button} />
      </TouchableOpacity>
    </>
  );
}
