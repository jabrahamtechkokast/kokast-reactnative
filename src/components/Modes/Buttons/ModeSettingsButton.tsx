import { useContext } from "react";
import { CinematicModeSetting, ImmersiveModeSetting, SelectSettingAction, SelectSettingModeNames } from "../../../store/Types";
import { OutputGlobalStateContext } from "../../../store/OutputContexts";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";

export type ModeSettingsButtonProps = {
    setting: CinematicModeSetting | ImmersiveModeSetting,
    command: string,
    modeName: SelectSettingModeNames
  }
  
export default function ModeSettingsButton({setting, command, modeName}: ModeSettingsButtonProps){
    const {outputDispatch, globalOutputState} = useContext(OutputGlobalStateContext)!;

    const outputState = globalOutputState[modeName];
    const isActiveButton = outputState['setting'] === setting;
    const isActiveMode = outputState.isActive;

    const onPress = () => {
        if (!isActiveMode){
        return;
        }

        const dispatchAction: SelectSettingAction = {
        type: "selectSetting",
        modeName,
        setting
        };
        outputDispatch(dispatchAction);

        // TODO: fire some event: e.g. fireCommand(command)
    }

    return (
        <TouchableOpacity
        style={[styles.button, isActiveButton && styles.activeButton]}
        onPress={onPress}
        >
        <Text style={styles.buttonText}>{setting}</Text>
        </TouchableOpacity>
    );
}


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