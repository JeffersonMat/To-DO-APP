import React from "react";
import { addTask, getTask } from "../apis/api";
import { receivedTask } from "../actions/index";
import { connect } from "react-redux";

class Form extends React.Component {
  state = {
    task: "",
    description: "",
    priority: 0,
    completed: false,
    showForm:false,
  };

  handleChange = (event) => {
    event.preventDefault();
    const value = event.target.value;
    this.setState({ [event.target.name]: value });
  };

handleClick = ()=>{
  this.setState({
    showForm:true
  })
}
//@addTask is expecting an object
//@receivedTask is updating the Global state and creating a new task with only value of task, the rest of the values are empty.
//
  handleSubmit = (event) => {
    event.preventDefault();

    const task = this.props.task;

    addTask(this.state)
      .then((res) => {
        this.props.dispatch(receivedTask(task));
      })
      .then(() => {
        getTask().then((task) => {
          return this.props.dispatch(receivedTask(task));
        })
      })

      this.setState({
        showForm:false
      })
  };


  handleClose = (e) => {
    this.setState({
      showForm: false,
    })
  }

  render() {
    return (
      <>
        {this.state.showForm ? (
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              name="task"
              placeholder="Add a task here"
              defaultValue={this.state.task}
              onChange={this.handleChange}
            />

            <button
              className="btn-floating btn-large waves-effect waves-light pulse "
              type="submit"
            >
              <i className="material-icons ">add</i>
            </button>
            <a
              className="waves-effect waves-teal btn-flat"
              onClick={this.handleClose}
            >
              Close
            </a>
          </form>
        ) : (
          <>
            <button
              className="btn-floating btn-large waves-effect waves-light center show-add-form"
              onClick={this.handleClick}
            >
              <i className="material-icons center">add</i>
            </button>
          </>
        )}
      </>
    )
  }
}

          

export default connect()(Form);
