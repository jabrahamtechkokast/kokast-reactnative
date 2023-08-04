// created by Jonathan Abraham on May 14th
// email - jabrahamtech@gmail.com

import React, { Component, useState } from "react";
import { View, Image, TextInput, StyleSheet, TouchableOpacity, Modal, Text, Keyboard, Dimensions } from "react-native";
import { styles } from "../styles/inputStyle";
import GenericDataStorage from "../redux/GenericDataStorage";
import InputImageBackgrounds from "./Assets/InputImages";
import type { ImageName } from "./Assets/InputImages";
import { DraxView } from "react-native-drax";

const {width, height} = Dimensions.get('window');

type InputItemProps = {
    storageKey: string
}

type InputData = {
    inputName: string | undefined,
    imageName: ImageName
}

export const InputItem = ({storageKey}: InputItemProps) => {
    const {data, updateData} = GenericDataStorage<InputData>({
        dataKey: storageKey,
        initialData: {
            inputName: "",
            imageName: "Initial Image"
        }
    });

    const inputName = data.inputName;
    const image = InputImageBackgrounds.GetImage(data.imageName);

    const [tempName, setTempName] = useState<string>("");
    const [tempImageName, setTempImageName] = useState<ImageName>("Initial Image");

    
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [selectedMenuItem, setSelectedMenuItem] = useState(null);

    function updateInputData(inputName: string, imageName: ImageName){
        updateData({
            inputName,
            imageName
        });
        setIsMenuOpen(false);
    }

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
                <Image source={image} style={styles.image}/>
                <TouchableOpacity onPress={() => setIsMenuOpen(true)} style={styles.selectionButton}>
                    <Image source={require('./Assets/selectionButton.png')} style={styles.selectionButtonImage} />
                </TouchableOpacity>
                    <View style={styles.nameContainer}>
                        <Text style={styles.nameText}>{inputName}</Text>
                    </View>
            </View>





            <Modal visible={isMenuOpen} animationType="slide" supportedOrientations={['landscape']}>
                <View style={styles.modalContainer}>
                    {/* <TouchableOpacity onPress={handleCloseModal} style={styles.closeButton}>
                        <Text style={styles.closeButtonText}>X</Text>
                    </TouchableOpacity> */}
                    <View style={styles.nameInputContainer}>
                        <TextInput
                        style={styles.nameInput}
                        defaultValue={inputName}
                        onChangeText={(name: string) => setTempName(name)}
                        // onFocus={handleInputFocus}
                        // onBlur={handleInputBlur}                
                        placeholder="Enter Name"
                        />
                        <TouchableOpacity onPress={() => {
                            updateInputData(tempName, tempImageName);
                        }} style={styles.updateButton}>
                            <Text style={styles.updateButtonText}>Update</Text>
                        </TouchableOpacity>
                    </View >
                        <TouchableOpacity
                            style={getMenuItemStyle("Apple TV")}
                            onPress={() => {
                                setTempImageName("Apple TV");
                                handleMenuItemSelect("Apple TV");
                            }}
                        >
                            <Text>Apple TV</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={getMenuItemStyle("Blu Ray Disc Player")}
                            onPress={() => {
                                setTempImageName("Blu-ray");
                                handleMenuItemSelect("Blu Ray Disc Player");
                            }}
                        >
                            <Text>Blu Ray Disc Player</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={getMenuItemStyle("PlayStation")}
                            onPress={() => {
                                setTempImageName("PlayStation");
                                handleMenuItemSelect("PlayStation");
                            }}
                        >
                            <Text>PlayStation</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={getMenuItemStyle("PC")}
                            onPress={() => {
                                setTempImageName("PC");
                                handleMenuItemSelect("PC");
                            }}
                        >
                            <Text>PC</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={getMenuItemStyle("Xbox")}
                            onPress={() => {
                                setTempImageName("Xbox");
                                handleMenuItemSelect("Xbox");
                            }}
                        >
                            <Text>Xbox</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={getMenuItemStyle("TV")}
                            onPress={() => {
                                setTempImageName("TV");
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


