// created by Jonathan Abraham on May 14th
// email - jabrahamtech@gmail.com

import React, { Component, useState } from "react";
import { View, Image, TextInput, StyleSheet, TouchableOpacity, Modal, Text, Keyboard, Dimensions } from "react-native";
import { styles } from "../styles/inputStyle";
import GenericDataStorage from "../redux/GenericDataStorage";


const {width, height} = Dimensions.get('window');

type InputItemProps = {
    storageKey: string
}

type InputData = {
    inputName: string | undefined,
    imagePath: string | undefined
}

export const InputItem = ({storageKey}: InputItemProps) => {
    const {data, updateData} = GenericDataStorage<InputData>({
        dataKey: storageKey,
        initialData: {
            inputName: "Ya mother",
            imagePath: "It's a PICTURE"
        }
    });

    const inputName = data.inputName;
    const imagePath = data.imagePath;

    const [tempName, setTempName] = useState<string>("");

    
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [selectedMenuItem, setSelectedMenuItem] = useState(null);

    function updateInputData(newString: string, inputKey: keyof InputData){
        updateData({
            ...data,
            [inputKey]: newString
        });
        setIsMenuOpen(flag => !flag);
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
                <Image source={require('./Assets/selectionButton.png')} style={styles.image}/>
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
                        <TouchableOpacity onPress={() => updateInputData(tempName, "inputName")} style={styles.updateButton}>
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


