import React from 'react';
import PropTypes from 'prop-types';
import styles from"./ModalOverlay.module.css"

export default function ModalOverlay({ handleClose }) {
  return(
    <div onClick={() => handleClose()} className={styles.popup}>
    </div>
  )
}

ModalOverlay.propTypes = {
  handleClose: PropTypes.func.isRequired
}