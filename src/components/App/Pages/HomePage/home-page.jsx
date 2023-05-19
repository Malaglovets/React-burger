import React from "react";
import BurgerIngredients from "../../../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../../../BurgerConstructor/BurgerConstructor";
import styles from "./home-page.module.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export function HomePage() {
    return (
        <main className={styles.main}>
            <DndProvider backend={HTML5Backend}>
                <BurgerIngredients />
                <BurgerConstructor />
            </DndProvider>
        </main>
    )
}