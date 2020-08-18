import request from "superagent"

const TodoListUrl = "/todoList/priority/";
const TodoListUrlComplete= "/todoList/complete/"


/**
* It sets the Priority (only for the user) of a the task by its id
* In the data base it only changes the value of the respective column
* @param id {int} - The id of the task
* @param priority {string} - It changes the priority of the task -(only changes the visual of the task- Eg. In this case in the front End only changes its style)
*
*/


export function editTaskPriority(id, priority) {

  return request
    .put(`${TodoListUrl}${id}`)
    .send({ priority })
    .then((response) => response.body);
}

export function editTaskComplete(id, complete) {

  return request
    .put(`${TodoListUrlComplete}${id}`)
    .send({complete })
    .then((response) => response.body);
}
