import React, {useState, useEffect} from 'react';
import {InputItem} from './inputItem';

export const Modal = ({showModal, addTodo, closeModal}) => {
    return (
        <div className={showModal}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <p>Добавьте новый пост:</p>
                    </div>
                    <div className="modal-body">
                        <InputItem addTodo={addTodo} closeModal={closeModal}/>
                    </div>
                    <div className="modal-footer">
                        <button type="button" onClick={closeModal} className="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    )
}