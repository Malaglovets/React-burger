import React from "react";
import PropTypes from 'prop-types';
import ingridientType from "../../utils/types";
import { useDispatch } from 'react-redux'
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerConstructorElement.module.css";
import { useDrag, useDrop } from "react-dnd";
import { deleteIngridient, moveIngridient } from "../../services/actions/burgerConstructor";

export default function BurgerConstructorElement({ index, element, topOrBottom, extraName }) {

    const ref = React.useRef(null)
    const dispatch = useDispatch()
    const { _id } = element

    const [{ isDragging }, drag] = useDrag({
        type: "element",
        item: () => {
            return { _id, index }
        },
        collect: monitor => ({
            isDragging: monitor.isDragging()
        })
    })

    const opacity = isDragging ? 0 : 1

    const [, drop] = useDrop({
        accept: 'element',
        hover: (item, monitor) => {
            if (!ref.current) {
                return
            }
            const dragIndex = item.index
            const hoverIndex = index
            if (dragIndex === hoverIndex) {
                return
            }
            const hoverBoundingRect = ref.current?.getBoundingClientRect()
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            const clientOffset = monitor.getClientOffset()
            const hoverClientY = clientOffset.y - hoverBoundingRect.top
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }
            dispatch(moveIngridient(dragIndex, hoverIndex))
            item.index = hoverIndex
        }
    })

    const deleteElement = (uid, price) => {
        dispatch(deleteIngridient(uid, price))
    }
    drag(drop(ref))

    return (
        <li
            ref={element.type !== 'bun' ? ref : null}
            className={element.type === 'bun' ? styles.bun : styles.filling}
            style={{ opacity }}>
            {element.type !== 'bun' && <DragIcon type="primary" />}
            <ConstructorElement
                handleClose={() => deleteElement(element.uid, element.price)}
                type={topOrBottom}
                isLocked={element.type === 'bun' && true}
                text={element.type === 'bun' ? element.name + extraName : element.name}
                price={element.price}
                thumbnail={element.image}
                className="ml-2"
            />
        </li>
    )
}

BurgerConstructorElement.propTypes = {
    index: PropTypes.number,
    element: ingridientType.isRequired,
    topOrBottom: PropTypes.string,
    extraName: PropTypes.string
}