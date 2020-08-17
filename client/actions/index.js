import request from "superagent";

export const RECEIVED_TASK = "RECEIVED_TASK";
export const DELETE_TASK = "DELETE_TASK";
export const UPDATE_TASK = "UPDATE_TASK";
export const GET_TASKS = "GET_TASKS";
export const VIEW_DESCRIPTION = "VIEW_DESCRIPTION"

export const receivedTask = (tasks) => {
  return {
    type: RECEIVED_TASK,
    tasks: tasks,
  };
};

export const updateTask = (task) => {
  return {
    type: UPDATE_TASK,

    task,
  };
};

export const deleteTask = (id) => {
  return {
    type: DELETE_TASK,
    id: id,
  }
}

export const deleteTasks = (id) => {
  return (dispatch) => {
    removeTask(id)
      .then(() => {
        dispatch(deleteTask(id));
      })
      .catch((err) => {
        console.log("It broke");
      });
  };
};

export const viewDescription=(view)=>{
  return{
    type: VIEW_DESCRIPTION,
    view
  }
}