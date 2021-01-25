import React from 'react';
import { InputChange } from './inputChange';

export const ModalChange = ({id, showModal, closeModal, changeContent}) => {
    return (
        <div className={showModal}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <p>Измените пост:</p>
                    </div>
                    <div className="modal-body">
                        <InputChange id={id} closeModal={closeModal} setShowModal={changeContent}/>
                    </div>
                    <div className="modal-footer">
                        <button type="button" onClick={closeModal} className="btn btn-secondary" data-dismiss="modal">Закрыть</button>
                    </div>
                </div>
            </div>
        </div>
    )
}