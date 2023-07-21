// created by Jonathan Abraham on May 14th
// email - jabrahamtech@gmail.com

import React, { Component, useState } from "react";
import { View, Image, TextInput, StyleSheet, TouchableOpacity, Modal, Text, Keyboard, Dimensions } from "react-native";
import { styles } from "../styles/inputStyle";
import { useSelector, useDispatch } from "react-redux";
import { setName, setImage } from "../redux/action";
import AsyncStorage from '@react-native-async-storage/async-storage';


const {width, height} = Dimensions.get('window');

type InputItemProps = {
    storageKey: string
}

type InputData = {
    inputName: string | undefined,
    imagePath: string | undefined
} | null | undefined

export const InputItem = ({storageKey}: InputItemProps) => {

    const storeData = async (value: InputData) => {
        try {
          const jsonValue = JSON.stringify(value);
          await AsyncStorage.setItem(storageKey, jsonValue);
        } catch (e) {
          // saving error
        }
      };

      async function getData(): Promise<InputData> {
        try {
          const jsonValue = await AsyncStorage.getItem(storageKey);
          return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
          // error reading value
        }
      };


    const [inputName, setInputName] = useState(async() => (await getData())?.inputName);
    const [imagePath, setImagePath] = useState();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [selectedMenuItem, setSelectedMenuItem] = useState(null);

    // const handleImageSelection = (imageSource) =>{
    //     dispatch(setImage(imageSource));
    // };

    const handleNameUpdate = async (newName: string) => {
        const dataToStore: InputData = {
            inputName: newName,
            imagePath: imagePath
        }

        await storeData(dataToStore);

        // await storeData({...dataToStore, 
        //     [inputName]: inputName
        // });
        setIsMenuOpen(false);
      };

    const handleMenuItemSelect = (menuItem: any) => {
        setSelectedMenuItem(menuItem);
    };
    
    const getMenuItemStyle = (menuItem: any) => {
    if (menuItem === selectedMenuItem) {
        return [styles.menuItem, styles.selectedMenuItem];
    }
    return styles.menuItem;
    };

    

    return(
        <View>
            <View style={styles.box}>
                <Image source={require('./Assets/selectionButton.png')} style={styles.image}/>
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
                        value={inputName}
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


