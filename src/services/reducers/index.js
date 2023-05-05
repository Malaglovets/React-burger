import { combineReducers } from "redux";
import { ingridientsReducer } from "./burgerIngridients";
import { constructorReducer } from "./burgerConstructor";
import { ingridientDetailsReduser } from "./ingridientDetails";
import { orderDetailsReducer } from "./orderDetails";


export default combineReducers({
    ingridients: ingridientsReducer,
    elements: constructorReducer,
    ingridientDetails: ingridientDetailsReduser,
    orderDetails: orderDetailsReducer
})