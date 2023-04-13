import React from "react";
import PropTypes from 'prop-types';
import styles from "./Modal.module.css"
import { createPortal } from 'react-dom';
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { useEffect } from "react";

const reactModal = document.querySelector('#modals');

export default function Modal({children, modalName, handleClose}) {

    useEffect(() => {

        const handleEsc = (evt) => {
          evt.key === "Escape" && handleClose()
        }
    
        document.addEventListener("keydown", handleEsc)
    
        return() => {
          document.removeEventListener("keydown", handleEsc)
        }
      },[handleClose])
    
    return createPortal(
        <>
        <div className={styles.modal}>
            <div className={styles.component}>
                {modalName !== ' ' &&
                <div className={styles.head}>
                    <p className="text text_type_main-large mt-10 ml-10">{modalName}</p>
                </div>}
                    <button onClick={() => handleClose()} className={styles.close}>
                        <CloseIcon type="primary" />
                    </button>
                {children}
            </div>
            <ModalOverlay handleClose={handleClose}/>
        </div>
        </>, reactModal
    )
}

Modal.propTypes = {
    children: PropTypes.element,
    modalName: PropTypes.string,
    handleClose: PropTypes.func.isRequired
}