import React, { Children, useState } from 'react';
import { Image, ScrollView, TouchableOpacity, StyleSheet, View } from 'react-native';

type OutputCarouselType = {
  children: React.ReactNode[];
  pageNo: number;
  setOutputPageNo: React.Dispatch<React.SetStateAction<number>>;
};

const numberOfOutputElementsPerRender: number = 1;

export default function OutputCarousel({
  children,
  pageNo,
  setOutputPageNo,
}: OutputCarouselType) {
  const allOutputsAsArray = Children.toArray(children);
  const startIndex = pageNo * numberOfOutputElementsPerRender;
  const stopIndex = startIndex + numberOfOutputElementsPerRender;
  const renderedOutputs = allOutputsAsArray.slice(startIndex, stopIndex);

  const totalCarouselPages = Math.ceil(allOutputsAsArray.length / numberOfOutputElementsPerRender);

  function getNextPage() {
    setOutputPageNo((prevPageNo) => Math.min(prevPageNo + 1, totalCarouselPages - 1));
  }

  function getPrevPage() {
    setOutputPageNo((prevPageNo) => Math.max(prevPageNo - 1, 0));
  }

  const isForwardVisible = pageNo < totalCarouselPages - 1;
  const isBackVisible = pageNo > 0;

  return (
    <>
      <TouchableOpacity
        onPress={getPrevPage}
        style={[styles.buttonContainer, !isBackVisible && styles.hiddenButton]}>
        <Image source={require('../Assets/backArrow.png')} style={styles.button} />
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.outputContainer} horizontal>
        {renderedOutputs}
      </ScrollView>
      <TouchableOpacity
        onPress={getNextPage}
        style={[styles.buttonContainer, !isForwardVisible && styles.hiddenButton]}>
        <Image source={require('../Assets/forwardArrow.png')} style={styles.button} />
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
    minHeight: '100%',
  },
  buttonContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  hiddenButton: {
    opacity: 0,
  },
  button: {
    width: 20,
    height: 20,
    tintColor: '#fff', // Replace with your desired button color
  },
  outputContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5, // Add padding to separate from buttons
    flexGrow:1,
  },
});
