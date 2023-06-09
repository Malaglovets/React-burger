import { constructorReducer, initialState } from "./burgerConstructor";
import * as types from "../constants"

export const bunR2D3 = {
    calories: 643,
    carbohydrates: 85,
    fat: 26,
    image: "https://code.s3.yandex.net/react/code/bun-01.png",
    image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
    image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
    name: "Флюоресцентная булка R2-D3",
    price: 988,
    proteins: 44,
    type: "bun",
    __v: 0,
    _id: "60d3b41abdacab0026a733c7"
}

export const bunN200i = {
    _id: "60d3b41abdacab0026a733c6",
    name: "Краторная булка N-200i",
    type: "bun",
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: "https://code.s3.yandex.net/react/code/bun-02.png",
    image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
    __v: 0
}

export const sauce = {
    _id: "60d3b41abdacab0026a733cd",
    name: "Соус фирменный Space Sauce",
    type: "sauce",
    proteins: 50,
    fat: 22,
    carbohydrates: 11,
    calories: 14,
    price: 80,
    image: "https://code.s3.yandex.net/react/code/sauce-04.png",
    image_mobile: "https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/sauce-04-large.png",
    __v: 0
}

export const main = {
    _id: "60d3b41abdacab0026a733c9",
    name: "Мясо бессмертных моллюсков Protostomia",
    type: "main",
    proteins: 433,
    fat: 244,
    carbohydrates: 33,
    calories: 420,
    price: 1337,
    image: "https://code.s3.yandex.net/react/code/meat-02.png",
    image_mobile: "https://code.s3.yandex.net/react/code/meat-02-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/meat-02-large.png",
    __v: 0
}

describe('constructorReducer', () => {
    it('should return the initial state', () => {
        expect(constructorReducer(undefined, {})).toEqual(initialState)
    })

    it('should handle ADD_INGREDIENT bun', () => {
        expect(constructorReducer(initialState,
            {
                type: types.ADD_INGREDIENT,
                payload: {
                    item: bunR2D3,
                    uid: "928c0cf7-06a9-14e2-fed7-5ae9de559f3c"
                }
            })
        ).toEqual({
            draggedElements: [
                { ...bunR2D3, uid: "928c0cf7-06a9-14e2-fed7-5ae9de559f3c" }
            ],
            bunsPrice: 1976,
            elementsPrice: 0
        })
    })

    it('should handle ADD_INGREDIENT another bun', () => {
        expect(constructorReducer(
            {
                draggedElements: [
                    { ...bunR2D3, uid: "928c0cf7-06a9-14e2-fed7-5ae9de559f3c" }
                ],
                bunsPrice: 1976,
                elementsPrice: 0
            },
            {
                type: types.ADD_INGREDIENT,
                payload: {
                    item: bunN200i,
                    uid: "1d84dfe9-61a2-309b-7425-1c53552b7ab0"
                }
            })
        ).toEqual({
            draggedElements: [
                { ...bunN200i, uid: "1d84dfe9-61a2-309b-7425-1c53552b7ab0" }
            ],
            bunsPrice: 2510,
            elementsPrice: 0
        })
    })

    it('should handle ADD_INGREDIENT not a bun', () => {
        expect(constructorReducer(
            {
                draggedElements: [
                    { ...bunR2D3, uid: "928c0cf7-06a9-14e2-fed7-5ae9de559f3c" }
                ],
                bunsPrice: 1976,
                elementsPrice: 0
            },
            {
                type: types.ADD_INGREDIENT,
                payload: {
                    item: sauce,
                    uid: "513b95b2-21a7-e2cc-dc99-468f496635c3"
                }
            })
        ).toEqual({
            draggedElements: [
                { ...bunR2D3, uid: "928c0cf7-06a9-14e2-fed7-5ae9de559f3c" },
                { ...sauce, uid: "513b95b2-21a7-e2cc-dc99-468f496635c3" }
            ],
            bunsPrice: 1976,
            elementsPrice: 80
        })
    })

    it('should handle DELETE_INGREDIENT', () => {
        expect(constructorReducer(
            {
                draggedElements: [
                    { ...bunR2D3, uid: "928c0cf7-06a9-14e2-fed7-5ae9de559f3c" },
                    { ...sauce, uid: "513b95b2-21a7-e2cc-dc99-468f496635c3" }
                ],
                bunsPrice: 1976,
                elementsPrice: 80
            },
            {
                type: types.DELETE_INGREDIENT,
                payload: {
                    uid: "513b95b2-21a7-e2cc-dc99-468f496635c3",
                    price: 80
                }
            })
        ).toEqual({
            draggedElements: [
                { ...bunR2D3, uid: "928c0cf7-06a9-14e2-fed7-5ae9de559f3c" }
            ],
            bunsPrice: 1976,
            elementsPrice: 0
        })
    })

    it('should handle MOVE_INGREDIENT', () => {
        expect(constructorReducer(
            {
                draggedElements: [
                    { ...bunR2D3, uid: "928c0cf7-06a9-14e2-fed7-5ae9de559f3c" },
                    { ...sauce, uid: "513b95b2-21a7-e2cc-dc99-468f496635c3" },
                    { ...main, uid: "4180955b-de2e-9b6e-ffa0-d715fab4b5c1" }
                ],
                bunsPrice: 1976,
                elementsPrice: 170
            },
            {
                type: types.MOVE_INGREDIENT,
                payload: {
                    dragIndex: 1,
                    hoverIndex: 2
                }
            })
        ).toEqual({
            draggedElements: [
                { ...bunR2D3, uid: "928c0cf7-06a9-14e2-fed7-5ae9de559f3c" },
                { ...main, uid: "4180955b-de2e-9b6e-ffa0-d715fab4b5c1" },
                { ...sauce, uid: "513b95b2-21a7-e2cc-dc99-468f496635c3" }
            ],
            bunsPrice: 1976,
            elementsPrice: 170
        })
    })

    it('should handle CLEAN_CONSTRUCTOR', () => {
        expect(constructorReducer(
            {
                draggedElements: [
                    { ...bunR2D3, uid: "928c0cf7-06a9-14e2-fed7-5ae9de559f3c" },
                    { ...main, uid: "4180955b-de2e-9b6e-ffa0-d715fab4b5c1" },
                    { ...sauce, uid: "513b95b2-21a7-e2cc-dc99-468f496635c3" }
                ],
                bunsPrice: 1976,
                elementsPrice: 170
            },
            {
                type: types.CLEAN_CONSTRUCTOR,
            })
        ).toEqual(initialState)
    })
})