import {SET_INPUT_IMAGE, SET_INPUT_NAME} from './action';


const initialState = {
    selectedimage: '../components/Assets/initialImage.png',
    inputName: "",
}

function inputReducer(state =   initialState, action){
    switch(action.type){
        case SET_INPUT_IMAGE:
            return{...state, selectedImage: action.payload};
        case SET_INPUT_NAME:
            return{...state, inputName: action.payload};
        default:
            return state;
    }
}

export default inputReducer;