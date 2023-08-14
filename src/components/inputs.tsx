// created by Jonathan Abraham on May 14th
// email - jabrahamtech@gmail.com

import React, { useState } from "react";
import { View, Image, TextInput, TouchableOpacity, Modal, Text, Dimensions } from "react-native";
import { styles } from "../styles/inputStyle";
import GenericDataStorage from "../redux/GenericDataStorage";
import InputImageBackgrounds from "./Assets/InputImages";
import type { ImageName } from "./Assets/InputImages";
import { DraxView } from "react-native-drax";


const {width, height} = Dimensions.get('window');

type InputItemProps = {
    storageKey: string
    command: string
}

type InputData = {
    inputName: string | undefined,
    imageName: ImageName
}

export const InputItem = ({storageKey, command}: InputItemProps) => {
    const {data, updateData} = GenericDataStorage<InputData>({
        dataKey: storageKey,
        initialData: {
            inputName: "",
            imageName: "Initial Image"
        }
    });

    const inputName = data.inputName!;
    const image = InputImageBackgrounds.GetImage(data.imageName);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    function updateInputData(inputName: string, imageName: ImageName){
        updateData({
            inputName,
            imageName
        });
        setIsMenuOpen(false);
    }

    const inputPayload = {
        "command" : command,
        "image" : image,
    } 
    return(
        <View>
            <DraxView
                key={storageKey} // Use the index as the key since there's no unique storageKey for each component
                payload={storageKey}
                dragPayload={inputPayload} // Use command as the payload for identification
                draggable
            >
                <View style={styles.box}>
                    <Image source={image} style={styles.image} />

                    <View style={styles.nameContainer}>
                        <Text style={styles.nameText}>{inputName}</Text>
                    </View>
                </View>
            </DraxView>

            <TouchableOpacity style={styles.selectionButton} onPressIn={() => setIsMenuOpen(true)}>
                    <Image source={require('./Assets/selectionButton.png')} style={styles.selectionButtonImage} />
            </TouchableOpacity>
    
        
        {isMenuOpen && 
                <InputSettingsModal
                inputName={inputName}
                imageName={data.imageName}
                updateInputData={updateInputData}
            />
        }
            
        </View>
    )
}

type InputSettingsModalProps = {
    inputName: string,
    imageName: ImageName,
    updateInputData: (inputName: string, imageName: ImageName) => void,
}

function InputSettingsModal({
        inputName,
        imageName,
        updateInputData,
    }: InputSettingsModalProps){
    
    const [tempName, setTempName] = useState<string>(inputName);
    const [tempImageName, setTempImageName] = useState<ImageName>(imageName);

    const handleMenuItemSelect = (menuItem: ImageName) => {
        setTempImageName(menuItem);
    };

    const getMenuItemStyle = (menuItem: ImageName) => {
        if (menuItem === tempImageName) {
            return [styles.menuItem, styles.selectedMenuItem];
        }
        return styles.menuItem;
    };

    return (
        <Modal animationType="slide" supportedOrientations={['landscape']}>
                <View style={styles.modalContainer}>
                    <View style={styles.nameInputContainer}>
                        <TextInput
                        style={styles.nameInput}
                        defaultValue={inputName}
                        onChangeText={(name: string) => setTempName(name)}          
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
                            style={getMenuItemStyle("Blu-ray")}
                            onPress={() => {
                                setTempImageName("Blu-ray");
                                handleMenuItemSelect("Blu-ray");
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
    );
}
