import { config, request } from "../../utils/api";
import { AppThunk } from "../store";
import { TUserRegLogin } from "../types/data";
import { USER_REGISTER, USER_REGISTER_COMPLETE, USER_REGISTER_FAILED, REGISTER_CLEAN_STATE } from "../constants/index"
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

export type TRegisterActions =
    | IUserRegister
    | IUserRegisterComplete
    | IUserRegisterFailed
    | IRegisterCleanState

export const userRegister = (userName: string, email: string, pass: string): AppThunk => (dispatch) => {
        dispatch({
            type: USER_REGISTER
        })
        request<TUserRegLogin>(`${config.baseUrl}/auth/register`, {
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