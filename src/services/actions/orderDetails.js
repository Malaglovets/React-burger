import { config, request } from "../../utils/api";
import { CLEAN_CONSTRUCTOR } from "./burgerConstructor";

export const SEND_ORDER = "SEND_ORDER";
export const SEND_ORDER_SUCCESS = "SEND_ORDER_SUCCESS";
export const SEND_ORDER_ERROR = "SEND_ORDER_ERROR";
export const HIDE_ORDER = "HIDE_ORDER"

export const sendOrder = (ingredients, token) => {
  return function (dispatch) {
    dispatch({
      type: SEND_ORDER
    })
    request(`${config.baseUrl}/orders`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + `${token}`
      },
      body: JSON.stringify({
        ingredients: ingredients.map(ingredient => ingredient._id)
      })
    })
      .then(res => {
        if (res) {
          dispatch({
            type: SEND_ORDER_SUCCESS,
            order: res.order,
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