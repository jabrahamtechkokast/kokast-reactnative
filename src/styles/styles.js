import {StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');
const boxWidth = width;
const boxHeight = height/2.6

export const styles = StyleSheet.create({
    Container: {
      flex: 1,
      backgroundColor: 'black',
      top:0,
      bottom:0,
      left:0,
      right:0,
      justifyContent: 'center',
      alignItems:'center',
      flexDirection: 'column',
    },
    box: {
        width: boxWidth,
        maxheight: boxHeight*1.2,
        backgroundColor: 'rgba(128, 128, 128, 0.31)',
        alignItems: "center",
        justifyContent: 'center',
        bottom:0,
        flexDirection: 'row',
        alignSelf: 'flex-end',
    },
    inputContainer:{
      paddingVertical:15,
      display: "flex",
      justifyContent: "space-between",
      left: width * 0.05,
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
      fontSize: 20,
      position: 'absolute',
      top: 7,
      left:37,
    },
    headerContainer:{
      width: boxWidth,
      height:boxHeight/4,
      top:20,
    },
    modeContainer:{
      width: boxWidth,
      height:boxHeight *1.5,
      alignItems: "center",
      justifyContent: 'space-between',
      flexDirection: 'row',
    }
  });