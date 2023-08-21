
import { Image, OpaqueColorValue } from "react-native";
import type { ImageName } from "../components/Assets/InputImages";
import { current } from "@reduxjs/toolkit";

export type InputPayload = {
    command : string,
    imageName : ImageName,
}

export type InputData = {
    inputName: string | undefined,
    imageName: ImageName,
};

export type hipCodeData = {
    hipCode: string | undefined,
};

export type OutputData = {
    imageName: ImageName,
    background: string,
    isActive: boolean,
    prefixCommand: string,
}

export type OutputSetting = {
    setting: string,
}

export type GlobalOutputState = {
    CinematicMode: OutputData & {setting?: CinematicModeSetting},
    ImmersiveMode: OutputData & {setting?: ImmersiveModeSetting},
    TripleMode1: OutputData,
    TripleMode2: OutputData,
    TripleMode3: OutputData,
    TvMode: OutputData,
}

type SetImageAction = {
    type: "setImage",
    imageName: ImageName,
    modeName: keyof GlobalOutputState,
}

type SetActiveAction = {
    type: "setActive",
    modeName: keyof GlobalOutputState,
}

export type SelectSettingAction = {
    type: "selectSetting",
    modeName: SelectSettingModeNames,
    setting: CinematicModeSetting | ImmersiveModeSetting,
}
export type SelectSettingModeNames = keyof GlobalOutputState & ("CinematicMode" | "ImmersiveMode");

export type CinematicModeSetting = "2:1" | "2:4:1" | "2:76:1" | "3:6:1";

export type ImmersiveModeSetting = "PC Resolution" | "Standard";

export type OutputAction = SetImageAction | SetActiveAction | SelectSettingAction;

export function outputGlobalStateReducer(currentState: GlobalOutputState, action: OutputAction){
    switch (action.type){
        case "setImage":{
            const newOutputData: OutputData = currentState[action.modeName];

            return {
                ...currentState,
                [action.modeName] : {...newOutputData,
                    imageName: action.imageName,
                    background: "black"
                }
            }
        }
        case "setActive": {
            const currentActiveOutput: OutputData = currentState[action.modeName];
            if (currentActiveOutput.isActive){
                return currentState;
            }
            // set all output screens to default state, then set the selected mode to active
            const newState: GlobalOutputState = GetInitialOutputState();
            newState[action.modeName].isActive = true;
            return newState;
        }
        case "selectSetting": {
            const currentOutput = currentState[action.modeName];
            const updatedOutput = { ...currentOutput, setting: action.setting };

            return {
                ...currentState,
                [action.modeName]: { ...updatedOutput }
            }
        }
    }
}

export function GetInitialOutputState(): GlobalOutputState{
    const opaqueBackground = 'rgba(255, 255, 255, 0.1)';
    return {
        CinematicMode: {
            imageName: "Initial Output Image",
            background: opaqueBackground,
            isActive: false,
            prefixCommand:'SET OUT0 VS ',
        },
        ImmersiveMode: {
            imageName: "Initial Output Image",
            background: opaqueBackground,
            isActive: false,
            prefixCommand:'SET OUT0 VS ',
        },
        TripleMode1: {
            imageName: "Initial Output Image",
            background: opaqueBackground,
            isActive: false,
            prefixCommand:'SET OUT1 VS ',
        },
        TripleMode2: {
            imageName: "Initial Output Image",
            background: opaqueBackground,
            isActive: false,
            prefixCommand:'SET OUT2 VS ',
        },
        TripleMode3: {
            imageName: "Initial Output Image",
            background: opaqueBackground,
            isActive: false,
            prefixCommand:'SET OUT3 VS ',
        },
        TvMode: {
            imageName: "Initial Output Image",
            background: opaqueBackground,
            isActive: false,
            prefixCommand:'SET OUT2 VS ',
        },
    }
}
