import React, {useState, useEffect} from 'react';
import Spinner from './spinner';
import {View} from './View';
import {service, setService} from '../service/service';

export const TodoList = () => {

    const [list, setList] = useState([])
    const [loading, setloading] = useState(true);
    const [showModal, setModal] = useState('modal')

    useEffect(() => {
        service().then(data => setList(data))
        setloading(false)
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

    const doneTask = (id) => {

        const todoPrev = list.filter(i => i.id !== id)
        const todoCurrent = list.filter(i => i.id === id)
        todoCurrent[0].done = !todoCurrent[0].done
        const newItem = [...todoPrev, ...todoCurrent]  
        setService(newItem)
  
        return setList(() => {
          return newItem
        })
      }

    const addTodo = (title, text) => {
        const newItem = {
            id: Math.floor(Math.random() * 1000), 
            text: text, 
            title: title, 
            done: false,
            date: new Date().toLocaleString(),
        }
        return setList((pre) => {
           let newList = [
            ...pre,
            newItem
        ]
            newList = newList.sort((a, b) => {
                if (a.date < b.date) {
                    return 1;
                  }
                  if (a.date > b.date) {
                    return -1;
                  }
                  // a должно быть равным b
                  return 0;
            })
           setService(newList)
            return newList
        })
    }

    const closeModal = () => setModal('modal')

    const setShowModal = () => setModal(showModal + ' show')

    const sortByDate = () => {
        let l = list.sort((a, b) => {
            if (a.date > b.date) {
                return 1;
              }
              if (a.date < b.date) {
                return -1;
              }
              // a должно быть равным b
              return 0;
        })
        console.log(l)
        return setList(() => {
            return [...l]
        })
    }

    const onFind = (e) => {
        let n = list
        if (e == '') {
            setList(() => {
                return list
            })
        }
        console.log(n)
        const newList = list.filter(i => i.title.startsWith(e))
        return setList(() => {
            return newList
        })
    }

    const spinner = loading ? <Spinner/> : null;
    const content = !(loading) ? <View 
        list={list} addTodo={addTodo} 
        closeModal={closeModal} 
        showModal={showModal}
        onDelete={onDelete}
        doneTask={doneTask}
        setShowModal={setShowModal}
        loading={loading}
        sortByDate={sortByDate}
        onFind={onFind}
        /> : null;

    return (
        <div>
            {spinner}
            {content}
        </div>
    )
}
