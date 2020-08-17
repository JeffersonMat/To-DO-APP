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
          <h5 className="priority-title">
            Priority: {priority}
           {!isClick ? <button
              className="btn-floating btn-small waves-effect waves-light priority-btn right"
              onClick={this.handlePriorityButton}
            >
             <i className="small material-icons ">edit</i> 
            </button>
            :
            <button
              className="btn-floating btn-small waves-effect waves-light priority-btn right"
              onClick={this.handlePriorityClose}
            >
             <i className="small material-icons ">close</i> 
            </button>
            }
          </h5>
        </li>
        {isClick ?     
              <>
            <button
              className="btn waves-effect waves-light priority-buttons"
              name="Urgent"
              onClick={this.handlePriority}
            >
              <i className="large material-icons icons-priority">sentiment_neutral</i>
            </button>

            <button
              className="btn waves-effect waves-light priority-buttons"
              name="Hurry Up"
              onClick={this.handlePriority}
            >
               <i className="large material-icons icons-priority ">sentiment_satisfied</i>
            </button>

            <button
              className="btn waves-effect waves-light priority-buttons"
              name="Can Chill"
              onClick={this.handlePriority}
            >
                <i className="large material-icons icons-priority">
                sentiment_very_satisfied
                </i>
            </button>
          </>
          :
          <>
          </>
        }
      </>
    )
  }

  render() {
    const priority = this.props.tasks.Priority
    return <>{this.renderPriorityStatus(priority)}</>
  }
}
export default connect()(PriorityTasks)
