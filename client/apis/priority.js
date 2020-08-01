import request from "superagent"

const TodoListUrl = "http://localhost:3000/api/v1/todoList/priority/";
const TodoListUrlComplete= "http://localhost:3000/api/v1/todoList/complete/"

export function editTaskPriority(id, priority) {
  console.log(id, priority);
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
