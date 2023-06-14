import React, { FC } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAppSelector } from "../../../hooks/hooks";
import { Order } from "../Order";
import styles from './OrderList.module.css'

export const OrderList = () => {
    const location = useLocation()
    const { orderFeed } = useAppSelector(state => state.feedSocket)

    return (
        <ul className={styles.list}>
            {orderFeed?.orders.map(order => {
                return (
                    <Link
                        key={order._id}
                        to={`/feed/${order._id}`}
                        state={{ background: location, orderNumber: order.number }}
                        className={styles.link}>
                        <li className={styles.item}>
                            <Order order={order} />
                        </li>
                    </Link>
                )
            })
            }
        </ul>
    )
}