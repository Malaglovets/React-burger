import React, { FC } from "react";
import styles from "./Order.module.css"
import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { ImageIngredient } from "../ImageIngredient/ImageIngredient";
import { TElement, TOrderFeedOptions } from "../../services/types/data";
import { useAppSelector } from "../../hooks/hooks";

export const Order: FC<{ status?: boolean, order: TOrderFeedOptions }> = ({ status, order }) => {

    const orderDate = new Date(order.createdAt)
    const { ingredients, ingredientsRequest } = useAppSelector(state => state.ingredients)
    let totalPrice: number = 0
    let orderIngredients: TElement[] = []

    if (ingredients.length && !ingredientsRequest) {
        order.ingredients.forEach((ingredient) => {
            ingredients.forEach((element) => {
                if (element._id === ingredient) {
                    if (element.type === 'bun') {
                        totalPrice = totalPrice + (element.price * 2)
                        orderIngredients = [...orderIngredients, element]
                    } else {
                        totalPrice = totalPrice + element.price
                        orderIngredients = [...orderIngredients, element]
                    }
                }
            })
        })
    }

    return (
        <div className={styles.order}>
            <div className={styles.top}>
                <p className="text text_type_digits-default mt-6">#{order.number}</p>
                <p className="text text_type_main-default text_color_inactive mt-6">
                    <FormattedDate date={orderDate} />
                </p>
            </div>
            <p className="text text_type_main-medium mt-6">{order.name}</p>
            {status && order.status === "created" &&
                <p className="text text_type_main-default mt-2">
                    Создан
                </p>
            }
            {status && order.status === "pending" &&
                <p className="text text_type_main-default mt-2">
                    Готовится
                </p>
            }
            {status && order.status === 'done' &&
                <div className={styles.done}>
                    <p className="text text_type_main-default mt-2">
                        Выполнен
                    </p>
                </div>
            }
            <div className={styles.info}>
                <div className={styles.compound}>
                    {orderIngredients.map((ingredient, index) => {
                        if (index < 5) {
                            return (
                                <div key={index} className={styles.ingredient} style={{ zIndex: 10 - index }}>
                                    <ImageIngredient ingredient={ingredient} />
                                </div>
                            )
                        }
                    })}
                    {orderIngredients.length == 6 &&
                        <div className={styles.ingredient} style={{ zIndex: 4 }}>
                            <ImageIngredient ingredient={orderIngredients[5]} />
                        </div>
                    }
                    {orderIngredients.length > 6 &&
                        <div className={styles.ingredient} style={{ zIndex: 4 }}>
                            <ImageIngredient ingredient={orderIngredients[5]} extraQuantity={order.ingredients.length - 6} />
                        </div>
                    }
                </div>
                <div className={styles.price}>
                    <p className="text text_type_digits-default mr-2">{totalPrice}</p>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        </div>
    )
}