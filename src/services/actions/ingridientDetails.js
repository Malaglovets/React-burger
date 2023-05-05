export const SHOW_INGRIDIENT = "SHOW_INGRIDIENT";
export const HIDE_INGRIDIENT = "HIDE_INGRIDIENT";

export const showIngeidient = (data) => {
    return {
        type: SHOW_INGRIDIENT,
        payload: {
            data
        }
    }
}

export const hideIngridient = () => {
    return {
        type: HIDE_INGRIDIENT
    }
}