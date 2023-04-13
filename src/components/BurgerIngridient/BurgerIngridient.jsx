import React from "react";
import PropTypes from 'prop-types';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from "./BurgerIngridient.module.css"
import ingridientType from "../utils/types";

export default function BurgerIngridient({data, showIngridient}) {
    return (
        <div onClick={() => showIngridient(data)} className={styles.item}>
            {data.__v > 0 &&
            <div className={styles.counter}>
                <Counter count={data.__v} size="default" extraClass="m-1" />
            </div>}
            <img src={data.image} alt={data.name}/>
            <div className={styles.price}>
                <p className="text text_type_digits-default mt-1 mb-1 mr-2">{data.price}</p>
                <CurrencyIcon type="primary" />
            </div>
            <div className={styles.text}>
                <p className="text text_type_main-default">{data.name}</p>
            </div>
        </div>
    )
}

BurgerIngridient.propTypes = {
    data: ingridientType.isRequired,
    showIngridient: PropTypes.func.isRequired
}