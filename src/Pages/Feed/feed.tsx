import React, { FC } from "react";
import { OrderSummary } from "../../components/Order/OrderSummary/OrderSummary";
import { OrderList } from "../../components/Order/OrderList/OrderList";
import styles from "./feed.module.css"
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { feedClose, feedStart } from "../../services/actions/feed";
import { wsURL } from "../../utils/constants";

export const Feed: FC = () => {
    const dispatch = useAppDispatch()
    const { orderFeed } = useAppSelector(state => state.feedSocket)

    React.useEffect(() => {
        dispatch(feedStart(`${wsURL}/all`))
        return () => {
            dispatch(feedClose('closed by client'))
        }
    }, [])

    return (
        <section className={styles.feed}>
            <p className="text text_type_main-large mb-5">Лента заказов</p>
            <div className={styles.main}>
            {orderFeed &&
                    <>
                        <OrderList />
                        <OrderSummary/>
                    </>} 
            </div>
        </section>
    )
}