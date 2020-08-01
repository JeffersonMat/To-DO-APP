import React from "react";
import { addTask, getTask } from "../apis/api";
import {
  updateTask,
  updateTaskDescription,
  receivedTask,
} from "../actions/index";
import { connect } from "react-redux";

class Form extends React.Component {
  state = {
    task: "",
    description: "",
    priority: 0,
    completed: false,
  };

  handleChange = (event) => {
    event.preventDefault();
    const value = event.target.value;
    this.setState({ [event.target.name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const task = this.props.task;

    addTask(this.state).then((res) => {
      this.props.dispatch(receivedTask(task));
    });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="task"
          defaultValue={this.state.task}
          onChange={this.handleChange}
        />
        <input type="submit" value="ADD" />
      </form>
    );
  }
}

export default connect()(Form);
