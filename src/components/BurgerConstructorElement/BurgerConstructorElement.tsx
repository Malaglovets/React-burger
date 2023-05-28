import React, { FC, useRef }  from "react";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerConstructorElement.module.css";
import { useDrag, useDrop, XYCoord  } from "react-dnd";
import { deleteIngredient, moveIngredient } from "../../services/actions/burgerConstructor";
import { TElement } from "../../utils/types";
import { useAppDispatch } from "../../hooks/hooks";

type TConstructorElementProps = {
    index: number,
    element: TElement,
    topOrBottom?: "top" | "bottom",
    extraName?: string
};
export const BurgerConstructorElement: FC<TConstructorElementProps> = ({ index, element, topOrBottom, extraName }) => {

    const refElement = useRef<HTMLLIElement>(null)
    const dispatch = useAppDispatch()
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

    const [, drop] = useDrop<TElement, void>({
        accept: 'element',
        hover: (item, monitor) => {
            if (!refElement.current) {
                return
            }
            const dragIndex = item.index
            const hoverIndex = index
            if (dragIndex === hoverIndex) {
                return
            }
            const hoverBoundingRect = refElement.current?.getBoundingClientRect()
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            const clientOffset = monitor.getClientOffset()
            const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }
            dispatch(moveIngredient(dragIndex, hoverIndex))
            item.index = hoverIndex
        }
    })

    const deleteElement = (uid: string, price: number) => {
        dispatch(deleteIngredient(uid, price))
    }
    drag(drop(refElement))

    return (
        <li 
            ref={element.type !== 'bun' ? refElement : null}
            className={element.type === 'bun' ? styles.bun : styles.filling }
            style={{ opacity }}>
            {element.type !== 'bun' && <DragIcon type="primary" />}
            <ConstructorElement
                handleClose={() => deleteElement(element.uid, element.price)}
                type={topOrBottom}
                isLocked={element.type === 'bun' && true}
                text={element.type === 'bun' ? element.name + extraName : element.name}
                price={element.price}
                thumbnail={element.image}
            />
        </li>
    )
}
