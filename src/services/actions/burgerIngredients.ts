import { config, request } from "../../utils/api";
import { AppThunk } from "../store";
import { TIngredients } from "../types/data";
import { GET_INGREDIENTS, GET_INGREDIENTS_COMPLETE, GET_INGREDIENTS_FAILED } from "../constants/index"

export interface IGetBurgerIngredients {
    readonly type: typeof GET_INGREDIENTS,
}

export interface IGetBurgerIngredientsComplete {
    readonly type: typeof GET_INGREDIENTS_COMPLETE,
    ingredients: TIngredients
}

export interface IGetBurgerIngredientsFailed {
    readonly type: typeof GET_INGREDIENTS_FAILED,
}

export type TGetBurgeIngredientsActions =
    | IGetBurgerIngredients
    | IGetBurgerIngredientsComplete
    | IGetBurgerIngredientsFailed;

    export const getIngredients = (): AppThunk => (dispatch) => {
        dispatch({
            type: GET_INGREDIENTS
        })
        request<TIngredients>(`${config.baseUrl}/ingredients`, {
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