import React from "react";
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import styles from "./IngredientDetails.module.css";

export default function IngredientDetails() {

    const { ingredients } = useSelector(state => state.ingredients)
    let data = null
    const { ingredientId } = useParams()
    ingredients.forEach(element => {
        if (element._id === ingredientId) {
            data = element
        }
    })

    return (
        data === null ?
            <p className="text text_type_main-large mt-10 mb-10">
                Загрузка...
            </p>
            :
            <>
                <img className={styles.image} src={data.image_large} alt={data.name} />
                <p className="text text_type_main-medium mt-4 mb-8">{data.name}</p>
                <ul className={styles.nutrition}>
                    <li className={styles.nutrition_item}>
                        <p className="text text_type_main-default text_color_inactive mb-2">Калории,ккал</p>
                        <p className="text text_type_digits-default text_color_inactive">{data.calories}</p>
                    </li>
                    <li className={styles.nutrition_item}>
                        <p className="text text_type_main-default text_color_inactive mb-2">Белки, г</p>
                        <p className="text text_type_digits-default text_color_inactive">{data.proteins}</p>
                    </li>
                    <li className={styles.nutrition_item}>
                        <p className="text text_type_main-default text_color_inactive mb-2">Жиры, г</p>
                        <p className="text text_type_digits-default text_color_inactive">{data.fat}</p>
                    </li>
                    <li className={styles.nutrition_item}>
                        <p className="text text_type_main-default text_color_inactive mb-2">Углеводы, г</p>
                        <p className="text text_type_digits-default text_color_inactive">{data.carbohydrates}</p>
                    </li>
                </ul>
            </>
    )
}