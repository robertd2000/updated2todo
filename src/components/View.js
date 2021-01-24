import React, {useState, useEffect} from 'react';
import {TodoItem} from './todoItem';
import Spinner from './spinner';
import {Modal} from './modal'

export const View = ({list, sortByDate, addTodo, closeModal, showModal, onDelete, doneTask, setShowModal, loading, onFind}) => {
    
    let mapList = (!loading) ? list.map(item => {
        return <TodoItem key={item.id}
            onDelete={() => onDelete(item.id)}
            doneTask={() => doneTask(item.id)}
            text={item.text}
            title={item.title}
            done={item.done}
            date={item.date}
        />
    }) : null

    const findItem = (e) => {
        console.log(e.target.value)
        return onFind(e.target.value)
    }

    const spinner = loading ? <Spinner/> : null;
    
    return (
        <div className='container'>
            <Modal showModal={showModal} addTodo={addTodo} closeModal={closeModal} />
            <button className='btn btn-info' onClick={setShowModal}>Добавить</button>
            {list.length !== 0 ? <p>Ваши заметки: </p> : <p>У вас нет заметок</p>}
            <input onChange={findItem} className='form-control'></input>
            <button onClick={sortByDate} className='btn sort'>Сортировать</button>

            <div>
                {spinner}
                {mapList}
            </div>
        </div>
    )
}