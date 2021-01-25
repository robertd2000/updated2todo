import React, {useState} from 'react';

export const InputChange = ({id, setShowModal, closeModal}) => {
    const [text, setText] = useState('')
    const [title, setTitle] = useState('')

    const titleChange = (e) => {
        return setTitle(e.target.value)
    }

    const textChange = (e) => {
        return setText(e.target.value)
    }

    const setModal = (id, title, text) => {
        setShowModal(id, title, text)
        console.log(id)
        return closeModal('')
    }

    return (
        <div>
            <input
                onChange={titleChange}
                className='form-control'
                value={title}
                placeholder='Заголовок'>
            </input>
            <textarea
                onChange={textChange}
                className='form-control'
                value={text}
                placeholder='Текст'>
            </textarea>
            <button
                id='saveBtn'
                onClick={() => {setModal(id, title, text)}}
                className='btn btn-primary'>
                    Добавить
            </button>
        </div>
    )
}