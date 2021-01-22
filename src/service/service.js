export const service = () => {
    return fetch('https://todo-288a2-default-rtdb.firebaseio.com/todo.json')
        .then(response => response.json())
        .then(data => {
            let arr = Object.values(data)
            return arr[arr.length - 1]
        })
}


export const setService = (todo) => {
    return fetch('https://todo-288a2-default-rtdb.firebaseio.com/todo.json', {
        method: "POST",
        body: JSON.stringify(todo),
        headers: {
          "Content-Type": "application/json",
        },
    }).then(response => response.json())
        .then()
}