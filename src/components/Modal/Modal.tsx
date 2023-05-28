import React, { FC, ReactNode } from "react";
// import PropTypes from 'prop-types';
import styles from "./Modal.module.css"
import { createPortal } from 'react-dom';
import { ModalOverlay } from '../ModalOverlay/ModalOverlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { useEffect } from "react";

const reactModal = document.querySelector('#modals') as HTMLElement

type TModal = {
    children: ReactNode,
    handleClose?: () => void,
    headName?: string
}
export const Modal: FC<TModal> = ({ children, handleClose, headName }) => {

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
                    </div>}
                {handleClose !== undefined &&
                    <button onClick={handleClose} className={styles.close}>
                        <CloseIcon type="primary" />
                    </button>}
                {children}
            </div>
            <ModalOverlay handleClose={handleClose} />
        </div>, reactModal
    )
}

// Modal.propTypes = {
//     children: PropTypes.element,
//     handleClose: PropTypes.func.isRequired,
//     headName: PropTypes.string
// }