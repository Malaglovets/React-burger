import uuid from 'react-uuid'
import { TElement } from '../../utils/types'

export const ADD_INGREDIENT: "ADD_INGREDIENT" = "ADD_INGREDIENT"
export const DELETE_INGREDIENT: "DELETE_INGREDIENT" = "DELETE_INGREDIENT"
export const MOVE_INGREDIENT: "MOVE_INGREDIENT" = "MOVE_INGREDIENT"
export const CLEAN_CONSTRUCTOR: "CLEAN_CONSTRUCTOR" = "CLEAN_CONSTRUCTOR"

export interface IAddIngredient {
    readonly type: typeof ADD_INGREDIENT,
    payload: {
        readonly item: TElement,
        readonly uid: string
    }

}

export interface IDeleteIngredient {
    readonly type: typeof DELETE_INGREDIENT,
    payload: {
        readonly uid: string,
        readonly price: number
    }

}

export interface IMoveIngredient {
    readonly type: typeof MOVE_INGREDIENT,
    payload: {
        readonly dragIndex: number,
        readonly hoverIndex: number
    }

}
export interface ICleanConstructor {
    readonly type: typeof CLEAN_CONSTRUCTOR
}

export type TBurgerConstructorActions = | IAddIngredient | IDeleteIngredient | IMoveIngredient | ICleanConstructor;

export const addIngredient = (item: TElement) => {
    return {
        type: ADD_INGREDIENT,
        payload: {
            item,
            uid: uuid()
        }
    }
}

export const deleteIngredient = (uid: string, price: number) => {
    return {
        type: DELETE_INGREDIENT,
        payload: {
            uid,
            price
        }
    }
}

export const moveIngredient = (dragIndex: number, hoverIndex: number) => {
    return {
        type: MOVE_INGREDIENT,
        payload: {
            dragIndex,
            hoverIndex
        }
    }
}

export const cleanConstructor = () => {
    return {
        type: CLEAN_CONSTRUCTOR
    }
}