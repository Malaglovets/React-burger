import uuid from 'react-uuid'

export const ADD_INGREDIENT = "ADD_INGREDIENT"
export const DELETE_INGREDIENT = "DELETE_INGREDIENT"
export const MOVE_INGREDIENT = "MOVE_INGREDIENT"
export const CLEAN_CONSTRUCTOR = "CLEAN_CONSTRUCTOR"

export const addIngredient = (item) => {
    return {
        type: ADD_INGREDIENT,
        payload: {
            item,
            uid: uuid()
        }
    }
}

export const deleteIngredient = (uid, price) => {
    return {
        type: DELETE_INGREDIENT,
        payload: {
            uid,
            price
        }
    }
}

export const moveIngredient = (dragIndex, hoverIndex) => {
    return {
        type: MOVE_INGREDIENT,
        payload: {
            dragIndex,
            hoverIndex
        }
    }
}