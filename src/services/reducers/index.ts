import { combineReducers } from "redux";
import { constructorReducer } from "./burgerConstructor";
import { orderDetailsReducer } from "./orderDetails";
import { loginUserReduser } from "./login";
import { userRegisterReduser } from "./register";
import { passwordResetReduser } from "./passwordReset";
import { getTokenReduser } from "./forgotPassword";
import { userInfoReduser } from "./profile";
import { logOutReduser } from "./logout";
import { ingredientsReducer } from "./burgerIngredients";
import { RefreshUserInfoReduser } from "./refreshUser";
import { feedReducer } from "./feed";
import { orderHistoryReducer } from "./orderHistory";



export default combineReducers({
    ingredients: ingredientsReducer,
    elements: constructorReducer,
    orderDetails: orderDetailsReducer,
    loginUser: loginUserReduser,
    userRegister: userRegisterReduser,
    getToken: getTokenReduser,
    passwordReset: passwordResetReduser,
    userInfo: userInfoReduser,
    logOutSucces: logOutReduser,
    refreshUser: RefreshUserInfoReduser,
    feedSocket: feedReducer,
    historySocket: orderHistoryReducer
})