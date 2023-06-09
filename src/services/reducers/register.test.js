import * as types from "../constants"
import { loginUser } from "./login.test"
import { initialState, userRegisterReduser } from "./register"

describe('register reducer', () => {
    it('should return the initial state', () => {
        expect(userRegisterReduser(undefined, {})).toEqual(initialState)})

    it('start request register', () => {
        expect(userRegisterReduser(
            initialState,
            {
                type: types.USER_REGISTER
            }
        )).toEqual(
            {
                ...initialState,
                userRegisterRequest: true,
            }
        )
    })
    it('request register complete', () => {
        expect(userRegisterReduser(
            {
                ...initialState,
                userRegisterRequest: true,
            },
            {
                type: types.USER_REGISTER_COMPLETE,
                res: loginUser
            }
        )).toEqual(
            {
                ...initialState,
                res: loginUser
            }
        )
    })
    it('request register failed', () => {
        expect(userRegisterReduser(
            {
                ...initialState,
                userRegisterRequest: true,
            },
            {
                type: types.USER_REGISTER_FAILED,
            }
        )).toEqual(
            {
                ...initialState,
                userRegisterFailed: true,
            }
        )
    })
    it('register clean state', () => {
        expect(userRegisterReduser(
            {
                ...initialState,
                res: loginUser
            },
            {
                type: types.REGISTER_CLEAN_STATE,
            }
        )).toEqual(initialState)})
})