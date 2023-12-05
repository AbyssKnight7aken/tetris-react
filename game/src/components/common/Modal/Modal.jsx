import { Link } from "react-router-dom";
import './Modal.css';

const Modal = ({close, deleteConfirm}) => {
    return (
        <div className="modal-container" id="m2-o">
            <div className="modal">
                <h1 className="modal__title">Delete Confirmation</h1>
                <p className="modal__text">Are you sure you want to <strong>delete</strong> this result <strong>permanently</strong>?</p>
                <button id="del" onClick={deleteConfirm} className="modal__btnDel">Delete &rarr;</button>
                <button onClick={close} className="modal__btn">Cancel &rarr;</button>
                <Link to="" className="link-2" onClick={close} ></Link >
            </div >
        </div >
    );
}

export default Modal;