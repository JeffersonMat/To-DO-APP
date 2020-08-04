const initialState = [];
import {
  RECEIVED_TASK,
  UPDATE_TASK,
  DELETE_TASK,
  GET_TASKS,
} from "../actions/index";

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVED_TASK:
      return action.tasks;

    case UPDATE_TASK:
      return state.map((task) => {
        if (task.id == action.task.id) {
          return action.task;
        } else {
          return task;
        }
      });

    case GET_TASKS:
      return action.task;

    case DELETE_TASK:
      return state.filter((task) => task.id !== action.id);

    default:
      return state;
  }
};

export default reducer;
