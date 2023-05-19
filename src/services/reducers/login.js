import { setCookie } from "../../utils/cookie"
import { USER_LOGIN, USER_LOGIN_FAILED, USER_LOGIN_SUCCESS } from "../actions/login"

const initialState = {
    userLoginRequest: false,
    userLoginFailed: false,
}

export const userLoginReduser = (state=initialState, action) => {
    switch (action.type) {
        case USER_LOGIN: {
            return {
                ...state,
                userLoginRequest: true,
                userLoginFailed: false
            }
        }
        case USER_LOGIN_SUCCESS: {
            setCookie('token', action.res.accessToken);
            setCookie('refToken', action.res.refreshToken)
            return {
                ...state,
                userLoginRequest: false,
            }
        }
        case USER_LOGIN_FAILED: {
            return {
                ...state,
                userLoginRequest: false,
                userLoginFailed: true
            }
        }
        default: {
            return state
        }
    }
}