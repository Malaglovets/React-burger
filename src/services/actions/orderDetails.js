import { config } from "../../utils/api";
import checkResponse from "../../utils/api";
import { CLEAN_CONSTRUCTOR } from "./burgerConstructor";

export const SEND_ORDER = "SEND_ORDER";
export const SEND_ORDER_SUCCESS = "SEND_ORDER_SUCCESS";
export const SEND_ORDER_ERROR = "SEND_ORDER_ERROR";
export const HIDE_ORDER = "HIDE_ORDER"

export const sendOrder = (ingridients) => {
  return function (dispatch) {
    dispatch({
      type: SEND_ORDER
    })
    fetch(`${config.baseUrl}/orders`, {
      method: "POST",
      headers: config.headers,
      body: JSON.stringify({
        ingredients: ingridients.map(ingridient => ingridient._id)
      })
    })
      .then(res => checkResponse(res))
      .then(res => {
        if (res) {
          dispatch({
            type: SEND_ORDER_SUCCESS,
            order: res.order,
          })
        } else {
          dispatch({
            type: SEND_ORDER_ERROR
          })
        }
      })
      .then(() => {
        dispatch({
          type: CLEAN_CONSTRUCTOR
        })
      })
      .catch(err => {
        alert(err)
        dispatch({
          type: SEND_ORDER_ERROR
        })
      })
  }
}

export const hideOrder = () => {
  return {
    type: HIDE_ORDER
  }
}