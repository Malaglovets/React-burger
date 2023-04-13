import React from "react";
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components'
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { ListIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './AppHeader.module.css'

export default function AppHeader() {
    return(
        <header className={styles.header}>
            <div className={styles.elements}>
                <div className={styles.left}>
                    <a href="#" className={styles.link}>
                        <BurgerIcon type="primary"/>
                        <p className="text text_type_main-default ml-2">
                            Конструктор
                        </p>
                    </a>
                    <a href="#" className={styles.link}>
                        <ListIcon type="secondary"/>
                        <p className="text text_type_main-default text_color_inactive ml-2">
                            Лента заказов
                        </p>
                    </a>
                </div>
                <div className={styles.logo}>
                    <Logo />
                </div>
                <a href="#" className={styles.link}>
                    <ProfileIcon type="secondary" />
                    <p className="text text_type_main-default text_color_inactive ml-2">
                        Личный кабинет
                    </p>  
                </a>
            </div>
        </header>
    )
}