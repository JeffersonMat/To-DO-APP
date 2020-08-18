import React from "react"
import { connect } from "react-redux"
import { deleteTask, updateTask, viewDescription } from "../actions/index"
import { removeTask, getTask } from "../apis/api"

import DescriptionTask from "./DescriptionTask"
import PriorityTasks from "./PriorityTasks"
import CompleteTasks from "./CompleteTasks"

class Tasks extends React.Component {
  state = {
    swapArrows: false,
    showDeleteButton: false,
    showDetails: false,
    isTaskClick: false,
    swapArrows: true,
  }

  handleClick = (e) => {
    e.preventDefault()
    this.setState({
      showDeleteButton: true,
      showDetails: true,
      isTaskClick: true,
      isClick: true,
      swapArrows: false,
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
      swapArrows: true,
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
      case "Urgent":
        return { background: "#d50000", color: "#fff" }

      case "Hurry Up":
        return { background: "#ffa726", color: "#fff" }

      case "Can Chill":
        return { background: "", color: "black" }
    }
  }

  renderTasksLists = (task, taskId) => {
    const complete = this.props.tasks.Completed
    const priority = this.props.tasks.Priority
    return (
      <div className="task-container">
        <li key={this.props.tasks.id} style={{ listStyleType: "none" }}>
          {this.state.isTaskClick ? (
            <button
              className="buttonDeets"
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
              className="buttonDeets"
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
        {this.state.showDetails && (
          <DescriptionTask tasks={this.props.tasks} view={this.props.view} />
        )}

        {this.state.showDetails && <PriorityTasks tasks={this.props.tasks} />}
        {this.state.showDetails && <CompleteTasks tasks={this.props.tasks} />}
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
