import { combineReducers } from "redux";
import { constructorReducer } from "./burgerConstructor";
import { ingredientDetailsReduser } from "./ingredientDetails";
import { orderDetailsReducer } from "./orderDetails";
import { userLoginReduser } from "./login";
import { userRegisterReduser } from "./register";
import { passwordResetReduser } from "./passwordReset";
import { getTokenReduser } from "./forgotPassword";
import { userInfoReduser } from "./profile";
import { logOutReduser } from "./logout";
import { ingredientsReducer } from "./burgerIngridients";


export default combineReducers({
    ingredients: ingredientsReducer,
    elements: constructorReducer,
    ingredientDetails: ingredientDetailsReduser,
    orderDetails: orderDetailsReducer,
    userLogin: userLoginReduser,
    userRegister: userRegisterReduser,
    getToken: getTokenReduser,
    passwordReset: passwordResetReduser,
    userInfo: userInfoReduser,
    logOutSucces: logOutReduser,
})