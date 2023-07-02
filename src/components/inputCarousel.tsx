import React, { Children } from 'react'
import { Button, ScrollView } from 'react-native'
import { styles } from '../styles/styles'
import { InputItem } from './inputs'


type inputCarouselType = {
  children: React.JSX.Element[],
  pageNo: number,
  setInputPageNo: React.Dispatch<React.SetStateAction<number>>,
}

const numberOfInputElementsPerRender: number = 4;


export default function InputCarousel({ children, pageNo, setInputPageNo }: inputCarouselType) {
  const allInputsAsArray = Children.toArray(children);
  const startIndex = pageNo * numberOfInputElementsPerRender;
  const stopIndex = startIndex + numberOfInputElementsPerRender;
  const renderedInputs = allInputsAsArray.slice(startIndex, stopIndex);

  function getNextPage() {
    setInputPageNo(1);
  }

  function getPrevPage() {
    setInputPageNo(0);
  }

  const isLastPage = pageNo == 1;
  const isFirstPage = pageNo == 0;

  return (
    <>
      <Button title='+' onPress={getNextPage} disabled={isLastPage}></Button>
      <Button title='-' onPress={getPrevPage} disabled={isFirstPage}></Button>
      <ScrollView
        contentContainerStyle={styles.inputContainer}
        horizontal={true}>
        {renderedInputs}
      </ScrollView>
    </>
  )
}
