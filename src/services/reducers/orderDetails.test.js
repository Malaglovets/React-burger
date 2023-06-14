import * as types from "../constants"
import { bunR2D3, sauce } from "./burgerConstructor.test"
import { initialState, orderDetailsReducer } from "./orderDetails"

const orderComplete = {
    success: true,
    name: "Space флюоресцентный бургер",
    order: {
        ingredients: [
            bunR2D3,
            sauce,
        ],
        _id: "642573510905fd001b624cf6",
        owner: {
            name: "Test",
            email: "test@ya.ru",
            createdAt: "2023-03-07T08:29:29.966Z",
            updatedAt: "2023-03-20T09:45:19.438Z"
        },
        status: "done",
        name: "Space spicy флюоресцентный антарианский бургер",
        createdAt: "2023-03-30T11:32:33.318Z",
        updatedAt: "2023-03-30T11:32:33.775Z",
        number: 46801,
        price: 1068
    }
}

describe('order details reducer', () => {
    it('should return the initial state', () => {
        expect(orderDetailsReducer(undefined, {})).toEqual(initialState)
    })

    it('start request order details', () => {
        expect(orderDetailsReducer(
            initialState,
            {
                type: types.SEND_ORDER
            }
        )).toEqual({
            ...initialState,
            orderRequest: true
        })
    })

    it('request order details complete', () => {
        expect(orderDetailsReducer(
            {
                ...initialState,
                orderRequest: true
            },
            {
                type: types.SEND_ORDER_COMPLETE,
                order: orderComplete
            }
        )).toEqual({
            ...initialState,
            popupVisible: true,
            order: orderComplete.order
        })
    })

    it('request order details error', () => {
        expect(orderDetailsReducer(
            {
                ...initialState,
                orderRequest: true
            },
            {
                type: types.SEND_ORDER_ERROR,
            }
        )).toEqual(
            {
                ...initialState,
                orderFailed: true,
            }
        )
    })
    it('order details hide order', () => {
        expect(orderDetailsReducer(
            {
                ...initialState,
                popupVisible: true,
                order: orderComplete.order
            },
            {
                type: types.HIDE_ORDER
            }
        )).toEqual(initialState)
    })
})