import { config } from "../../utils/api";
import checkResponse from "../../utils/api";

export const GET_INGRIDIENTS = "GET_INGRIDIENTS";
export const GET_INGRIDIENTS_SUCCESS = "GET_INGRIDIENTS_SUCCESS";
export const GET_INGRIDIENTS_FAILED = "GET_INGRIDIENTS_FAILED";

export const getIngridients = () => {
    return function (dispatch) {
        dispatch({
            type: GET_INGRIDIENTS
        })
        fetch(`${config.baseUrl}/ingredients`)
            .then(res => checkResponse(res))
            .then(res => {
                if (res) {
                    dispatch({
                        type: GET_INGRIDIENTS_SUCCESS,
                        ingridients: res.data
                    })
                } else {
                    dispatch({
                        type: GET_INGRIDIENTS_FAILED
                    })
                }
            }).catch(err => {
                alert(err)
                dispatch({
                    type: GET_INGRIDIENTS_FAILED
                })
            })
    }
}