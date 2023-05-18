import { config, fetchWithRefresh } from "../../utils/api";
import checkResponse from "../../utils/api";

export const REFRESH_USER_INFO = "REFRESH_USER_INFO";
export const REFRESH_USER_INFO_SUCCESS = "REFRESH_USER_INFO_SUCCESS";
export const REFRESH_USER_INFO_FAILED = "REFRESH_USER_INFO_FAILED";

export const refreshUserInfo = (userName, email, pass, token) => {
    return function (dispatch) {
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
                        type: REFRESH_USER_INFO_SUCCESS,
                        res: res
                    })
                }
            })
            .catch(err => {
                console.log(err)
                dispatch({
                    type: REFRESH_USER_INFO_FAILED
                })
            })
    }
}