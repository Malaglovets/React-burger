import React, { FC } from "react";
import styles from "./page404.module.css";

export const Page404: FC = () => {

    return (
        <div className={styles.error_404}>
            <p className="text text_type_digits-large">404 Error</p>
            <div className={styles.signature}>
                <p className="text text_type_main-medium">
                    СТАРНИЦА НЕ НАЙДЕНА &#128557;
                </p>
            </div>
        </div>
    )
}