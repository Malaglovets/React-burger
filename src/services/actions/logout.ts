import { config, request } from "../../utils/api";
import { cleanUserInfo } from "./profile";
import { AppDispatch, AppThunk } from "../store";

export const LOG_OUT: "LOG_OUT" = "LOG_OUT";
export const LOG_OUT_COMPLETE: "LOG_OUT_COMPLETE" = "LOG_OUT_COMPLETE";
export const LOG_OUT_FAILED: "LOG_OUT_FAILED" = "LOG_OUT_FAILED";

export interface ILogOut {
    readonly type: typeof LOG_OUT
}

export interface ILogOutComplete {
    readonly type: typeof LOG_OUT_COMPLETE
}

export interface ILogOutFailed {
    readonly type: typeof LOG_OUT_FAILED
}

export type TlogOutActions =
    | ILogOut
    | ILogOutComplete
    | ILogOutFailed


    export const logOut: AppThunk = (token: string) => {
        return function (dispatch: AppDispatch) {
            dispatch({
                type: LOG_OUT
            })
            request(`${config.baseUrl}/auth/logout`, {
                method: "POST",
                headers: config.headers,
                body: JSON.stringify({
                    "token": `${token}`,
                })
            })
                .then(res => {
                    if (res) {
                        dispatch({
                            type: LOG_OUT_COMPLETE,
                        })
                    }
                })
                .then(() => {
                    dispatch(cleanUserInfo())
                })
                .catch(err => {
                    alert(err.message)
                    dispatch({
                        type: LOG_OUT_FAILED,
                    })
                    dispatch(cleanUserInfo())
                })
        }
    }