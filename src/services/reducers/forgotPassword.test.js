import * as types from "../constants"
import { initialState, getTokenReduser } from "./forgotPassword"

export const forgotPassRequest = {
    message: "Reset email",
    success: true
}

describe('forgot password reducer', () => {
    it('should return the initial state', () => {
        expect(getTokenReduser(undefined, {})).toEqual(initialState)
    })

    it('start request forgot password', () => {
        expect(getTokenReduser(initialState,
            {
                type: types.GET_TOKEN
            }
        )).toEqual({
            ...initialState,
            sentPassRequest: true,
        })
    })
    it('request forgot password complete', () => {
        expect(getTokenReduser(
            {
                ...initialState,
                sentPassRequest: true,
            },
            {
                type: types.GET_TOKEN_COMPLETE,
                res: forgotPassRequest
            }
        )).toEqual({
            ...initialState,
            res: forgotPassRequest,
            isMailSent: true
        })
    })
    it('request forgot password false', () => {
        expect(getTokenReduser(
            {
                ...initialState,
                sentPassRequest: true,
            },
            {
                type: types.GET_TOKEN_FAILED,
            }
        )).toEqual({
            ...initialState,
            sentPassFailed: true,
        })
    })
})