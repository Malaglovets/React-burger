import React, { FC } from "react";
import { useAppSelector } from "../../hooks/hooks";
import { TElement } from "../../services/types/data";
import styles from './ImageIngredient.module.css';

export const ImageIngredient: FC<{ extraQuantity?: number, ingredient: TElement }> = ({ extraQuantity, ingredient }) => {
    
    return (
        <div className={styles.border}>
            <img src={ingredient.image} alt={ingredient.name} className={styles.image} />
            {extraQuantity && extraQuantity !== 0 &&
                <div className={styles.extra}>
                    <p className="text text_type_main-small">+{extraQuantity}</p>
                </div>
            }
        </div>
    )
}