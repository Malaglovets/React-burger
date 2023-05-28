import { Action, ActionCreator, compose, Dispatch } from "redux";
import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './reducers';
import thunk, { ThunkAction } from 'redux-thunk';
import { TBurgerConstructorActions } from "./actions/burgerConstructor";
import { ICleanUserInfo } from "./actions/profile";

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
  enhancers: [compose]
})

export default store
export type IRootState = ReturnType<typeof rootReducer>
export type RootState = ReturnType<typeof store.getState>

type TApplicationActions = | TBurgerConstructorActions | ICleanUserInfo; 
export type AppThunk<TReturn = void> = ActionCreator<
ThunkAction<TReturn, Action, RootState, TApplicationActions>
>
export type AppDispatch = typeof store.dispatch;
