import React from 'react';

export const TodoItem = ({title, id, text, done, onDelete}) => {
    return (
        <>
            <div className='item__inner'>
                <div className=''>
                    <h1 className='d-inline'>{title}</h1>
                    <button onClick={onDelete} className='btn btn-primary float-right d-inline'>X</button>
                </div>
                <p className=''>{text}</p>
                <hr/>
            </div>
        </>
    )
}