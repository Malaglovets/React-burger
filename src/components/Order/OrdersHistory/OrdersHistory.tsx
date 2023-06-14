import React, { FC } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { orderHistoryClose, orderHistoryStart } from "../../../services/actions/orderHistory";
import { getCookie } from "../../../utils/cookie";
import { Order } from "../Order";
import styles from './OrderHistory.module.css'
import { wsURL } from "../../../utils/constants";

export const OrdersHistory: FC = () => {
    const location = useLocation()
    const dispatch = useAppDispatch()
    const { orderHistory } = useAppSelector(state => state.historySocket)

    React.useEffect(() => {
        dispatch(orderHistoryStart(`${wsURL}?token=${getCookie('token')}`))
        return () => {
            dispatch(orderHistoryClose('closed by client'))
        }
    }, [])

    return (
        orderHistory ?
        <ul className={styles.list}>
            {orderHistory.orders.reverse().map(order => {
                return (
                    <Link
                        to={`/profile/orders/${order._id}`}
                        state={{ background: location, orderNumber: order.number}}
                        className={styles.link}
                        key={order._id}
                        >
                        <li className={styles.item}>
                            <Order order={order} status={true}/>
                        </li>
                    </Link>
                )
            })
            }
        </ul>
        :
        <></>
    )
}