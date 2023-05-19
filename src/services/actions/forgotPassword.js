import { config, request } from "../../utils/api";

export const GET_TOKEN = "GET_TOKEN_CODE";
export const GET_TOKEN_SUCCESS = "GET_TOKEN_SUCCESS";
export const GET_TOKEN_FAILED = "GET_TOKEN_FAILED";
export const GET_TOKEN_CLEAN_STATE = "GET_TOKEN_CLEAN_STATE"

export const getToken = (email) => {
    return function (dispatch) {
        dispatch({
            type: GET_TOKEN
        })
        request(`${config.baseUrl}/password-reset`, {
            method: "POST",
            headers: config.headers,
            body: JSON.stringify({
                "email": `${email}`,
            })
        })
            .then(res => {
                if (res) {
                    dispatch({
                        type: GET_TOKEN_SUCCESS,
                        res: res
                    })
                }
            })
            .then(() => {
                dispatch({
                    type: GET_TOKEN_CLEAN_STATE
                })
            })
            .catch(err => {
                alert(err)
                dispatch({
                    type: GET_TOKEN_FAILED
                })
            })
    }
}