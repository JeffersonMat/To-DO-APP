import request from 'superagent'

const TodoListUrl= 'todoList/'



export function getTask () {
    return request
      .get(TodoListUrl)
      .then(response => response.body)
  }
  
  export function addTask (tasks) {
    return request
      .post(TodoListUrl)
      .send(tasks)
      .then(response => response.body)
  }
  
  export function removeTask (id) {
    return request
    .delete(`${TodoListUrl}${id}`)
    .then(response => response)
  }
  
  
  export function editTask (id, description) {
    
    return request
    .put(`${TodoListUrl}${id}`)
    .send({description})
    .then(response => response.body)
  }
  
 