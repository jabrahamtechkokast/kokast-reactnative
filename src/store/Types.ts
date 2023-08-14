
import { Image, OpaqueColorValue } from "react-native";
import type { ImageName } from "../components/Assets/InputImages";
import { current } from "@reduxjs/toolkit";

export type InputPayload = {
    command : string,
    imageName : ImageName,
}

export type InputData = {
    inputName: string | undefined,
    imageName: ImageName
};

export type OutputData = {
    imageName: ImageName,
    background: string,
    isActive: boolean,
}

export type OutputSetting = {
    setting: string
}

export type GlobalOutputState = {
    CinematicMode: OutputData,
    ImmersiveMode: OutputData,
    TripleMode1: OutputData,
    TripleMode2: OutputData,
    TripleMode3: OutputData,
    TvMode: OutputData
}

type SetImage = {
    type: "setImage",
    imageName: ImageName,
    modeName: keyof GlobalOutputState
}

export type OutputAction = SetImage;

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
    }
}

export function GetInitialOutputState(): GlobalOutputState{
    const opaqueBackground = 'rgba(255, 255, 255, 0.1)';
    return {
        CinematicMode: {
            imageName: "Initial Output Image",
            background: opaqueBackground,
            isActive: false,
        },
        ImmersiveMode: {
            imageName: "Initial Output Image",
            background: opaqueBackground,
            isActive: false,
        },
        TripleMode1: {
            imageName: "Initial Output Image",
            background: opaqueBackground,
            isActive: false,
        },
        TripleMode2: {
            imageName: "Initial Output Image",
            background: opaqueBackground,
            isActive: false,
        },
        TripleMode3: {
            imageName: "Initial Output Image",
            background: opaqueBackground,
            isActive: false,
        },
        TvMode: {
            imageName: "Initial Output Image",
            background: opaqueBackground,
            isActive: false,
        },
    }
}