import { REFRESH_USER_INFO, REFRESH_USER_INFO_FAILED, REFRESH_USER_INFO_SUCCESS } from "../actions/refresh-user"

const initialState = {
    userRefreshRequest: false,
    userRefreshFailed: false,
}

export const RefreshUserInfoReduser = (state = initialState, action) => {
    switch (action.type) {
        case REFRESH_USER_INFO: {
            return {
                ...state,
                userRefreshRequest: true,
                userRefreshFailed: false
            }
        }
        case REFRESH_USER_INFO_SUCCESS: {
            return {
                ...state,
                userRefreshRequest: false,
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