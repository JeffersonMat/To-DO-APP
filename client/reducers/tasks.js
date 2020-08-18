const initialState = []
import {
  RECEIVED_TASK,
  UPDATE_TASK,
  DELETE_TASK,
  GET_TASKS,
} from "../actions/index"

/**
* task is an object:
*  {
    id:2,
    Taks:'string' 
    Description:'string' 
    Priority:'string' 
    Completed:'string' 
  } 

*
*
*@updateTask Important!!!
*
* Update is not updating the whole task.
*Is receiving an object:
* newTask{
    id:2,
    Taks, 
    Description
    Priority
    Completed,

}
But it's only updating where needed, the rest stays as it came throug the props. 
*The id never changes it has to remain unchange
*
*newTask{
    id:2,
    Taks:r
    Description:this.state.description
    Priority:remains the same
    Completed:remains the same
}
*/

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVED_TASK:
      return action.tasks

    case UPDATE_TASK:
      return state.map((task) => {
        if (task.id == action.task.id) {
          return action.task
        } else {
          return task
        }
      })

    case GET_TASKS:
      return action.task

    case DELETE_TASK:
      return state.filter((task) => task.id !== action.id)

    default:
      return state
  }
}

export default reducer
