import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import styles from "./BurgerConstructor.module.css";
import { ConstructorElement, DragIcon, Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import OrderDetails from "../OrderDetails/OrderDetails";
import Modal from "../Modal/Modal";
import { useDrop } from "react-dnd";
import BurgerConstructorElement from "../BurgerConstructorElement/BurgerConstructorElement";
import { addIngridient } from "../../services/actions/burgerConstructor";
import { hideOrder, sendOrder } from "../../services/actions/orderDetails"

export default function BurgerConstructor () {

    const { draggedElements, bunsPrice, elementsPrice } = useSelector((state) => state.elements)
    const { popupVisible, orderRequest } = useSelector(state => state.orderDetails)

    const dispatch = useDispatch()

    function handleClosePopup() {
        dispatch(hideOrder())
    }

    const [, dropTarget] = useDrop({
        accept: 'ingridient',
        drop(item) {
            dispatch(addIngridient(item));
        }
    })

    const orderIt = (draggedElements) => {
        dispatch(sendOrder(draggedElements))
    }

    return (
        <section ref={dropTarget} className={styles.constructor}>
            <ul className={styles.list}>
                {draggedElements.map((item) =>
                    item.type === 'bun' &&
                    <BurgerConstructorElement key={item.uid + 'top'} element={item} topOrBottom={"top"} extraName={' (верх)'} />)}
                <ul className={styles.element}>
                    {draggedElements.map((item, index) =>
                        item.type !== 'bun' &&
                        <BurgerConstructorElement key={item.uid} index={index} element={item} />)}
                </ul>
                {draggedElements.map((item) =>
                    item.type === 'bun' &&
                    <BurgerConstructorElement key={item.uid + 'bottom'} element={item} topOrBottom={"bottom"} extraName={' (низ)'} />)}
            </ul>
            <div className={styles.order}>
                <p className="text text_type_digits-medium">{bunsPrice + elementsPrice}</p>
                <span className={styles.current}><CurrencyIcon type="primary" /></span>
                <Button onClick={() => orderIt(draggedElements)} disabled={draggedElements.length ? false : true} htmlType="button" type="primary" size="large" extraClass="ml-10">Оформить заказ</Button>
            </div>
            {orderRequest &&
            <Modal headName={'Загрузка...'} handleClose={handleClosePopup}></Modal>
            }
            {popupVisible && 
             <Modal handleClose={handleClosePopup}>
                <OrderDetails />
            </Modal>}
        </section>
    )
}



