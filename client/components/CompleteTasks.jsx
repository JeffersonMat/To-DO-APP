import React from "react"
import { editTaskComplete } from "../apis/complete"
import { updateTask } from "../actions/index"
import { connect } from "react-redux"

class CompleteTasks extends React.Component {
  state = {
    isDescriptionClicked: false,
    complete: false,
    isCompleteClick: false,
  }

  handleCompleteButton = (e) => {
    this.setState({ isCompleteClick: true })
  }

  handleCompleteClose = () => {
    this.setState({ isCompleteClick: false })
  }

  handleComplete = (event) => {
    event.preventDefault()
    const name = event.target.name
    const id = this.props.tasks.id

    //@updateTask is expecting an object
    //@updateTask is only updating Description is this case, doesn't update the whole task
    //Id needs to remain unchange
    
   
     const newTask = {
      id: this.props.tasks.id,
      Tasks: this.props.tasks.Tasks,
      Description: this.props.tasks.Description,
      Priority: this.props.tasks.Priority,
      Completed: name,
    }

    this.setState({ isCompleteClick: false })
    editTaskComplete(id, name).then(() => {
      this.props.dispatch(updateTask(newTask))
    })
  }

  renderCompletedStatus = (completed) => {
    const isCompleteClick = this.state.isCompleteClick

    return (
      <>
        <li style={{ listStyle: "none" }}>
          <h5>
            Completed? {completed}
            {!isCompleteClick ? (
              <button
                className="btn-floating btn-small waves-effect waves-light priority-btn right"
                onClick={this.handleCompleteButton}
              >
                <i className="small material-icons ">edit</i>
              </button>
            ) : (
              <button
                className="btn-floating btn-small waves-effect waves-light priority-btn right"
                onClick={this.handleCompleteClose}
              >
                <i className="small material-icons ">close</i>
              </button>
            )}
          </h5>
        </li>
        {isCompleteClick && (
          <>
            <button
              className="btn-small complete-buttons"
              name="YES"
              value="YES"
              onClick={this.handleComplete}
            >
              <i className="small material-icons">done</i>
            </button>

            <button
              className="btn-small complete-buttons "
              name="NOT YET"
              value="NO"
              onClick={this.handleComplete}
            >
              <i className="small material-icons done-icone">close</i>
            </button>

            <></>
          </>
        )}
      </>
    )
  }

  render() {
    const completed = this.props.tasks.Completed

    return <>{this.renderCompletedStatus(completed)}</>
  }
}

export default connect()(CompleteTasks)
