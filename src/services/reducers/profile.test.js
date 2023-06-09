import * as types from "../constants"
import { loginUser } from "./login.test"
import { initialState, userInfoReduser } from "./profile"
import { refreshUser } from "./refreshUser.test"

describe('profile reducer', () => {
    it('should return the initial state', () => {
        expect(userInfoReduser(undefined, {})).toEqual(initialState)
    })

    it('start profile request', () => {
        expect(userInfoReduser(
            initialState,
            {
                type: types.GET_USER_INFO
            }
        )).toEqual(
            {
                ...initialState,
                userInfoRequest: true,
            }
        )
    })
    it('request profile complete', () => {
        expect(userInfoReduser(
            {
                ...initialState,
                userInfoRequest: true,
            },
            {
                type: types.GET_USER_INFO_COMPLETE,
                res: loginUser
            }
        )).toEqual(
            {
                ...initialState,
                authChecked: true,
                userInfo: loginUser
            }
        )
    })
    it('request profile failed', () => {
        expect(userInfoReduser(
            {
                ...initialState,
                userInfoRequest: true,
            },
            {
                type: types.GET_USER_INFO_FAILED,
            }
        )).toEqual(
            {
                ...initialState,
                authChecked: true,
                userInfoFailed: true,
            }
        )
    })

    it('get profile info by complete login', () => {
        expect(userInfoReduser(
            initialState,
            {
                type: types.LOGIN_USER_COMPLETE,
                res: loginUser
            }
        )).toEqual(
            {
                ...initialState,
                authChecked: true,
                userInfo: loginUser
            }
        )
    })
    it('get profile info by complete register', () => {
        expect(userInfoReduser(
            initialState,
            {
                type: types.USER_REGISTER_COMPLETE,
                res: loginUser
            }
        )).toEqual(
            {
                ...initialState,
                authChecked: true,
                userInfo: loginUser
            }
        )
    })
    it('get profile info by complete refresh user info', () => {
        expect(userInfoReduser(
            initialState,
            {
                type: types.REFRESH_USER_INFO_COMPLETE,
                res: refreshUser
            }
        )).toEqual(
            {
                ...initialState,
                authChecked: true,
                userInfo: refreshUser
            }
        )
    })
})