import * as types from "../constants"
import { initialState, passwordResetReduser } from "./passwordReset"

export const passReset = {
    message: "Password reset",
    success: true
}

describe('password reset reducer', () => {
    it('should return the initial state', () => {
        expect(passwordResetReduser(undefined, {})).toEqual(initialState)
    })

    it('start request password reset', () => {
        expect(passwordResetReduser(
            initialState,
            {
                type: types.PASSWORD_RESET
            }
        )).toEqual(
            {
                ...initialState,
                passwordResetRequest: true
            }
        )
    })
    it('request password reset complete', () => {
        expect(passwordResetReduser(
            {
                ...initialState,
                passwordResetRequest: true
            },
            {
                type: types.PASSWORD_RESET_COMPLETE,
                res: passReset
            }
        )).toEqual(
            {
                ...initialState,
                res: passReset
            }
        )
    })
    it('request password reset failed', () => {
        expect(passwordResetReduser(
            {
                ...initialState,
                passwordResetRequest: true
            },
            {
                type: types.PASSWORD_RESET_FAILED,
            }
        )).toEqual(
            {
                ...initialState,
                passwordResetFailed: true,
            }
        )
    })
    it('password clean state', () => {
        expect(passwordResetReduser(
            {
                ...initialState,
                res: passReset
            },
            {
                type: types.PASSWORD_RESET_CLEAN_STATE,
            }
        )).toEqual(initialState)
    })
})