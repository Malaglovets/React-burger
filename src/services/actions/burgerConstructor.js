import uuid from 'react-uuid'

export const ADD_INGRIDIENT = "ADD_INGRIDIENT"
export const DELETE_INGRIDIENT = "DELETE_INGRIDIENT"
export const MOVE_INGRIDIENT = "MOVE_INGRIDIENT"
export const CLEAN_CONSTRUCTOR = "CLEAN_CONSTRUCTOR"

export const addIngridient = (item) => {
    return {
        type: ADD_INGRIDIENT,
        payload: {
            item,
            uid: uuid()
        }
    }
}

export const deleteIngridient = (uid, price) => {
    return {
        type: DELETE_INGRIDIENT,
        payload: {
            uid,
            price
        }
    }
}

export const moveIngridient = (dragIndex, hoverIndex) => {
    return {
        type: MOVE_INGRIDIENT,
        payload: {
            dragIndex,
            hoverIndex
        }
    }
}