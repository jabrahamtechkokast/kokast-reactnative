export const SET_INPUT_IMAGE = 'SET_INPUT_IMAGE';
export const SET_INPUT_NAME = 'SET_INPUT_NAME';

export const setImage = selectedImage => dispatch => {
    dispatch({
        type: SET_INPUT_IMAGE,
        payload: selectedImage,
    })
}

export const setName = inputName => dispatch => {
    dispatch({
        type: SET_INPUT_NAME,
        payload: inputName,
    })
}