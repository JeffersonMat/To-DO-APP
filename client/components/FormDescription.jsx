import React from "react"
import { editTaskDescription } from "../apis/api"
import { updateTask} from "../actions/index"
import { connect } from "react-redux"

class FormDescription extends React.Component {
  state = {
    description: "",
    showForm: false,
  }

  handleChange = (e) => {
    if(e.Key==='Enter'){
      e.preventDefault()
      }
    const value = event.target.value
    this.setState({ [event.target.name]: value })
  }

  handleSubmit = (e) => {

    if(e.Key==='Enter'){
    e.preventDefault()
    }
    const newTask = {
      id: this.props.task.id,
      Tasks: this.props.task.Tasks,
      Description: this.state.description,
      Priority: this.props.task.Priority,
      Completed: this.props.task.Completed,
    }

    const id = this.props.task.id
    this.setState({ showForm:true })
    editTaskDescription(id, this.state.description).then(() => {
      this.props.dispatch(updateTask(newTask))
    })
   
    
  }

  renderForm = (handlesubmit, description, handlechange) => {
    return (
      <>
        <form className="description-form" onSubmit={handlesubmit}>
          <input
            type="text"
            name="description"
            className="text-field"
            placeholder="Add a description here"
            defaultValue={description}
            onChange={handlechange}
            onKeyPress={(e) => {
              e.Key === "Enter" && e.preventDefault
            }}
          />

          <button
            className="btn-floating btn-large waves-effect waves-light pulse "
            type="submit"
            onKeyPress={(e) => {
              e.Key === "Enter" && e.preventDefault()
            }}
          >
            <i className="material-icons ">add</i>
          </button>
        </form>
      </>
    )
  }

  render() {
    const showForm = this.state.showForm
    return (
      <>
        {!showForm &&
          this.renderForm(
            this.handleSubmit,
            this.state.description,
            this.handleChange
          )}
      </>
    )
  }
}

export default connect()(FormDescription)
