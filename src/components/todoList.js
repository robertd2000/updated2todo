import React, {useState, useEffect} from 'react';
import {TodoItem} from './todoItem';
import {InputItem} from './inputItem';
import {service, setService} from '../service/service';

export const TodoList = () => {

    const [list, setList] = useState([])

    const [showModal, setModal] = useState('modal')

    useEffect(() => {
        service().then(data => setList(data))
    }, [])

    const onDelete = id => {
        const nonDeleteTodo = list.filter(i => i.id !== id)
        
        setService(nonDeleteTodo)
        return setList(() => {
            return [
                ...nonDeleteTodo
            ]
        })
    }

    const addTodo = (title, text) => {
        const newItem = {
            id: Math.floor(Math.random() * 1000), text: text, title: title, done: false
        }
        return setList((pre) => {
           let newList = [
            ...pre,
            newItem
        ]
           setService(newList)
            return newList
        })
    }

    const closeModal = () => setModal('modal')

    const modal = (
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

    return (
        <div className='container'>
            {modal}
            <button className='btn btn-info' onClick={() => setModal(showModal + ' show')}>Добавить</button>
            {list.length !== 0 ? <p>Ваши заметки: </p> : <p>У вас нет заметок</p>}

            <div>
                {list.map(item => {
                    return <TodoItem key={item.id}
                    onDelete={() => onDelete(item.id)}
                        text={item.text}
                        title={item.title}
                    />
                })}
            </div>
        </div>
    )
}