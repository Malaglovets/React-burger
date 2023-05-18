import { PASSWORD_RESET, PASSWORD_RESET_CLEAN_STATE, PASSWORD_RESET_FAILED, PASSWORD_RESET_SUCCESS } from "../actions/passwordReset"

const initialState = {
    passwordResetRequest: false,
    passwordResetFailed: false,
    res: {}
}

export const passwordResetReduser = (state = initialState, action) => {
    switch (action.type) {
        case PASSWORD_RESET: {
            return {
                ...state,
                passwordResetRequest: true,
                passwordResetFailed: false
            }
        }
        case PASSWORD_RESET_SUCCESS: {
            return {
                ...state,
                passwordResetRequest: false,
                res: action.res
            }
        }
        case PASSWORD_RESET_FAILED: {
            return {
                ...state,
                passwordResetRequest: false,
                passwordResetFailed: true
            }
        }
        case PASSWORD_RESET_CLEAN_STATE: {
            return {
                passwordResetRequest: false,
                passwordResetFailed: false,
                res: {}
            }
        }
        default: {
            return state
        }
    }
}