import { GET_INGREDIENTS, GET_INGREDIENTS_COMPLETE, GET_INGREDIENTS_FAILED } from "../actions/burgerIngredients";
import { TElement } from "../../utils/types";

type TState = {
    ingredientsRequest: boolean,
    ingredientsFailed: boolean,
    ingredients: TElement[]
}

const initialState = {
    ingredientsRequest: false,
    ingredientsFailed: false,
    ingredients: []
}

export const ingredientsReducer = (state: TState = initialState, action: any): TState => {
    switch (action.type) {
        case GET_INGREDIENTS: {
            return {
                ...state,
                ingredientsRequest: true,
                ingredientsFailed: false
            };
        }
        case GET_INGREDIENTS_COMPLETE: {
            return {
                ...state,
                ingredients: action.ingredients.data,
                ingredientsRequest: false
            };
        }
        case GET_INGREDIENTS_FAILED: {
            return {
                ...state,
                ingredientsFailed: true,
                ingredientsRequest: false
            };
        }
        default: {
            return state
        }
    }
}