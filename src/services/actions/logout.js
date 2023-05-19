import { config, request } from "../../utils/api";
import { CLEAN_USER_INFO } from "./profile";

export const LOG_OUT = "LOG_OUT";
export const LOG_OUT_SUCCESS = "LOG_OUT_SUCCESS";
export const LOG_OUT_FAILED = "LOG_OUT_FAILED";
export const CLEAN_LOG_OUT_INFO = "CLEAN_LOG_OUT_INFO";

export const logOut = (token) => {
    return function (dispatch) {
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
                        type: LOG_OUT_SUCCESS,
                    })
                }
            })
            .then(() => {
                dispatch({
                    type: CLEAN_USER_INFO
                })
            })
            .catch(err => {
                alert(err)
                dispatch({
                    type: LOG_OUT_FAILED,
                    type: CLEAN_USER_INFO
                })
            })
    }
}