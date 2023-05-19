import { config, request } from "../../utils/api";

export const USER_LOGIN = "USER_LOGIN";
export const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";
export const USER_LOGIN_FAILED = "USER_LOGIN_FAILED";

export const userLogin = (email, pass) => {
    return function (dispatch) {
        dispatch({
            type: USER_LOGIN
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
                        type: USER_LOGIN_SUCCESS,
                        res: res
                    })
                }
            })
            .catch(err => {
                alert(err)
                dispatch({
                    type: USER_LOGIN_FAILED
                })
            })
    }
}