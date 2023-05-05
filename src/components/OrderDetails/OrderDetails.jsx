import React from "react";
import { useSelector } from "react-redux";
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from "./OrderDetails.module.css"
import imgDone  from "../../images/done.svg";

export default function OrderDetails() {
    const { number } = useSelector(state => state.orderDetails.order)
    return(
        <>
            <p className="text text_type_digits-large mt-30">{number}</p>
            <p className="text text_type_main-medium mt-8">идентификатор заказа</p>
            <img src={imgDone} alt="Иконка состояния готовности" className={styles.done} />
            <p className="text text_type_main-default mt-15">Ваш заказ начали готовить</p>
            <p className="text text_type_main-default text_color_inactive mt-2 mb-30">Дождитесь готовности на орбитальной станции</p>
        </>
    )
}

