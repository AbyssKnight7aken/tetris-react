import { Link } from "react-router-dom";
import styles from './Modal.module.css';

const Modal = ({ close, deleteConfirm }) => {
    return (
        <div className={styles.modal_container} id="m2-o">
            <div className={styles.modal}>
                <h1 className={styles.modal__title}>Delete Confirmation</h1>
                <p className={styles.modal__text}>Are you sure you want to <strong>delete</strong> this result <strong>permanently</strong>?</p>
                <button id="del" onClick={deleteConfirm} className={styles.modal__btnDel}>Delete &rarr;</button>
                <button onClick={close} className={styles.modal__btn}>Cancel &rarr;</button>
                <Link to="" className={styles.link_2} onClick={close} ></Link>
            </div >
        </div >
    );
}

export default Modal;