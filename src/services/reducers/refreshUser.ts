import { REFRESH_USER_INFO, REFRESH_USER_INFO_FAILED, REFRESH_USER_INFO_COMPLETE } from "../constants/index"
import { TRefreshUserActions } from "../actions/refreshUser";
import { TUserInfo } from "../types/data";


type TState = {
    userRefreshRequest: boolean,
    userRefreshFailed: boolean,
    userRefresh?: TUserInfo
}

export const initialState = {
    userRefreshRequest: false,
    userRefreshFailed: false,
    userRefresh: undefined
}

export const RefreshUserInfoReduser = (state: TState = initialState, action: TRefreshUserActions ): TState => {
    switch (action.type) {
        case REFRESH_USER_INFO: {
            return {
                ...state,
                userRefreshRequest: true,
                userRefreshFailed: false
            }
        }
        case REFRESH_USER_INFO_COMPLETE: {
            return {
                ...state,
                userRefreshRequest: false,
                userRefresh: action.res
            }
        }
        case REFRESH_USER_INFO_FAILED: {
            return {
                ...state,
                userRefreshRequest: false,
                userRefreshFailed: true
            }
        }
        default: {
            return state
        }
    }
}