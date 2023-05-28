import React, { FC, ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../../../../hooks/hooks";

type TProtectedRoute = {
    anonymous?: boolean, 
    element: ReactNode
}

export const ProtectedRoute: FC<TProtectedRoute> = ({anonymous, element}) => {

    const authChecked = useAppSelector(state => state.userInfo.authChecked)
    const isLoggedIn = !!useAppSelector(state => state.userInfo.userInfo)
    const location = useLocation()
    const { from } = location.state || {from: {pathname: '/'}}
    
    console.log(authChecked);
    console.log(isLoggedIn);

    if (!authChecked) {
        return <p className="text text_type_main-large mt-10 mb-10">Загрузка...</p>
    }

    if (anonymous && isLoggedIn) {
        return (
            <Navigate to={from.pathname} replace/>
        )
    }

    if (!anonymous && !isLoggedIn) {
        return (
            <Navigate to="/login" state={{ from: location}} />
        )
    }

    return <> {element} </>
}