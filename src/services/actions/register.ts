import { config, request } from "../../utils/api";
import { AppDispatch, AppThunk } from "../store";
import { TUserRegLogin } from "../../utils/types";

export interface IUserRegister {
    readonly type: typeof USER_REGISTER
}

export interface IUserRegisterComplete {
    readonly type: typeof USER_REGISTER_COMPLETE
    readonly res: TUserRegLogin
}

export interface IUserRegisterFailed {
    readonly type: typeof USER_REGISTER_FAILED
}

export interface IRegisterCleanState {
    readonly type: typeof REGISTER_CLEAN_STATE
}


export const USER_REGISTER: "USER_REGISTER" = "USER_REGISTER";
export const USER_REGISTER_COMPLETE: "USER_REGISTER_COMPLETE" = "USER_REGISTER_COMPLETE";
export const USER_REGISTER_FAILED: "USER_REGISTER_FAILED" = "USER_REGISTER_FAILED";
export const REGISTER_CLEAN_STATE: "REGISTER_CLEAN_STATE" = "REGISTER_CLEAN_STATE"


export interface IUserRegister {
    readonly type: typeof USER_REGISTER
}

export interface IUserRegisterComplete {
    readonly type: typeof USER_REGISTER_COMPLETE
    readonly res: TUserRegLogin
}

export interface IUserRegisterFailed {
    readonly type: typeof USER_REGISTER_FAILED
}

export interface IRegisterCleanState {
    readonly type: typeof REGISTER_CLEAN_STATE
}

export const userRegister: AppThunk = (userName: string, email: string, pass: string) => {
    return function(dispatch: AppDispatch) {
        dispatch({
            type: USER_REGISTER
        })
        request(`${config.baseUrl}/auth/register`, {
            method: "POST",
            headers: config.headers,
            body: JSON.stringify({
                "email": `${email}`,
                "password": `${pass}`,
                "name": `${userName}`
            })
        })
            .then(res => {
                if (res) {
                    dispatch({
                        type: USER_REGISTER_COMPLETE,
                        res: res
                    })
                }
            })
            .then(() => {
                dispatch({
                    type: REGISTER_CLEAN_STATE
                })
            })
            .catch(err => {
                alert(err.message)
                dispatch({
                    type: USER_REGISTER_FAILED
                })
            })
    }
}