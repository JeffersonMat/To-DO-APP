import React from "react";
import { getTask } from "../apis/api";
import Form from "./Form";
import ListOfTasks from "./ListsOfTasks";
import { receivedTask } from "../actions/index";
import { connect } from "react-redux";

class Todo extends React.Component {
  state={
    showForm:false,
  }
  componentDidMount() {
    getTask().then((task) => {
      return this.props.dispatch(receivedTask(task));
    });
  }



  render() {
    return (
      <>
        
        <h1>Task Manager</h1>
        {this.props.tasks.map((task) => (
          <ListOfTasks tasks={task} />
        ))}
      
        <Form task={this.props.tasks} />  
        
       
      </>
    );
  }
}
function mapstateprops(globalState) {
  return {
    tasks: globalState.tasks,
  };
}

export default connect(mapstateprops)(Todo);
