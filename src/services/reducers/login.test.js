import * as types from "../constants"
import { initialState, loginUserReduser } from "./login"

export const loginUser = {
    success: true,
    accessToken: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MDZmNWU5OTM2YjE3MDAxYmU2NTIwYiIsImlhdCI6MTY4MDE3NDc2NCwiZXhwIjoxNjgwMTc1OTY0fQ.TEl6-i-lO5Tavryt7ALzOIZqwvA_twApqvQxfXTuo-Y",
    refreshToken: "5b207b44c8a14db3c94ad8e05276b25b01c8db06a2a4cc4c8c0cd2efc1512b922e41c08b2afe4132",
    user: {
        email: "test@ya.ru",
        name: "Test"
    }
}

describe('login reducer', () => {
    it('should return the initial state', () => {
        expect(loginUserReduser(undefined, {})).toEqual(initialState)
    })

    it('start request login', () => {
        expect(loginUserReduser(
            loginUserReduser,
            {
                type: types.LOGIN_USER
            }
        )).toEqual({
            ... initialState,
            loginUserRequest: true
            })
    })
    it('request login complete', () => {
        expect(loginUserReduser(
            {
                ...initialState,
                loginUserRequest: true
            },
            {
                type: types.LOGIN_USER_COMPLETE,
                res: loginUser
            }
        )).toEqual(initialState)})
    it('request login failed', () => {
        expect(loginUserReduser(
            {
                ...initialState,
                loginUserRequest: true
            },
            {
                type: types.LOGIN_USER_FAILED,
            }
        )).toEqual(
            {
                ...initialState,
                loginUserFailed: true
            }
        )
    })
})