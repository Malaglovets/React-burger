import { HIDE_INGRIDIENT, SHOW_INGRIDIENT } from "../actions/ingridientDetails"

const initialState = ({
    visible: false,
    data: []
})

export const ingridientDetailsReduser = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_INGRIDIENT: {
            return {
                visible: true,
                data: action.payload.data,
            }
        }
        case HIDE_INGRIDIENT: {
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