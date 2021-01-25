import React, {useState, useEffect} from 'react';
import Spinner from './spinner';
import {View} from './View';
import {service, setService} from '../service/service';

export const TodoList = () => {

    const [list, setList] = useState([])
    const [loading, setloading] = useState(true);
    const [showModal, setModal] = useState('modal')

    useEffect(() => {
        //запрос на сервер и запись результата в state -> list
        service().then(data => setList(data))
        setloading(false)
    }, [])

    //удалить элемент
    const onDelete = id => {
        //список объектов/элементов на которые пользователь не нажал и которые будут отображаться / не будут удалены
        const nonDeleteTodo = list.filter(i => i.id !== id)
        
        setService(nonDeleteTodo)
        return setList(() => {
            //возвращает список элементов, исключая тот, на который нажали
            return [
                ...nonDeleteTodo
            ]
        })
    }

    //пометить как выполненное
    const doneTask = (id) => {
        //создание 2 списков
        //список объектов/элементов на которые пользователь не нажал
        const todoPrev = list.filter(i => i.id !== id)
        //список из одного элемента, на который нажал пользователь
        const todoCurrent = list.filter(i => i.id === id)
        todoCurrent[0].done = !todoCurrent[0].done
        //новый список
        const newItem = [...todoPrev, ...todoCurrent] 
        //отправка на сервер 
        setService(newItem)
  
        return setList(() => {
          return newItem
        })
      }

    //добавление записей в todo -> list
    const addTodo = (title, text) => {
        //создание нового объекта списка задач с необходимыми полями
        const newItem = {
            id: Math.floor(Math.random() * 1000), 
            text: text, 
            title: title, 
            done: false,
            date: new Date().toLocaleString(),
            show: true
        }
        //запись изменений в state -> list
        return setList((pre) => {
            //создание нового списка с предыдущими значениями - pre
            //и новым объектом списка задач - newItem
            let newList = [
                ...pre,
                newItem
        ]
        //сортировка нового list - новые посты показаны первыми 
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
        //отправляет данные на сервер firebase
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
        let preList = list.filter(i => !i.title.toLowerCase().startsWith(e.toLowerCase()))
        //show устанавливается в false чтобы они не отображались
        preList.map(i => {
            i.show = false
            return i
        })
        //массив вкл в себя элементы, начинающиеся на пользовательский ввод
        const newList = list.filter(i => i.title.toLowerCase().startsWith(e.toLowerCase()))
        //show = true
        newList.map(i => {
            i.show = true
            return i
        })
        //возвращает исходый массив list (можно удалить)
        // if (e === '') {
        //     let c = list.map(i => {
        //         i.show = true
        //         return i
        //     })
        //     console.log(c)

        //     return setList(() => {
        //         return c
        //     })
        // }

        //записывает изменения в стейт для перерендера страницы
        return setList(() => {
            return [...newList, ...preList]
        })
    }

    const changeContent = (id, title, text) => {
        //изменяет контент (заголовок, текст и дату) в выбранном элементе
        return setList(() => {
            //создание 2 списков
            //список объектов/элементов на которые пользователь не нажал
            const todoPrev = list.filter(i => i.id !== id)
            //список из одного элемента, на который нажал пользователь
            const todoCurrent = list.filter(i => i.id === id)
            todoCurrent[0].title = title
            todoCurrent[0].text = text
            todoCurrent[0].date = new Date().toLocaleString()
            //новый список
            const newItem = [...todoPrev, ...todoCurrent] 
            //отправка на сервер 
            setService(newItem)
    
            return setList(() => {
                return newItem
            })
        })
    }

    //показать спиннер загрузки если loading === true, иначе null
    const spinner = loading ? <Spinner/> : null;
    //если loading не равен true то показыается основной контент и в него передаются пропсы
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
        changeContent={changeContent}
        /> : null;

    return (
        <div>
            {spinner}
            {content}
        </div>
    )
}
