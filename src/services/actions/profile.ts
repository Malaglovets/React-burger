import { config, fetchWithRefresh } from "../../utils/api";
import { AppThunk } from "../store";
import { TUserInfo } from "../types/data";
import { ILoginUserComplete } from "./login";
import { IRefreshUserInfoComplete } from "./refreshUser";
import { IUserRegisterComplete } from "./register";
import { GET_USER_INFO, GET_USER_INFO_COMPLETE, GET_USER_INFO_FAILED, CLEAN_USER_INFO } from "../constants/index"
export interface IGetUserInfo {
    readonly type: typeof GET_USER_INFO
}
export interface IGetUserInfoComplete {
    readonly type: typeof GET_USER_INFO_COMPLETE
    readonly res: TUserInfo
}
export interface IGetUserInfoFailed {
    readonly type: typeof GET_USER_INFO_FAILED
}
export interface ICleanUserInfo {
    readonly type: typeof CLEAN_USER_INFO
}

export type TProfileActions =
    | IGetUserInfo
    | IGetUserInfoComplete
    | IGetUserInfoFailed
    | ICleanUserInfo
    | ILoginUserComplete
    | IRefreshUserInfoComplete
    | IUserRegisterComplete

    export const getUserInfo = (token: string): AppThunk => (dispatch) => {
        dispatch({
            type: GET_USER_INFO
        })
        fetchWithRefresh<TUserInfo>(`${config.baseUrl}/auth/user`, {
            method: "GET",
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + `${token}`
            },
        })
            .then(res => {
                if (res) {
                    dispatch({
                        type: GET_USER_INFO_COMPLETE,
                        res: res
                    })
                }
            })
            .catch((err) => {
                console.log(err.message)
                dispatch({
                    type: GET_USER_INFO_FAILED
                })
            }
            )
    }
    
    export const cleanUserInfo = () => {
        return {
            type: CLEAN_USER_INFO
        }
    }