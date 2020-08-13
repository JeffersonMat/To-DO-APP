import request from "superagent"

const TodoListUrl = "/todoList/priority/";
const TodoListUrlComplete= "/todoList/complete/"

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
