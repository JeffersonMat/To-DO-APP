import React from "react"
import { editTask } from "../apis/api"
import { updateTask } from "../actions/index"
import { connect } from "react-redux"

class FormDescription extends React.Component {
  state = {
    description: "",
    showForm: false,
  }

  handleChange = (event) => {
    event.preventDefault()
    const value = event.target.value
    this.setState({ [event.target.name]: value })
  }

  handleSubmit = (e) => {   
    e.preventDefault()
   const newTask = {
      id: this.props.task.id,
      Tasks: this.props.task.Tasks,
      Description: this.state.description,
      Priority: this.props.task.Priority,
      Completed: this.props.task.Completed,
    }

    const id = this.props.task.id

    editTask(id, this.state.description).then(() => {
      this.props.dispatch(updateTask(newTask))
    })

    this.setState({ showForm: true })
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
            onKeyPress={(e)=>{e.onKeyPress === 'Enter' && e.preventDefault}}
          />
          <button type="submit" onKeyPress={(e)=>{ e.onKeyPress==='Enter' && e.preventDefault()}}>
           
            <i class="material-icons center">send</i>
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
