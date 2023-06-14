import { HIDE_ORDER, SEND_ORDER, SEND_ORDER_ERROR, SEND_ORDER_COMPLETE } from "../constants/index"
import { TOrderOptions } from "../types/data";
import { TOrderDetailsActions } from "../actions/orderDetails";

type TState = {
    orderRequest: boolean,
    orderFailed: boolean,
    popupVisible: boolean,
    order?: TOrderOptions
}

export const initialState = {
    orderRequest: false,
    orderFailed: false,
    popupVisible: false,
    order: undefined
}

export const orderDetailsReducer = (state: TState = initialState, action: TOrderDetailsActions): TState => {
    switch (action.type) {
        case SEND_ORDER: {
            return {
                ...state,
                orderRequest: true,
                orderFailed: false
            }
        }
        case SEND_ORDER_COMPLETE: {
            return {
                ...state,
                orderRequest: false,
                order: action.order.order,
                popupVisible: true,

            }
        }
        case SEND_ORDER_ERROR: {
            return {
                ...state,
                orderFailed: true,
                orderRequest: false
            }
        }
        case HIDE_ORDER: {
            return initialState
        }
        default: {
            return state
        }
    }
}