import React from "react";
import styles from "./profile.module.css";
import { Link, useLocation } from 'react-router-dom'
import { logOut } from "../../../../services/actions/logout";
import { useDispatch } from "react-redux";
import { getCookie } from "../../../../utils/cookie";

export function ProfilePage({ children }) {
    
    const dispatch = useDispatch()
    const { pathname } = useLocation()
    const editPage = pathname === "/profile"
    const orderHistoryPage = pathname === "/profile/orders"

    return (
        <div className={styles.profile}>
            <div className={styles.profile_links}>
                <Link to='/profile' className={editPage ? styles.profile_link_active : styles.profile_link_inactive}>
                    <p className="text text_type_main-medium">Профиль</p>
                </Link>
                <Link to='/profile/orders' className={orderHistoryPage ? styles.profile_link_active : styles.profile_link_inactive}>
                    <p className="text text_type_main-medium">История заказов</p>
                </Link>
                <Link onClick={() => dispatch(logOut(getCookie('refToken')))} className={styles.profile_link_inactive}>
                    <p className="text text_type_main-medium">Выход</p>
                </Link>
                <p className="text text_type_main-default mt-20 text_color_inactive">
                    В этом разделе вы можете
                    изменить свои персональные данные
                </p>
            </div>
            {children}
        </div>
    )
}