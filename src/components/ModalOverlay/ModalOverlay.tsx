import React, { FC }  from 'react';
// import PropTypes from 'prop-types';
import styles from"./ModalOverlay.module.css"

export const ModalOverlay: FC <{handleClose?: () => void}> = ({ handleClose }) => {
  return(
    <div onClick={handleClose} className={styles.popup}>
    </div>
  )
}

// ModalOverlay.propTypes = {
//   handleClose: PropTypes.func.isRequired
// }