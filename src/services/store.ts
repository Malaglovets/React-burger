import { applyMiddleware, createStore } from "redux";
import rootReducer from './reducers';
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { TBurgerConstructorActions } from "./actions/burgerConstructor";
import { TProfileActions } from "./actions/profile";
import { TGetBurgeIngredientsActions } from "./actions/burgerIngredients";
import { TForgotPasswordActions } from "./actions/forgotPassword";
import { TLoginUserActions } from "./actions/login";
import { TlogOutActions } from "./actions/logout";
import { TOrderDetailsActions } from "./actions/orderDetails";
import { TPasswordResetActions } from "./actions/passwordReset";
import { TRefreshUserActions } from "./actions/refreshUser";
import { socketMiddleware } from "./middleware/socketMiddleware";
import { composeWithDevTools } from "redux-devtools-extension";
import { feedActions, TFeedActions } from "./actions/feed";
import { orderHistoryActions, TOrderHistoryActions } from "./actions/orderHistory";
import { TRegisterActions } from "./actions/register";

const store = createStore(rootReducer, 
  composeWithDevTools(applyMiddleware(thunk, 
      socketMiddleware(feedActions),
      socketMiddleware(orderHistoryActions))))


export default store


export type TApplicationActions = 
| TWsApplicationActions
| TBurgerConstructorActions 
| TGetBurgeIngredientsActions
| TForgotPasswordActions
| TLoginUserActions
| TlogOutActions
| TOrderDetailsActions
| TPasswordResetActions
| TProfileActions
| TRefreshUserActions
| TRegisterActions

export type TWsApplicationActions = 
| TFeedActions
| TOrderHistoryActions

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<RootState, never, TApplicationActions>;
export type AppThunk<TReturn = void> = ThunkAction<TReturn, RootState, unknown, TApplicationActions>
