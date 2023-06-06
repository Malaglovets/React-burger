import React, { useRef } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components"
import { BurgerIngredient } from "../BurgerIngredient/BurgerIngredient";
import styles from "./BurgerIngredients.module.css"
import { useInView } from 'react-intersection-observer'
import { useAppSelector } from "../../hooks/hooks";

export default function BurgerIngredients() {

    const { ingredients, ingredientsRequest, ingredientsFailed } = useAppSelector(state => state.ingredients)

    const [current, setCurrent] = React.useState<'one' | 'two' | 'three'>('one')
    const pBunsRef = useRef<HTMLParagraphElement>(null)
    const pSauceRef = useRef<HTMLParagraphElement>(null)
    const pMainRef = useRef<HTMLParagraphElement>(null)

    const { ref: bunsRef, inView: inViewBuns } = useInView();
    const { ref: sauceRef, inView: inViewSauce } = useInView();
    const { ref: mainRef, inView: inViewMain } = useInView();

    function tabSwitch(viewBuns: boolean, viewSauce: boolean, viewMain: boolean) {
        if (viewBuns) {
            return setCurrent('one')
        } if (viewSauce) {
            return setCurrent('two')
        } if (viewMain) {
            return setCurrent('three')
        }
    }

    React.useEffect(() => {
        tabSwitch(inViewBuns, inViewSauce, inViewMain)
    }, [inViewBuns, inViewSauce, inViewMain])

    return (
        <section className={styles.ingrеdients}>
            <p className="text text_type_main-large mb-5">
                Соберите бургер
            </p>
            <div className={styles.tab}>
                 <Tab value="one" active={current === 'one'} onClick={() => pBunsRef.current?.scrollIntoView({ behavior: 'smooth' })}>
                    Булки
                </Tab>
                <Tab value="two" active={current === 'two'} onClick={() => pSauceRef.current?.scrollIntoView({ behavior: 'smooth' })}>
                    Соусы
                </Tab>
                <Tab value="three" active={current === 'three'} onClick={() => pMainRef.current?.scrollIntoView({ behavior: 'smooth' })}>
                    Начинки
                </Tab>
            </div>
            <div className={styles.menu}>
                <p ref={pBunsRef} className="text text_type_main-medium mt-10 mb-6">Булки</p>
                <div ref={bunsRef} className={styles.grid}>
                    {ingredientsRequest && 'Загрузка...'}
                    {ingredientsFailed && 'Произошла ошибка'}
                    {!ingredientsRequest && !ingredientsFailed && ingredients.length && ingredients.map((item) =>
                        item.type === "bun" &&
                            <BurgerIngredient key={item._id} data={item} />
                    )}
                </div>
                <p ref={pSauceRef} className="text text_type_main-medium mt-10 mb-6">Соусы</p>
                <div ref={sauceRef} className={styles.grid}>
                    {ingredientsRequest && 'Загрузка...'}
                    {ingredientsFailed && 'Произошла ошибка'}
                    {!ingredientsRequest && !ingredientsFailed && ingredients.length && ingredients.map((item) =>
                        item.type === "sauce" &&
                        <BurgerIngredient key={item._id} data={item} />)}
                </div>
                <p ref={pMainRef}  className="text text_type_main-medium mt-10 mb-6">Начинки</p>
                <div ref={mainRef} className={styles.grid}>
                    {ingredientsRequest && 'Загрузка...'}
                    {ingredientsFailed && 'Произошла ошибка'}
                    {!ingredientsRequest && !ingredientsFailed && ingredients.length && ingredients.map((item) =>
                        item.type === "main" &&
                        <BurgerIngredient key={item._id} data={item} />)}
                </div>
            </div>
        </section>
    )
}