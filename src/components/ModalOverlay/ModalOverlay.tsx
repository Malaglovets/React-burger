import React, { FC }  from 'react';
import styles from"./ModalOverlay.module.css"

export const ModalOverlay: FC <{handleClose?: () => void}> = ({ handleClose }) => {
  return(
    <div onClick={handleClose} className={styles.popup}>
    </div>
  )
}

