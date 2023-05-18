import { config, fetchWithRefresh } from "../../utils/api";

export const GET_USER_INFO = "GET_USER_INFO";
export const GET_USER_INFO_SUCCESS = "GET_USER_INFO_SUCCESS";
export const GET_USER_INFO_DELETE = "GET_USER_INFO_DELETE";
export const CLEAN_USER_INFO = "CLEAN_USER_INFO";

export const getUserInfo = (token) => {
    return function (dispatch) {
        dispatch({
            type: GET_USER_INFO
        })
        fetchWithRefresh(`${config.baseUrl}/auth/user`, {
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
                        type: GET_USER_INFO_SUCCESS,
                        res: res
                    })
                }
            })
            .catch((err) => {
                console.log(err)
                dispatch({
                    type: GET_USER_INFO_DELETE
                })
            }
            )
    }
}

export const cleanUserInfo = () => {
    return {
        type: CLEAN_USER_INFO
    }
}