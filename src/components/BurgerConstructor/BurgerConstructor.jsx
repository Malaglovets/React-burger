import React from "react";
import styles from "./BurgerConstructor.module.css";
import { ConstructorElement, DragIcon, Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import OrderDetails from "../OrderDetails/OrderDetails";
import Modal from "../Modal/Modal";

export default function BurgerConstructor () {

    const [popup, setPopup] = React.useState({visible: false})

    const handleOpenPopup = () => {
        setPopup({visible: true})
    }

    const handleClosePopup = () => {
        setPopup({visible: false})
    }

    return (
        <section className={styles.constructor}>
            <ul className={styles.list}>
                <li className={styles.bun}>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text="Краторная булка N-200i (верх)"
                        price={20}
                        thumbnail={"https://code.s3.yandex.net/react/code/bun-02.png"}
                    />
                </li>
                <ul className={styles.element}>
                    <li className={styles.element_item}>
                        <DragIcon type="primary" />
                        <ConstructorElement
                            text="Соус традиционный галактический"
                            price={30}
                            thumbnail={"https://code.s3.yandex.net/react/code/sauce-03.png"}
                            className="ml-2"
                        />
                    </li>
                    <li className={styles.element_item}>
                        <DragIcon type="primary" />
                        <ConstructorElement
                            text="Мясо бессмертных моллюсков Protostomia"
                            price={300}
                            thumbnail={"https://code.s3.yandex.net/react/code/meat-02.png"}
                            className="ml-2"
                        />
                    </li>
                    <li className={styles.element_item}>
                        <DragIcon type="primary" />
                        <ConstructorElement
                            text="Плоды Фалленианского дерева"
                            price={80}
                            thumbnail={"https://code.s3.yandex.net/react/code/sp_1.png"}
                            className="ml-2"
                        />
                    </li>
                    <li className={styles.element_item}>
                        <DragIcon type="primary" />
                        <ConstructorElement
                            text="Хрустящие минеральные кольца"
                            price={80}
                            thumbnail={"https://code.s3.yandex.net/react/code/mineral_rings.png"}
                            className="ml-2"
                        />
                    </li>
                    <li className={styles.element_item}>
                        <DragIcon type="primary" />
                        <ConstructorElement
                            text="Хрустящие минеральные кольца"
                            price={70}
                            thumbnail={"https://code.s3.yandex.net/react/code/mineral_rings.png"}
                            className="ml-2"
                        />
                    </li>
                </ul>
               <li className={styles.bun}> 
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text="Краторная булка N-200i (низ)"
                        price={80}
                        thumbnail={"https://code.s3.yandex.net/react/code/bun-02.png"}
                    />
                </li>
            </ul>
            <div className={styles.order}>
                <p className="text text_type_digits-medium">660</p>
                <span className={styles.current}><CurrencyIcon type="primary" /></span>
                <Button onClick={handleOpenPopup} htmlType="button" type="primary" size="large" extraClass="ml-10">Оформить заказ</Button>
            </div>
            {popup.visible && <Modal handleClose={handleClosePopup}>
                                <OrderDetails handleClose={handleClosePopup}/>
                            </Modal>}
        </section>
    )
}