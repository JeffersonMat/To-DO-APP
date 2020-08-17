import { combineReducers } from "redux";
import tasks from "./tasks";
import viewForms from "./viewForms"

// import stuff from './stuff'

export default combineReducers({
  tasks,
  viewForms
});
