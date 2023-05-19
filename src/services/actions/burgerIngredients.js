import { config, request } from "../../utils/api";

export const GET_INGREDIENTS = "GET_INGREDIENTS";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED = "GET_INGREDIENTS_FAILED";

export const getIngredients = () => {
    return function (dispatch) {
        dispatch({
            type: GET_INGREDIENTS
        })
        request(`${config.baseUrl}/ingredients`)
            .then(res => {
                if (res) {
                    dispatch({
                        type: GET_INGREDIENTS_SUCCESS,
                        ingredients: res.data
                    })
                }
            }).catch(err => {
                alert(err)
                dispatch({
                    type: GET_INGREDIENTS_FAILED
                })
            })
    }
}