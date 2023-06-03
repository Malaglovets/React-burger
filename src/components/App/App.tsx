import React, { FC } from 'react';
import { Routes, Route, useLocation, useNavigate } from "react-router-dom"
import {
  Home, Login, Register, ForgotPassword,
  ResetPassword, Profile, IngredientInfo
} from '../../Pages';
import { ProtectedRoute } from '../../Pages/ProtectedRoute/protected-route';
import AppHeader from '../AppHeader/AppHeader';
import { useAppDispatch } from '../../hooks/hooks';
import { getUserInfo } from '../../services/actions/profile';
import { getCookie } from '../../utils/cookie';
import ProfileEdit from '../ProfileEdit/ProfileEdit';
import { Modal } from '../Modal/Modal';
import { getIngredients } from '../../services/actions/burgerIngredients';
import { IngredientDetails } from '../IngredientDetails/IngredientDetails';
import styles from "./App.module.css";
import { Page404 } from '../../Pages/Page404/page404';
import { Feed } from '../../Pages/Feed/feed';
import { OrderInfo } from '../OrderInfo/OrderInfo';
import { OrdersHistory } from '../OrdersHistory/OrdersHistory';


export const App: FC = () => {

  const dispatch = useAppDispatch()
  const location = useLocation()
  const background = location.state && location.state.background;
  const navigate = useNavigate()
  const handleClose = () => {
    navigate(-1)
  }
  React.useEffect(() => {
    dispatch(getIngredients())
    dispatch(getUserInfo(getCookie('token')))
  }, [])
  console.log(getUserInfo);
  return (
    <>
      <AppHeader />
      <main className={styles.main}>
      <Routes location={background || location}>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<ProtectedRoute anonymous element={<Login />} />} />
        <Route path='/register' element={<ProtectedRoute anonymous element={<Register />} />} />
        <Route path='/forgot-password' element={<ProtectedRoute anonymous element={<ForgotPassword />} />} />
        <Route path='/reset-password' element={<ProtectedRoute anonymous element={<ResetPassword />} />} />
        <Route path='/profile' element={<ProtectedRoute element={<Profile><ProfileEdit /></Profile>} />} />
        <Route path='/profile/orders' element={<ProtectedRoute element={<Profile><OrdersHistory/></Profile>} />} />
        <Route path='/profile/orders/:orderId' element={<IngredientInfo><OrderInfo/></IngredientInfo>} />
        <Route path='/ingredients/:ingredientId' element={<IngredientInfo><IngredientDetails/></IngredientInfo>} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/feed/:feedId' element={<IngredientInfo><OrderInfo/></IngredientInfo>}/>
        <Route path='*' element={<Page404 />}/>
      </Routes>
      {background && (
        <Routes location={location}>
          <Route path='/ingredients/:ingredientId' element={
            <Modal handleClose={handleClose} headName={'Детали ингридиента'}>
              <IngredientDetails />
            </Modal>}
          />
          <Route path='/profile/orders/:orderId' element={
            <Modal handleClose={handleClose}>
              console.log(OrderInfo);
              <OrderInfo />
            </Modal>
          }/>
          <Route path='/feed/:feedId' element={<ProtectedRoute element={<Modal handleClose={handleClose}><OrderInfo /></Modal>
}/>}/> 
        </Routes>
      )}
      </main>
    </>
  );
}

