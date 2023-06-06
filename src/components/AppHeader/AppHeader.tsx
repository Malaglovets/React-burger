import React from "react";
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components'
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { ListIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './AppHeader.module.css'
import { Link, useLocation } from 'react-router-dom'

export default function AppHeader() {

    const { pathname } = useLocation()
    const constrPage = pathname === "/"
    const profPage = pathname === "/profile"
    const feedPage = pathname === "/feed"

    return (
        <header className={styles.header}>
            <div className={styles.elements}>
                <div className={styles.left}>
                    <Link to="/" className={styles.link}>
                        {constrPage ?
                            <>
                                <BurgerIcon type="primary" />
                                <p className="text text_type_main-default ml-2">
                                    Конструктор
                                </p>
                            </>
                            :
                            <>
                                <BurgerIcon type="secondary" />
                                <p className="text text_type_main-default text_color_inactive  ml-2">
                                    Конструктор
                                </p>
                            </>
                        }

                    </Link>
                    <Link to="/feed" className={styles.link}>
                        {feedPage ?
                            <>
                                <ListIcon type="primary" />
                                <p className="text text_type_main-default ml-2">
                                    Лента заказов
                                </p>
                            </>
                            :
                            <>
                                <ListIcon type="secondary" />
                                <p className="text text_type_main-default text_color_inactive ml-2">
                                    Лента заказов
                                </p>
                            </>
                        }
                    </Link>
                </div>
                <div className={styles.logo}>
                    <Logo />
                </div>
                <Link to="/profile" className={styles.link}>
                    {profPage ?
                        <>
                            <ProfileIcon type="primary" />
                            <p className="text text_type_main-default ml-2">
                                Личный кабинет
                            </p>
                        </>
                        :
                        <>
                            <ProfileIcon type="secondary" />
                            <p className="text text_type_main-default text_color_inactive ml-2">
                                Личный кабинет
                            </p>
                        </>
                    }
                </Link>
            </div>
        </header>
    )
}
