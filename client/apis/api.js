import request from 'superagent'


const TodoListUrl= '/todoList/'


/**
*Get task it's returning an Array of objects:
  [
    {
    id:2,
    Taks:'string' 
    Description:'string' 
    Priority:'string' 
    Completed:'string' 
  },
   {
    id:1,
    Taks:'string'    
    Description:'string' 
    Priority:'string' 
    Completed:'string' 
  },
]
* 
*@addTasks is receiving an object
*{
    id:1,
    Taks:this.state.task    
    Description
    Priority
    Completed
  },
*
*@editTaskDescription 
*is only editing the task Description by accessing the task by its id
* -description is a string(this.state.description)
*
*/

export function getTask () {
    return request
      .get(TodoListUrl)
      .then(response =>  response.body)
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
  
  
  export function editTaskDescription (id, description) {
    
    return request
    .put(`${TodoListUrl}${id}`)
    .send({description})
    .then(response => response.body)
  }
  
 