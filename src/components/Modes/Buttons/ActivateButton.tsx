import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface ActivateButtonProps {
    text: string;
    command: string;
    isActive?: boolean;
    onPress?: () => void
  }
  
 export default function ActivateButton({ text, command, isActive, onPress }: ActivateButtonProps){
    return (
      <TouchableOpacity
        style={[styles.button, isActive && styles.activeButton]}
        onPress={onPress}
      >
        <Text style={styles.buttonText}>{text}</Text>
      </TouchableOpacity>
    );
  };

const styles = StyleSheet.create({
    button: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#051D5A', // Replace with your desired button background color
        borderRadius: 8,
        marginHorizontal: 5,
      },
      activeButton: {
        backgroundColor: '#0C4502', // Replace with your desired active button background color
      },
      buttonText: {
        fontSize: 8,
        fontWeight: 'bold',
        color: '#fff',
      },
});
