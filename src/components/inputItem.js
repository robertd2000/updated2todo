import React, {useState} from 'react';

export const InputItem = ({addTodo, closeModal}) => {
    const [text, setText] = useState('')
    const [title, setTitle] = useState('')

    const titleChange = (e) => {
        return setTitle(e.target.value)
    }

    const textChange = (e) => {
        return setText(e.target.value)
    }

    const setTodo = (title, text) => {
        addTodo(title, text)
        return setText(''), setTitle(''), closeModal()

    }

    const enterHandle = (e) => {
        if (e.key === 'Enter') {
            setTodo(text)
        }
    }

    return (
        <div>
            <input
                onChange={titleChange}
                className='form-control'
                onKeyPress={enterHandle}
                value={title}
                placeholder='Заголовок'>
            </input>
            <textarea
                onChange={textChange}
                onKeyPress={enterHandle}
                className='form-control'
                value={text}
                placeholder='Текст'>
            </textarea>
            <button
                id='saveBtn'
                onClick={() => {setTodo(title, text)}}
                className='btn btn-primary'>
                    Добавить
            </button>
        </div>
    )
}