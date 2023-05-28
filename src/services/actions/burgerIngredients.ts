import { config, request } from "../../utils/api";
import { AppDispatch, AppThunk } from "../store";

export const GET_INGREDIENTS: "GET_INGREDIENTS" = "GET_INGREDIENTS";
export const GET_INGREDIENTS_COMPLETE: "GET_INGREDIENTS_COMPLETE" = "GET_INGREDIENTS_COMPLETE";
export const GET_INGREDIENTS_FAILED: "GET_INGREDIENTS_FAILED" = "GET_INGREDIENTS_FAILED";

export const getIngredients: AppThunk = () => {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: GET_INGREDIENTS
        })
        request(`${config.baseUrl}/ingredients`, {
            method: "GET",
            headers: config.headers
            }
            )
            .then(res => {
                if (res) {
                    dispatch({
                        type: GET_INGREDIENTS_COMPLETE,
                        ingredients: res
                    })
                }
            }).catch(err => {
                alert(err.message)
                dispatch({
                    type: GET_INGREDIENTS_FAILED
                })
            })
    }
}