import { setCookie } from "../../utils/cookie"
import { LOGIN_USER, LOGIN_USER_COMPLETE, LOGIN_USER_FAILED } from "../constants/index"
import { TLoginUserActions } from "../actions/login";

type TState = {
    loginUserRequest: boolean,
    loginUserFailed: boolean,
}

const initialState = {
    loginUserRequest: false,
    loginUserFailed: false,
}

export const loginUserReduser = (state: TState = initialState, action: TLoginUserActions): TState => {
    switch (action.type) {
        case LOGIN_USER: {
            return {
                ...state,
                loginUserRequest: true,
                loginUserFailed: false
            }
        }
        case LOGIN_USER_COMPLETE: {
            setCookie('token', action.res.accessToken);
            setCookie('refToken', action.res.refreshToken)
            return {
                ...state,
                loginUserRequest: false,
            }
        }
        case LOGIN_USER_FAILED: {
            return {
                ...state,
                loginUserRequest: false,
                loginUserFailed: true
            }
        }
        default: {
            return state
        }
    }
}