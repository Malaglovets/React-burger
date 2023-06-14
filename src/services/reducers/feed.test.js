import * as types from "../constants"
import { feedReducer } from "./feed"

export const wsGetMessage = {
    success: true,
    total: 46814,
    totalToday: 235,
    orders: [
        {
            _id: "642578000905fd001b624d2e",
            ingredients: [
                "60d3b41abdacab0026a733c7",
                "60d3b41abdacab0026a733cd",
                "60d3b41abdacab0026a733cc"
            ],
            status: "done",
            name: "Space spicy флюоресцентный бургер",
            createdAt: "2023-03-30T11:52:32.697Z",
            updatedAt: "2023-03-30T11:52:33.194Z",
            number: 46814
        },
        {
            _id: "6420a9fb0905fd001b623719",
            ingredients: [
                "60d3b41abdacab0026a733c7",
                "60d3b41abdacab0026a733cd",
                "60d3b41abdacab0026a733cc",
                "60d3b41abdacab0026a733d1",
                "60d3b41abdacab0026a733d0",
                "60d3b41abdacab0026a733d4",
                "60d3b41abdacab0026a733d2"
            ],
            status: "done",
            name: "Фалленианский spicy флюоресцентный минеральный астероидный space альфа-сахаридный бургер",
            createdAt: "2023-03-26T20:24:27.176Z",
            updatedAt: "2023-03-26T20:24:27.607Z",
            number: 46162
        },
    ]
}

describe('feed ws', () => {
    it('should return the initial state', () => {
        expect(feedReducer(undefined, {})).toEqual(
            {
                wsConnected: false,
                orderFeed: null,
            }
        )
    })
    it('complete feed ws', () => {
        expect(feedReducer(
            {
                wsConnected: false,
                orderFeed: null,
            },
            {
                type: types.FEED_SUCCESS
            }
        )).toEqual(
            {
                wsConnected: true,
                orderFeed: null,
            }
        )
    })
    it('error feed ws', () => {
        expect(feedReducer(
            {
                wsConnected: true,
                orderFeed: null,
            },
            {
                type: types.FEED_ERROR
            }
        )).toEqual(
            {
                wsConnected: false,
                orderFeed: null,
            }
        )
    })
    it('feed ws get message', () => {
        expect(feedReducer(
            {
                wsConnected: true,
                orderFeed: null,
            },
            {
                type: types.FEED_GET_MESSAGE,
                payload: wsGetMessage
            }
        )).toEqual({
            wsConnected: true,
            orderFeed: wsGetMessage
        })
    })
    it('feed ws close', () => {
        expect(feedReducer(
            {
                wsConnected: true,
                orderFeed: wsGetMessage
            },
            {
                type: types.FEED_CLOSE,
            }
        )).toEqual({
            wsConnected: false,
            orderFeed: wsGetMessage
        })
    })
    it('feed ws closed', () => {
        expect(feedReducer(
            {
                wsConnected: true,
                orderFeed: wsGetMessage
            },
            {
                type: types.FEED_CLOSED,
            }
        )).toEqual({
            wsConnected: false,
            orderFeed:wsGetMessage 
        })
    })
})