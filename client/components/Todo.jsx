import React from "react"
import { getTask } from "../apis/api"
import Form from "./Form"
import Tasks from "./Tasks"
import { receivedTask } from "../actions/index"
import { connect } from "react-redux"

class Todo extends React.Component {
  state = {
    showForm: false,
    isTaskClick: false,
    isClick: false,
  }
  componentDidMount() {
    getTask().then((task) => {
      return this.props.dispatch(receivedTask(task))
    })
  }

  render() {
    return (
      <>
        <h2 className="todo-header">Task Manager</h2>
        {this.props.tasks.map((task) => (
          <Tasks key={task.id} tasks={task} />
        ))}

        <Form task={this.props.tasks} />
      </>
    )
  }
}
function mapstateprops(globalState) {
  return {
    tasks: globalState.tasks,
    view: globalState.viewForms,
  }
}

export default connect(mapstateprops)(Todo)
