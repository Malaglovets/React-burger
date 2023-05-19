import React from "react";
import { useSelector } from 'react-redux';
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components"
import BurgerIngredient from "../BurgerIngredient/BurgerIngredient";
import styles from "./BurgerIngredients.module.css"
import { useInView } from 'react-intersection-observer'

export default function BurgerIngredients() {

    const { ingredients, ingredientsRequest, ingredientsFailed } = useSelector(state => state.ingredients)

    const [current, setCurrent] = React.useState('one')

    const { ref: bunsRef, inView: inViewBuns } = useInView();
    const { ref: sauceRef, inView: inViewSauce } = useInView();
    const { ref: mainRef, inView: inViewMain } = useInView();

    function tabSwitch(viewBuns, viewSauce, viewMain) {
        if (viewBuns) {
            return setCurrent('one')
        } if (viewSauce) {
            return setCurrent('two')
        } if (viewMain) {
            return setCurrent('three')
        }
    }

    const handleClickScroll = (current) => {
        const element = document.getElementById(`${current}`);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    React.useEffect(() => {
        tabSwitch(inViewBuns, inViewSauce, inViewMain)
    }, [inViewBuns, inViewSauce, inViewMain])

    return (
        <section className={styles.ingrеdients}>
            <p className="text text_type_main-large mb-5">
                Соберите бургер
            </p>
            <div className={styles.tab}>
                <Tab value="one" active={current === 'one'} onClick={() => { handleClickScroll('one') }}>
                    Булки
                </Tab>
                <Tab href="#two" value="two" active={current === 'two'} onClick={() => { handleClickScroll('two') }}>
                    Соусы
                </Tab>
                <Tab href="#three" value="three" active={current === 'three'} onClick={() => { handleClickScroll('three') }}>
                    Начинки
                </Tab>
            </div>
            <div className={styles.menu}>
                <p id='one' className="text text_type_main-medium mt-10 mb-6">Булки</p>
                <div ref={bunsRef} className={styles.grid}>
                    {ingredientsRequest && 'Загрузка...'}
                    {ingredientsFailed && 'Произошла ошибка'}
                    {!ingredientsRequest && !ingredientsFailed && ingredients.length && ingredients.map((item) =>
                        item.type === "bun" &&
                            <BurgerIngredient key={item._id} data={item} />
                    )}
                </div>
                <p id='two' className="text text_type_main-medium mt-10 mb-6">Соусы</p>
                <div ref={sauceRef} className={styles.grid}>
                    {ingredientsRequest && 'Загрузка...'}
                    {ingredientsFailed && 'Произошла ошибка'}
                    {!ingredientsRequest && !ingredientsFailed && ingredients.length && ingredients.map((item) =>
                        item.type === "sauce" &&
                        <BurgerIngredient key={item._id} data={item} />)}
                </div>
                <p id='three' className="text text_type_main-medium mt-10 mb-6">Начинки</p>
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