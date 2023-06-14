import React, { FC, ReactNode } from "react";
import {IngredientDetails} from "../../components/IngredientDetails/IngredientDetails";
import styles from "./ingredients.module.css";


export const IngredientInfo : FC<{children: ReactNode}> = ({children}) => {

    return (
        <div className={styles.ingredient}>
            {children}
        </div>
    )
}