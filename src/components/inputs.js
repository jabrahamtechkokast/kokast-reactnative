// created by Jonathan Abraham on May 14th
// email - jabrahamtech@gmail.com

import React, { Component, useState } from "react";
import { View, Image, TextInput, StyleSheet, TouchableOpacity, Modal, Text, Keyboard } from "react-native";
import { styles } from "../styles/inputStyle";
import { useSelector, useDispatch } from "react-redux";
import { setName, setImage } from "../redux/action";

export const InputItem = ({command}) => {
    const {selectedImage, inputName} = useSelector(state => state.input);
    const dispatch = useDispatch();

    const [inputNameTemp, setInputName] = useState(inputName);

    // const [selectedImage, setSelectedImage] = useState(require('./Assets/initialImage.png'));
    // const [inputName, setInputName] = useState("");
    const telnetCommand = command;
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    // const [displayName, setDisplayName] = useState("");
    const [selectedMenuItem, setSelectedMenuItem] = useState(null);

    // const [isInputFocused, setIsInputFocused] = useState(false);

    // const handleInputFocus = () => {
    //   setIsInputFocused(true);
    // };
  
    // const handleInputBlur = () => {
    //   setIsInputFocused(false);
    // };
  

    const handleImageSelection = (imageSource) =>{
        // setSelectedImage(imageSource);
        dispatch(setImage(imageSource));
    };

    const handleNameUpdate = async () => {
        //setDisplayName(inputNameTemp);
        dispatch(setName(inputNameTemp));
        setIsMenuOpen(false);
      };

    // const handleCloseModal = () => {
    //     // setSelectedMenuItem(null);
    //     setIsMenuOpen(false);
    //   };
    const handleMenuItemSelect = (menuItem) => {
        setSelectedMenuItem(menuItem);
    };
    
    const getMenuItemStyle = (menuItem) => {
    if (menuItem === selectedMenuItem) {
        return [styles.menuItem, styles.selectedMenuItem];
    }
    return styles.menuItem;
    };

    return(
        <View>
            <View style={styles.box}>
                <Image source={selectedImage} style={styles.image}/>
                <TouchableOpacity onPress={() => setIsMenuOpen(true)} style={styles.selectionButton}>
                    <Image source={require('./Assets/selectionButton.png')} style={styles.selectionButtonImage} />
                </TouchableOpacity>
                {inputName !== "" && (
                    <View style={styles.nameContainer}>
                        <Text style={styles.nameText}>{inputName}</Text>
                    </View>
        )}
            </View>
            <Modal visible={isMenuOpen} animationType="slide" supportedOrientations={['landscape']}>
                <View style={styles.modalContainer}>
                    {/* <TouchableOpacity onPress={handleCloseModal} style={styles.closeButton}>
                        <Text style={styles.closeButtonText}>X</Text>
                    </TouchableOpacity> */}
                    <View style={styles.nameInputContainer}>
                        <TextInput
                        style={styles.nameInput}
                        value={inputNameTemp}
                        onChangeText={setInputName}
                        // onFocus={handleInputFocus}
                        // onBlur={handleInputBlur}                
                        placeholder="Enter Name"
                        />
                        <TouchableOpacity onPress={handleNameUpdate} style={styles.updateButton}>
                            <Text style={styles.updateButtonText}>Update</Text>
                        </TouchableOpacity>
                    </View >
                        <TouchableOpacity
                            style={getMenuItemStyle("Apple TV")}
                            onPress={() => {
                            handleImageSelection(require('./Assets/appleTvLogo.png'));
                            handleMenuItemSelect("Apple TV");
                            }}
                        >
                            <Text>Apple TV</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={getMenuItemStyle("Blu Ray Disc Player")}
                            onPress={() => {
                            handleImageSelection(require('./Assets/blurayIcon.png'));
                            handleMenuItemSelect("Blu Ray Disc Player");
                            }}
                        >
                            <Text>Blu Ray Disc Player</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={getMenuItemStyle("PlayStation")}
                            onPress={() => {
                            handleImageSelection(require('./Assets/playstationLogo.png'));
                            handleMenuItemSelect("PlayStation");
                            }}
                        >
                            <Text>PlayStation</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={getMenuItemStyle("PC")}
                            onPress={() => {
                            handleImageSelection(require('./Assets/PC.png'));
                            handleMenuItemSelect("PC");
                            }}
                        >
                            <Text>PC</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={getMenuItemStyle("Xbox")}
                            onPress={() => {
                            handleImageSelection(require('./Assets/xbox.png'));
                            handleMenuItemSelect("Xbox");
                            }}
                        >
                            <Text>Xbox</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={getMenuItemStyle("TV")}
                            onPress={() => {
                            handleImageSelection(require('./Assets/TV.png'));
                            handleMenuItemSelect("TV");
                            }}
                        >
                            <Text>TV</Text>
                        </TouchableOpacity>
                    
                </View>
            </Modal>
        </View>
    )
}


