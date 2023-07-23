import {StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');
const boxWidth = width;
const boxHeight = height/2.6

export const styles = StyleSheet.create({
    Container: {
      flex: 1,
      backgroundColor: 'black',
      position: 'absolute',
      top:0,
      bottom:0,
      left:0,
      right:0,
      resizeMode:'contain',
    },
    box: {
        width: boxWidth,
        height: boxHeight,
        backgroundColor: 'rgba(128, 128, 128, 0.31)',
        flex:1,
        alignItems: "center",
        justifyContent: 'space-between',
        bottom:0,
        position:'absolute',
        flexDirection: 'row',
    },
    inputContainer:{
      paddingVertical:15,
      left: 15,
      width:'88%',
      top:9,
    },
    buttonContainer: {
    },
    button: {
      height: 45,
      width: 30,
    },
    hiddenButton: {
      //display: 'none',
      // or
      opacity: 0,
    },
    inputtext: {
      color: 'white',
      fontWeight: 'bold',
      position: 'absolute',
      top: 7,
      left:37,
    },
    headerContainer:{
      top: 0,
      position: 'absolute',
      flex:1,
      width: boxWidth,
      height:boxHeight/4,
    },
    modeContainer:{
      position: 'absolute',
      flex: 1,
      width: boxWidth,
      height: boxHeight/2.2,
      top: boxHeight/1.35,
    }
  });