import { config, fetchWithRefresh } from "../../utils/api";
import { TElement, TOrder } from "../types/data";
import { AppThunk } from "../store";
import { CLEAN_CONSTRUCTOR, SEND_ORDER, SEND_ORDER_COMPLETE, SEND_ORDER_ERROR, HIDE_ORDER } from "../constants/index";
export interface ISendOrder {
  readonly type: typeof SEND_ORDER
}
export interface ISendOrderComplete {
  readonly type: typeof SEND_ORDER_COMPLETE
  order: TOrder
}

export interface ISendOrderError {
  readonly type: typeof SEND_ORDER_ERROR
}

export interface IHideOrder {
  readonly type: typeof HIDE_ORDER
}

export type TOrderDetailsActions =
  | ISendOrder
  | ISendOrderComplete
  | ISendOrderError
  | IHideOrder;

  export const sendOrder = (ingredients: TElement[], token: string): AppThunk => (dispatch) => {
    dispatch({
      type: SEND_ORDER
    })
    fetchWithRefresh<TOrder>(`${config.baseUrl}/orders`, {
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
            type: SEND_ORDER_COMPLETE,
            order: res,
          })
        }
      })
      .then(() => {
        dispatch({
          type: CLEAN_CONSTRUCTOR
        })
      })
      .catch(err => {
        alert(err.message)
        dispatch({
          type: SEND_ORDER_ERROR
        })
      })
  }
  
  export const hideOrder = () => {
    return {
      type: HIDE_ORDER
    }
  }

