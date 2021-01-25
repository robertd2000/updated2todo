import React, {useState} from 'react';
import {ModalChange} from './modalChange';

export const TodoItem = ({title, done, text, id, doneTask, onDelete, date, show, changeContent}) => {
    const [isOpen, setOpen] = useState(false);
    const [showModal, setModal] = useState('modal')

    const doneStyle = done ? 'done' : ''
    const doneDiv = done ? <div className='doneDiv'>✔️ Выполнено</div> : ''
    const underline = done ? 'hr' : ''
    const textOpen = isOpen 
        ? 
        <p className='done-grey'>{text}</p> 
        :
        <p className='done-grey'>{text.slice(0, 40) + '...'}</p> 

    
    const closeModal = () => setModal('modal')

    const setShowModal = () => setModal(showModal + ' show')
        

    return (
        <>
            <ModalChange id={id} showModal={showModal} closeModal={closeModal} changeContent={changeContent} />
            <div className={show ? 'item__inner' : 'hide'}>
                <div>
                    <p className='float-left' >{date}</p>
                    <h1 className={doneStyle + ' d-inline titleItem'} onClick={doneTask} >{title}</h1>
                    <div className='buttons float-right'>
                        {doneDiv}
                        <button onClick={onDelete} className='btn btn-primary float-right d-inline'>X</button>
                        <button onClick={setShowModal} className='btn btn-secondary float-right d-inline'>
                            <i className="far fa-edit"></i>
                        </button>
                    </div>
                </div>
                <div className='paragraph'>
                    {textOpen}
                </div>
                <button onClick={() => setOpen(!isOpen)} className='closeShowText'>...</button>
                <hr className={underline} />
            </div>
        </>
    )
}