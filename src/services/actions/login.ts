import { config, request } from "../../utils/api";
import { AppThunk } from "../store";
import { TUserRegLogin } from "../types/data";
import { LOGIN_USER, LOGIN_USER_COMPLETE, LOGIN_USER_FAILED } from "../constants";
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

    export const loginUser = (email: string, pass: string): AppThunk => (dispatch) => {
        dispatch({
            type: LOGIN_USER
        })
        request<TUserRegLogin>(`${config.baseUrl}/auth/login`, {
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