import request from "superagent"

const TodoListUrl= "/todoList/complete/"

/**
* It sets the status (only for the user) of a the task by its id
* In the data base it only changes the value of the respective column
* @param id {int} - The id of the task
* @param complete {string} - It changes the status of the task
*
*/


export function editTaskComplete(id, complete) {

    return request
      .put(`${TodoListUrl}${id}`)
      .send({complete})
      .then((response) => response.body);
  }
  