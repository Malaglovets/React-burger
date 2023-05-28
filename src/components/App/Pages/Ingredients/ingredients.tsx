import React, { FC } from "react";
import {IngredientDetails} from "../../../IngredientDetails/IngredientDetails";
import styles from "./ingredients.module.css";

export const IngredientInfo: FC = () => {

    return (
        <div className={styles.ingredient}>
            <IngredientDetails />
        </div>
    )
}