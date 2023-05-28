import { config, request } from "../../utils/api";
import { AppDispatch, AppThunk } from "../store";
import { TUserRegLogin } from "../../utils/types";

export const LOGIN_USER: "LOGIN_USER" = "LOGIN_USER";
export const LOGIN_USER_COMPLETE: "LOGIN_USER_COMPLETE" = "LOGIN_USER_COMPLETE";
export const LOGIN_USER_FAILED: "LOGIN_USER_FAILED" = "LOGIN_USER_FAILED";

export interface ILoginUser {
    readonly type: typeof LOGIN_USER
}

export interface ILoginUserComplete {
    readonly type: typeof LOGIN_USER_COMPLETE
    readonly res: TUserRegLogin
}

export interface ILoginUserFailed {
    readonly type: typeof LOGIN_USER_FAILED
}

export type TLoginUserActions =
    | ILoginUser
    | ILoginUserComplete
    | ILoginUserFailed

export const loginUser: AppThunk = (email: string, pass: string) => {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: LOGIN_USER
        })
        request(`${config.baseUrl}/auth/login`, {
            method: "POST",
            headers: config.headers,
            body: JSON.stringify({
                "email": `${email}`,
                "password": `${pass}`
            })
        })
            .then(res => {
                if (res) {
                    dispatch({
                        type: LOGIN_USER_COMPLETE,
                        res: res
                    })
                }
            })
            .catch(err => {
                alert(err.message)
                dispatch({
                    type: LOGIN_USER_FAILED
                })
            })
    }
}