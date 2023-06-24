import {StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');
const boxWidth = width;
const boxHeight = height/2.6

export const styles = StyleSheet.create({
    carouselContent: {
      alignItems: 'flex-start',
      paddingBottom: 16,
      flexGrow:0,
    },
    align:{
      alignItems:'center',
      justifyContent:'center',
    },
    row: {
      flexDirection: 'row',
    },

  });