import { GET_INGRIDIENTS, GET_INGRIDIENTS_SUCCESS, GET_INGRIDIENTS_FAILED } from "../actions/burgerIngridients";

const initialState = {
    ingridientsRequest: false,
    ingridientsFailed: false,
    ingridients: []
}

export const ingridientsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_INGRIDIENTS: {
            return {
                ...state,
                ingridientsRequest: true,
                ingridientsFailed: false
            };
        }
        case GET_INGRIDIENTS_SUCCESS: {
            return {
                ...state,
                ingridients: action.ingridients,
                ingridientsRequest: false
            };
        }
        case GET_INGRIDIENTS_FAILED: {
            return {
                ...state,
                ingridientsFailed: true,
                ingridientsRequest: false
            };
        }
        default: {
            return state
        }
    }
}