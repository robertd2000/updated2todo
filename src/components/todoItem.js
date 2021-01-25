import React, {useState} from 'react';

export const TodoItem = ({title, done, text, doneTask, onDelete, date, show}) => {
    const [isOpen, setOpen] = useState(false);

    const doneStyle = done ? 'done' : ''
    const doneDiv = done ? <div className='doneDiv'>✔️ Выполнено</div> : ''
    const underline = done ? 'hr' : ''
    const textOpen = isOpen 
        ? 
        <p className='done-grey'>{text}</p> 
        :
        <p className='done-grey'>{text.slice(0, 40) + '...'}</p> 
        

    return (
        <>
            <div className={show ? 'item__inner' : 'hide'}>
                <div>
                    <p className='float-left' >{date}</p>
                    <h1 className={doneStyle + ' d-inline titleItem'} onClick={doneTask} >{title}</h1>
                    <div className='buttons float-right'>
                        {doneDiv}
                        <button onClick={onDelete} className='btn btn-primary float-right d-inline'>X</button>
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