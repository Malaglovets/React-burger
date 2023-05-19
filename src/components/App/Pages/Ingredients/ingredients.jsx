import React from "react";
import IngredientDetails from "../../../IngredientDetails/IngredientDetails";
import styles from "./ingredients.module.css";

export function IngredientPage() {

    return (
        <div className={styles.ingredient}>
            <IngredientDetails />
        </div>
    )
}