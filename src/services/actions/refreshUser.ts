import { config, fetchWithRefresh } from "../../utils/api";
import { AppDispatch, AppThunk } from "../store";
import { TUserInfo } from "../types/data";
import { REFRESH_USER_INFO, REFRESH_USER_INFO_COMPLETE, REFRESH_USER_INFO_FAILED } from "../constants/index"
export interface IRefreshUserInfo {
    readonly type: typeof REFRESH_USER_INFO
}
export interface IRefreshUserInfoComplete {
    readonly type: typeof REFRESH_USER_INFO_COMPLETE
    readonly res: TUserInfo
}
export interface IRefreshUserInfoFailed {
    readonly type: typeof REFRESH_USER_INFO_FAILED
}

export type TRefreshUserActions =
    | IRefreshUserInfo
    | IRefreshUserInfoComplete
    | IRefreshUserInfoFailed

    export const refreshUserInfo: AppThunk = (userName: string, email: string, pass: string, token: string) => {
        return function (dispatch: AppDispatch) {
            dispatch({
                type: REFRESH_USER_INFO
            })
            fetchWithRefresh(`${config.baseUrl}/auth/user`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + `${token}`
                },
                body: JSON.stringify({
                    "email": `${email}`,
                    "password": `${pass}`,
                    "name": `${userName}`
                })
            })
                .then(res => {
                    if (res) {
                        dispatch({
                            type: REFRESH_USER_INFO_COMPLETE,
                            res: res
                        })
                    }
                })
                .catch(err => {
                    alert(err.message)
                    dispatch({
                        type: REFRESH_USER_INFO_FAILED
                    })
                })
        }
    }