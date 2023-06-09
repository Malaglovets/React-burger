import { ingredientsReducer, initialState } from "./burgerIngredients"
import * as types from "../constants"
import { bunR2D3, main, sauce } from "./burgerConstructor.test"



describe('ingredientsReducer', () => {
    it('should return the initial state', () => {
        expect(ingredientsReducer(undefined, {})).toEqual(initialState)
    })

    it('start ingredients request', () => {
        expect(ingredientsReducer(initialState,
            {
                type: types.GET_INGREDIENTS
            }
        )).toEqual({
            ...initialState,
            ingredientsRequest: true,
        })
    })

    it('request ingredients complete', () => {
        expect(ingredientsReducer(
            {
                ...initialState,
                ingredientsRequest: true,
            },
            {
                type: types.GET_INGREDIENTS_COMPLETE,
                ingredients: {
                    success: true,
                    data: [
                        bunR2D3,
                        sauce,
                        main
                    ]
                }
            }
        )).toEqual({
            ...initialState,
            ingredients: [
                bunR2D3,
                sauce,
                main
            ]
        })
    })

    it('faild ingredients request', () => {
        expect(ingredientsReducer(
            {
                ...initialState,
                ingredientsRequest: true,
            },
            {
                type: types.GET_INGREDIENTS_FAILED
            }
        )).toEqual({
            ...initialState,
            ingredientsFailed: true,
        })
    })
})