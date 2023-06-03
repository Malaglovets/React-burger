import React, { FC, ReactNode } from "react";
import styles from "./Modal.module.css"
import { createPortal } from 'react-dom';
import { ModalOverlay } from '../ModalOverlay/ModalOverlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { useEffect } from "react";
import { useLocation } from "react-router-dom";


const reactModal = document.querySelector('#modals') as HTMLElement

type TModal = {
    children: ReactNode,
    handleClose?: () => void,
    headName?: string
}
export const Modal: FC<TModal> = ({ children, handleClose, headName }) => {
    const location = useLocation()

    useEffect(() => {
        if (handleClose !== undefined) {
            const handleEsc = (evt: KeyboardEvent) => {
                evt.key === "Escape" && handleClose()
            }
            document.addEventListener("keydown", handleEsc)
            return () => {
                document.removeEventListener("keydown", handleEsc)
            }
        }
    }, [handleClose])
    
    return createPortal(
        <div className={styles.modal}>
            <div className={styles.component}>
                {headName &&
                    <div className={styles.head}>
                        <p className="text text_type_main-large mt-10 ml-10">{headName}</p>
                    </div>
                }
                {location.state && location.state.orderNumber &&
                    <div className={styles.head}>
                        <p className="text text_type_digits-default mt-15 ml-10"># {location.state.orderNumber}</p>
                    </div>}
                {handleClose &&
                    <button onClick={handleClose} className={styles.close}>
                        <CloseIcon type="primary" />
                    </button>}
                {children}
            </div>
            <ModalOverlay handleClose={handleClose} />
        </div>, reactModal
    )
}

