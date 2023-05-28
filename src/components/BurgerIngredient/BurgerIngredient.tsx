import React, { FC } from "react";
import { useSelector } from "react-redux"
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from "./BurgerIngredient.module.css"
import { useDrag } from "react-dnd"
import { Link, useLocation } from 'react-router-dom'
import { TElement } from "../../utils/types";
import { useAppSelector } from "../../hooks/hooks";


export const BurgerIngredient: FC<{ data: TElement }> = ({ data }) => {

    const { draggedElements } = useAppSelector(state => state.elements)
    const location = useLocation();

    const ingredientCounter = React.useMemo(() => {
        let counter = 0
        draggedElements.forEach(element => {
            if (element._id === data._id) {
                counter = counter + 1
            }
        })
        return counter
    }, [draggedElements])

    const [{ isDrag }, dragRef] = useDrag({
        type: "ingredient",
        item: data,
        collect: monitor => ({
            isDrag: monitor.isDragging()
        })
    })

    return (
        !isDrag ?
        <Link
            to={{ pathname: `/ingredients/${data._id}` }}
            state={{ background: location }}
            className={styles.link}>
            <div ref={dragRef} className={styles.item}>
                {ingredientCounter > 0 &&
                    <div className={styles.counter}>
                        <Counter count={ingredientCounter} size="default" extraClass="m-1" />
                    </div>}
                <img src={data.image} alt={data.name} />
                <div className={styles.price}>
                    <p className="text text_type_digits-default mt-1 mb-1 mr-2">{data.price}</p>
                    <CurrencyIcon type="primary" />
                </div>
                <div className={styles.text}>
                    <p className="text text_type_main-default">{data.name}</p>
                </div>
            </div>
        </Link>
                :
                <></>        
    )
}
