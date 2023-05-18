import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export function ProtectedRoute({anonymous, element}) {

    const authChecked = useSelector(state => state.userInfo.authChecked)
    const isLoggedIn = !!useSelector(state => state.userInfo.userInfo)
    const location = useLocation()
    const { from } = location.state || {from: {pathname: '/'}}

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

    return element
}