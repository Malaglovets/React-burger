import { TUserInfo } from "../../utils/types"
import { LOGIN_USER_COMPLETE } from "../actions/login"
import { CLEAN_USER_INFO, GET_USER_INFO, GET_USER_INFO_FAILED, GET_USER_INFO_COMPLETE } from "../actions/profile"
import { REFRESH_USER_INFO_COMPLETE } from "../actions/refreshUser"
import { USER_REGISTER_COMPLETE } from "../actions/register"
import { TProfileActions } from "../actions/profile";

type TState = {
    userInfoRequest: boolean,
    authChecked: boolean,
    userInfoFailed: boolean,
    userInfo?: TUserInfo
}

const initialState = {
    userInfoRequest: false,
    authChecked: false,
    userInfoFailed: false,
    userInfo: undefined
}

export const userInfoReduser = (state: TState = initialState, action: TProfileActions): TState => {
    switch (action.type) {
        case GET_USER_INFO: {
            return {
                ...state,
                userInfoRequest: true,
                userInfoFailed: false
            }
        }
        case GET_USER_INFO_COMPLETE: {
            return {
                ...state,
                userInfoRequest: false,
                authChecked: true,
                userInfo: action.res,
            }
        }
        case LOGIN_USER_COMPLETE: {
            return {
                ...state,
                authChecked: true,
                userInfo: action.res
            }
        }
        case USER_REGISTER_COMPLETE: {
            return {
                ...state,
                authChecked: true,
                userInfo: action.res
            }
        }
        case REFRESH_USER_INFO_COMPLETE: {
            return {
                ...state,
                userInfo: action.res
            }
        }
        case GET_USER_INFO_FAILED: {
            return {
                ...state,
                userInfoRequest: false,
                authChecked: true,
                userInfoFailed: true,
            }
        }
        case CLEAN_USER_INFO: {
            return {
                userInfoRequest: false,
                authChecked: true,
                userInfoFailed: false,
                userInfo: undefined
            }
        }
        default: {
            return state
        }
    }
}
