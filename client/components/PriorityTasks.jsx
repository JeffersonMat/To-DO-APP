import React from "react"
import { editTaskPriority } from "../apis/priority"
import { updateTask } from "../actions/index"
import { connect } from "react-redux"

class PriorityTasks extends React.Component {
  
    state = {
    showDetails: false,
    complete: false,
    isClick: false,
  }

  handlePriorityButton = (e) => {
    e.preventDefault()
    this.setState({ isClick: true })
  }
  handlePriorityClose = (e) => {
  this.setState({ isClick: false })
  }

  handlePriority = (event) => {
    event.preventDefault()
    const name = event.target.name
    const id = this.props.tasks.id

    const newTask = {
      id: this.props.tasks.id,
      Tasks: this.props.tasks.Tasks,
      Description: this.props.tasks.Description,
      Priority: name,
      Completed: this.props.tasks.Completed,
    }
    this.setState({ isClick: true })
    editTaskPriority(id, name).then(() => {
      this.props.dispatch(updateTask(newTask))
    })
  }

  renderPriorityStatus = (priority) => {
    const isClick = this.state.isClick

    return (
      <>
        <li style={{ listStyle: "none" }}>
          <h5 id="priority-title">
            Priority
            {!isClick ? (
              <button
                className="btn-floating btn-small waves-effect waves-light priority-btn right"
                onClick={this.handlePriorityButton}
              >
                <i className="small material-icons ">edit</i>
              </button>
            ) : (
              <button
                className="btn-floating btn-small waves-effect waves-light priority-btn right"
                onClick={this.handlePriorityClose}
              >
                <i className="small material-icons ">close</i>
              </button>
            )}
          </h5>
          <p>{priority}</p>
        </li>
        {isClick ? (
          <>
            <button
              className="btn waves-effect waves-light priority-buttons low"
              name="Low"
              onClick={this.handlePriority}
            >
           Low
            </button>

            <button
              className="btn waves-effect waves-light priority-buttons medium"
              name="Medium"
              onClick={this.handlePriority}
            >
            Medium
            </button>

            <button
              className="btn waves-effect waves-light priority-buttons high"
              name="High"
              onClick={this.handlePriority}
            >
            High
            </button>
          </>
        ) : (
          <></>
        )}
      </>
    )
  }

  render() {
    const priority = this.props.tasks.Priority
    return <>{this.renderPriorityStatus(priority)}</>
  }
}
export default connect()(PriorityTasks)
