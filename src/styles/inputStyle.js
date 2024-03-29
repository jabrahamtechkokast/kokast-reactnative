import { StyleSheet, Dimensions } from "react-native";

const {width, height} = Dimensions.get('window');
const boxWidth = width/5;
const boxHeight = height/4

export const styles = StyleSheet.create({
    box: {
      width: boxWidth * 0.95,
      height: boxHeight *0.8,
      backgroundColor: 'black',
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      //paddingBottom: 16, // Move these lines here
      //paddingRight: 16, // Move these lines here
    },
    image: {
      width: 65.97,
      height: 65,
    },
    selectionButton: {
      top: 5,
      right: 3,
      padding: 3,
      borderRadius: 5,
      position: 'absolute',
    },
    selectionButtonImage: {
      width: 32,
      height: 32,
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'black',
    },
    menuItem: {
      padding: 3,
      marginVertical: 3,
      backgroundColor: 'grey',
      borderRadius: 5,
    },
    selectedMenuItem: {
      backgroundColor: "green",
    },
    nameContainer: {
      marginTop: 15,
      alignItems: "center",
    },
    nameText: {
      fontSize: 16,
      fontWeight: "bold",
      color:'white',
    },
    nameInputContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 10,
    },
    nameInput: {
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 4,
      padding: 8,
      flex: 1,
      marginRight: 10,
      color:'white',
    },
    updateButton: {
      backgroundColor: "grey",
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 4,
    },
    updateButtonText: {
      color: "black",
      fontSize: 16,
      fontWeight: "bold",
    },
    closeButton: {
      position: "absolute",
      top: 10,
      right: 10,
      padding: 10,
    },
    closeButtonText: {
      fontSize: 16,
      fontWeight: "bold",
      color:'white',
    },
  });
