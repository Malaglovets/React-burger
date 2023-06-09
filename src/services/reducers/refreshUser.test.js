import * as types from "../constants"
import { RefreshUserInfoReduser, initialState } from "./refreshUser"

export const refreshUser = {
    success: true,
    user: {
        email: "test@ya.ru",
        name: "Test"
    }
}

describe('refresh user reducer', () => {
    it('should return the initial state', () => {
        expect(RefreshUserInfoReduser(undefined, {})).toEqual(initialState)
    })

    it('start refreshUser request', () => {
        expect(RefreshUserInfoReduser(
            initialState,
            {
                type: types.REFRESH_USER_INFO
            }
        )).toEqual(
            {
                ...initialState,
                userRefreshRequest: true
            }
        )
    })
    it('request refresh user complete', () => {
        expect(RefreshUserInfoReduser(
            {
                ...initialState,
                userRefreshRequest: true
            },
            {
                type: types.REFRESH_USER_INFO_COMPLETE,
                res: refreshUser
            }
        )).toEqual(
            {
                ...initialState,
                userRefresh: refreshUser
            }
        )
    })
    it('request refresh user failed', () => {
        expect(RefreshUserInfoReduser(
            {
                ...initialState,
                userRefreshRequest: true
            },
            {
                type: types.REFRESH_USER_INFO_FAILED,
            }
        )).toEqual(
            {
                ...initialState,
                userRefreshFailed: true,
            }
        )
    })
})