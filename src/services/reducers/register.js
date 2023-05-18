import { REGISTER_CLEAN_STATE, USER_REGISTER, USER_REGISTER_FAILED, USER_REGISTER_SUCCESS } from "../actions/register"

const initialState = {
    userRegisterRequest: false,
    userRegisterFailed: false,
    res: {}
}

export const userRegisterReduser = (state = initialState, action) => {
    switch (action.type) {
        case USER_REGISTER: {
            return {
                ...state,
                userRegisterRequest: true,
                userRegisterFailed: false
            }
        }
        case USER_REGISTER_SUCCESS: {
            return {
                ...state,
                userRegisterRequest: false,
                res: action.res
            }
        }
        case USER_REGISTER_FAILED: {
            return {
                ...state,
                userRegisterRequest: false,
                userRegisterFailed: true
            }
        }
        case REGISTER_CLEAN_STATE: {
            return {
                userRegisterRequest: false,
                userRegisterFailed: false,
                res: {}
            }
        }
        default: {
            return state
        }
    }
}