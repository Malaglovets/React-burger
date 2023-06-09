import * as types from "../constants"
import { logOutReduser, initialState } from "./logout"

describe('logout reducer', () => {
    it('should return the initial state', () => {
        expect(logOutReduser(undefined, {})).toEqual(initialState)
    })

    it('start request logout', () => {
        expect(logOutReduser(
            initialState,
            {
                type: types.LOG_OUT
            }
        )).toEqual({
            ...initialState,
            logOutRequest: true
        })
    })

    it('request logout complete', () => {
        expect(logOutReduser(
            {
                ...initialState,
                logOutRequest: true
            },
            {
                type: types.LOG_OUT_COMPLETE,
            }
        )).toEqual(initialState)})

    it('request logout failed', () => {
        expect(logOutReduser(
            {
                ...initialState,
                logOutRequest: true
            },
            {
                type: types.LOG_OUT_FAILED,
            }
        )).toEqual(
            {
                ...initialState,
                logOutFailed: true
            }
        )
    })
})