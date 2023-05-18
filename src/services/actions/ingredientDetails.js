export const SHOW_INGREDIENT = "SHOW_INGREDIENT";
export const HIDE_INGREDIENT = "HIDE_INGREDIENT";

export const showIngreidient = (data) => {
    return {
        type: SHOW_INGREDIENT,
        payload: {
            data
        }
    }
}

export const hideIngridient = () => {
    return {
        type: HIDE_INGREDIENT
    }
}