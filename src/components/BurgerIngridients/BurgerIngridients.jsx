import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components"
import BurgerIngridient from "../BurgerIngridient/BurgerIngridient";
import styles from "./BurgerIngridients.module.css"
import IngridientDetails from "../IngridientDetails/IngridientDetails";
import Modal from "../Modal/Modal";
import { getIngridients } from "../../services/actions/burgerIngridients";
import { useInView } from 'react-intersection-observer'
import { hideIngridient } from "../../services/actions/ingridientDetails";

export default function BurgerIngridients() {

    const { ingridients, ingridientsRequest, ingridientsFailed } = useSelector(state => state.ingridients)
    const { visible } = useSelector(state => state.ingridientDetails)
    const dispatch = useDispatch()

    React.useEffect(() => {
        dispatch(getIngridients())
    }, [])

    function handleClosePopup() {
        dispatch(hideIngridient())
    }

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
        <section className={styles.ingridients}>
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
                    {ingridientsRequest && 'Загрузка...'}
                    {ingridientsFailed && 'Произошла ошибка'}
                    {!ingridientsRequest && !ingridientsFailed && ingridients.length && ingridients.map((item) =>
                        item.type === "bun" &&
                        <BurgerIngridient key={item._id} data={item} />)}
                </div>
                <p id='two' className="text text_type_main-medium mt-10 mb-6">Соусы</p>
                <div ref={sauceRef} className={styles.grid}>
                    {ingridientsRequest && 'Загрузка...'}
                    {ingridientsFailed && 'Произошла ошибка'}
                    {!ingridientsRequest && !ingridientsFailed && ingridients.length && ingridients.map((item) =>
                        item.type === "sauce" &&
                        <BurgerIngridient key={item._id} data={item} />)}
                </div>
                <p id='three' className="text text_type_main-medium mt-10 mb-6">Начинки</p>
                <div ref={mainRef} className={styles.grid}>
                    {ingridientsRequest && 'Загрузка...'}
                    {ingridientsFailed && 'Произошла ошибка'}
                    {!ingridientsRequest && !ingridientsFailed && ingridients.length && ingridients.map((item) =>
                        item.type === "main" &&
                        <BurgerIngridient key={item._id} data={item} />)}
                </div>
            </div>
            {visible && <Modal handleClose={handleClosePopup} headName={'Детали ингридиента'}>
                <IngridientDetails />
            </Modal>}
        </section>
    )
}