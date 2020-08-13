import request from "superagent"

const TodoListUrl= "/todoList/complete"

export function editTaskComplete(id, complete) {

    return request
      .put(`${TodoListUrl}${id}`)
      .send({complete})
      .then((response) => response.body);
  }
  