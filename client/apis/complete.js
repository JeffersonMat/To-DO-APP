import request from "superagent"

const TodoListUrl= "http://localhost:3000/api/v1/todoList/complete/"

export function editTaskComplete(id, complete) {

    return request
      .put(`${TodoListUrl}${id}`)
      .send({complete})
      .then((response) => response.body);
  }
  