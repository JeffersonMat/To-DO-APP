import React from "react"
import { connect } from "react-redux"
import { deleteTask, updateTask } from "../actions/index"
import { editTaskComplete } from "../apis/complete"
import { removeTask, getTask } from "../apis/api"

import CardPanel from "./CardPanel"

class Tasks extends React.Component {
  state = {
    showDetails: false,
    isTaskClick: false,
    complete: "",
  }

  handleClick = (e) => {
    e.preventDefault()
    this.setState({
      showDetails: true,
      isTaskClick: true,
    })
  }

  handleComplete = (event) => {
    event.preventDefault()
    const complete = this.state.complete
    const id = this.props.tasks.id

    //@updateTask is expecting an object
    //@updateTask is only updating Description is this case, doesn't update the whole task
    //Id needs to remain unchange

    const newTask = {
      id: this.props.tasks.id,
      Tasks: this.props.tasks.Tasks,
      Description: this.props.tasks.Description,
      Priority: this.props.tasks.Priority,
      Completed: complete,
    }
    this.setState({ complete: "NOT" })

    editTaskComplete(id, complete).then(() => {
      this.props.dispatch(updateTask(newTask))
    })
  }

  handleCheckBox = () => {
    const complete = this.state.complete
    const id = this.props.tasks.id

    //@updateTask is expecting an object
    //@updateTask is only updating Description is this case, doesn't update the whole task
    //Id needs to remain unchange

    const newTask = {
      id: this.props.tasks.id,
      Tasks: this.props.tasks.Tasks,
      Description: this.props.tasks.Description,
      Priority: this.props.tasks.Priority,
      Completed: complete,
    }

    this.setState({ complete: "YES" })

    editTaskComplete(id, complete).then(() => {
      this.props.dispatch(updateTask(newTask))
    })
  }

  //Delete Task by grabing the task by its id and deletes the whole task object
  //@updateTasks is receving the current tasks available
  //getTasks is returnin the current tasks available
  //and receiveTasks is updating the global state, so it renders the rest of the tasks

  handleDelete = (e) => {
    const id = this.props.tasks.id
    e.preventDefault()
    removeTask(id)
      .then(() => {
        this.props.dispatch(deleteTask(id))
      })
      .then(() => {
        return this.props.dispatch(updateTask(this.props.tasks))
      })
      .then(() => {
        this.props.dispatch(getTask())
      })
      .then((task) => {
        return this.props.dispatch(receivedTask(task))
      })
  }

  handleTaskButton = (e) => {
    e.preventDefault()

    this.setState({
      isTaskClick: false,
      showDetails: false,
    })
  }

  completeStyling = (complete, priority) => {
    if (complete === "YES") {
      return {
        textDecoration: "line-through red",
        opacity: 0.5,
        background: "black",
        color: "#fff",
      }
    }
    switch (priority) {
      case "High":
        return { background: "#d50000", color: "#fff" }

      case "Medium":
        return { background: "#ffa726", color: "#fff" }

      case "Low":
        return { background: "#1de9b6", color: "black" }
    }
  }

  renderTasksLists = (task, taskId) => {
    const complete = this.props.tasks.Completed
    const priority = this.props.tasks.Priority
    return (
      <div className="task-container">
        <li key={this.props.tasks.id} style={{ listStyleType: "none" }}>
          {complete === "YES" ? (
            <button
              id="complete-button"
              className="btn-large"
              onClick={this.handleComplete}
            >
              <i
                className="large material-icons done "
                onClick={this.handleComplete}
              >
                done
              </i>
            </button>
          ) : (
            <button
              id="complete-button"
              className="btn-large"
              onClick={this.handleCheckBox}
            >
              <i
                className="small material-icons check_box_outline_blank"
                onClick={this.handleCheckBox}
              >
                check_box_outline_blank
              </i>
            </button>
          )}
          {this.state.isTaskClick ? (
            <button
              className="button-tasks"
              onClick={this.handleTaskButton}
              name={taskId}
              style={this.completeStyling(complete, priority)}
            >
              <h6 className="task-title">
                {task}
                <i className="small material-icons right arrow">
                  arrow_drop_up
                </i>
              </h6>
            </button>
          ) : (
            <button
              className="button-tasks"
              onClick={this.handleClick}
              name={taskId}
              style={this.completeStyling(complete, priority)}
            >
              <h6 className="task-title">
                {task}
                <i className="small material-icons right arrow">
                  arrow_drop_down
                </i>
              </h6>
            </button>
          )}
          <button
            id="delete-button"
            className="btn-large"
            onClick={this.handleDelete}
          >
            <i className="large material-icons delete">delete</i>
          </button>
        </li>
      </div>
    )
  }
  render() {
    const taskId = this.props.tasks.id
    const task = this.props.tasks.Tasks

    return (
      <>
        {this.renderTasksLists(task, taskId)}
        {this.state.showDetails && <CardPanel tasks={this.props.tasks} />}
      </>
    )
  }
}

function mapstateprops(globalState) {
  return {
    view: globalState.viewForms,
  }
}

export default connect(mapstateprops)(Tasks)
