import * as types from "../constants"
import { wsGetMessage } from "./feed.test"
import { orderHistoryReducer } from "./orderHistory"

describe('feed web socket', () => {
    it('should return the initial state', () => {
        expect(orderHistoryReducer(undefined, {})).toEqual(
            {
                wsConnected: false,
                orderHistory: null,
            }
        )
    })
    it('complete feed ws', () => {
        expect(orderHistoryReducer(
            {
                wsConnected: false,
                orderHistory: null,
            },
            {
                type: types.ORDER_HISTORY_SUCCESS
            }
        )).toEqual(
            {
                wsConnected: true,
                orderHistory: null,
            }
        )
    })
    it('error feed ws', () => {
        expect(orderHistoryReducer(
            {
                wsConnected: true,
                orderHistory: null,
            },
            {
                type: types.ORDER_HISTORY_ERROR
            }
        )).toEqual(
            {
                wsConnected: false,
                orderHistory: null,
            }
        )
    })
    it('feed ws get message', () => {
        expect(orderHistoryReducer(
            {
                wsConnected: true,
                orderHistory: null,
            },
            {
                type: types.ORDER_HISTORY_GET_MESSAGE,
                payload: wsGetMessage
            }
        )).toEqual({
            wsConnected: true,
            orderHistory: wsGetMessage
        })
    })
    it('feed ws close', () => {
        expect(orderHistoryReducer(
            {
                wsConnected: true,
                orderHistory: wsGetMessage
            },
            {
                type: types.ORDER_HISTORY_CLOSE,
            }
        )).toEqual({
            wsConnected: false,
            orderHistory: wsGetMessage
        })
    })
    it('feed ws closed', () => {
        expect(orderHistoryReducer(
            {
                wsConnected: true,
                orderHistory: wsGetMessage
            },
            {
                type: types.ORDER_HISTORY_CLOSED,
            }
        )).toEqual({
            wsConnected: false,
            orderHistory: wsGetMessage 
        })
    })
})