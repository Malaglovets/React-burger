import { HIDE_INGREDIENT, SHOW_INGREDIENT } from "../actions/ingredientDetails"

const initialState = ({
    visible: false,
    data: []
})

export const ingredientDetailsReduser = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_INGREDIENT: {
            return {
                visible: true,
                data: action.payload.data,
            }
        }
        case HIDE_INGREDIENT: {
            return {
                visible: false,
                data: []
            }
        }
        default: {
            return state
        }
    }
}