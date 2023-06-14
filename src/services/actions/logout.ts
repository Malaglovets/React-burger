import { config, request } from "../../utils/api";
import { cleanUserInfo } from "./profile";
import { AppThunk } from "../store";
import { LOG_OUT, LOG_OUT_COMPLETE, LOG_OUT_FAILED, CLEAN_USER_INFO } from "../constants";
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

    export const logOut = (token: string): AppThunk => (dispatch) => {
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
                dispatch({
                    type: CLEAN_USER_INFO
                })
            })
            .catch(err => {
                alert(err.message)
                dispatch({
                    type: LOG_OUT_FAILED,
                })
                dispatch({
                    type: CLEAN_USER_INFO
                })
            })
    }
