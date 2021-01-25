import React, {useState, useEffect} from 'react';
import Spinner from './spinner';
import {View} from './View';
import {service, setService} from '../service/service';

export const TodoList = () => {

    const [list, setList] = useState([])
    const [loading, setloading] = useState(true);
    const [showModal, setModal] = useState('modal')
    const n = list

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
            show: true
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

    //метод сортировки по дате, указанной в каждом элементе массива list
    const sortByDate = () => {
        //сотирует list по убыванию даты - показывает самые поздние посты/заметки
        let l = list.sort((a, b) => {
            if (a.date > b.date) {
                return 1;
              }
              if (a.date < b.date) {
                return -1;
              }
              return 0;
        })
        console.log(l)
        //записывает изменеия в стейт/state list
        return setList(() => {
            return [...l]
        })
    }

    //Метод поиска по заголовкам title
    const onFind = (e) => {

        //Создает 2 массива - preList содержит элементы которые не начинаются на введенные символы
        let preList = list.filter(i => !i.title.startsWith(e))
        //show устанавливается в false чтобы они не отображались
        preList.map(i => {
            i.show = !i.show
            return i
        })
        //массив вкл в себя элементы, начинающиеся на пользовательский ввод
        const newList = list.filter(i => i.title.startsWith(e))
        //show = true
        newList.map(i => {
            i.show = true
            return i
        })
        //возвращает исходый массив list (можно удалить)
        if (e === '') {
            let c = list.map(i => {
                i.show = true
                return i
            })
            console.log(c)

            return setList(() => {
                return c
            })
        }
        //записывает изменения в стейт для перерендера страницы
        return setList(() => {
            return [...newList, ...preList]
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
