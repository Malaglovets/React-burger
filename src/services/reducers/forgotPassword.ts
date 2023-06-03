import { GET_TOKEN, GET_TOKEN_CLEAN_STATE, GET_TOKEN_FAILED, GET_TOKEN_COMPLETE } from "../constants/index"
import { TResetForgotPass } from "../types/data"
import { TForgotPasswordActions } from "../actions/forgotPassword";

type TState = {
    sentPassRequest: boolean,
    sentPassFailed: boolean,
    isMailSent: boolean,
    res?: TResetForgotPass
}

const initialState = {
    sentPassRequest: false,
    sentPassFailed: false,
    isMailSent: false,
    res: undefined
}

export const getTokenReduser = (state: TState = initialState, action: TForgotPasswordActions): TState => {
    switch (action.type) {
        case GET_TOKEN: {
            return {
                ...state,
                sentPassRequest: true,
                sentPassFailed: false
            }
        }
        case GET_TOKEN_COMPLETE: {
            return {
                ...state,
                sentPassRequest: false,
                res: action.res,
                isMailSent: true
            }
        }
        case GET_TOKEN_FAILED: {
            return {
                ...state,
                sentPassRequest: false,
                sentPassFailed: true
            }
        }
        case GET_TOKEN_CLEAN_STATE: {
            return {
                isMailSent: true,
                sentPassRequest: false,
                sentPassFailed: false,
                res: undefined
            }
        }
        default: {
            return state
        }
    }
}