import React from "react";
import FormDescription from "./FormDescription";
import { removeTask, getTask } from "../apis/api";
import { editTaskPriority } from "../apis/priority";
import { editTaskComplete } from "../apis/complete";
import { deleteTask, updateTask } from "../actions/index";
import { connect } from "react-redux";

class ListOfTasks extends React.Component {
  state = {
    showDetails: false,
    isDescriptionClicked: false,
    showDeleteButton: false,
    complete: false,
    isClick: false,
    isCompleteClick: false,
    isTaskClick: false,
    styleComplete:false,
  };

  handleClick = (e) => {
    e.preventDefault();
    this.setState({
      showDetails: true,
      showDeleteButton: true,
      isTaskClick: true,
    });
  };

  showTextField = (e) => {
    e.preventDefault();
    this.setState({ isDescriptionClicked: true });
  };

  hideTextField = (e) => {
    e.preventDefault(), this.setState({ isDescriptionClicked: false });
  };

  handleDelete = (event) => {
    event.preventDefault();
    const id = this.props.tasks.id;

    removeTask(id)
      .then(() => {
        this.props.dispatch(deleteTask(id));
      })
      .then(() => {
      return this.props.dispatch(updateTask(this.props.tasks));
      })
      .then(()=>{
         this.props.dispatch(getTask())})
         .then((task) => {
         return this.props.dispatch(receivedTask(task))
       
       })
    
     
     
  }

  handlePriorityButton = (e) => {
    e.preventDefault();
    this.setState({ isClick: false });
  };

  handleCompleteButton = (e) => {
    e.preventDefault();
    this.setState({ isCompleteClick: true });
  };

  handleTaskButton = (e) => {
    e.preventDefault();
    this.setState({
      isTaskClick: false,
      showDeleteButton: false,
      showDetails: false,
    });
  };

  handlePriority = (event) => {
    const name = event.target.name;
    const id = this.props.tasks.id;

    const newTask = {
      id: this.props.tasks.id,
      Tasks: this.props.tasks.Tasks,
      Description: this.props.tasks.Description,
      Priority: name,
      Completed: this.props.tasks.Completed,
    };

    this.setState({ isClick: true });
    editTaskPriority(id, name).then(() => {
      this.props.dispatch(updateTask(newTask));
    });
  };

  handleComplete = (event) => {
    event.preventDefault();
    const name = event.target.name;
    const id = this.props.tasks.id;

   if(name==='Done'){
     this.setState({
       styleComplete:true,
     })
   }

    const newTask = {
      id: this.props.tasks.id,
      Tasks: this.props.tasks.Tasks,
      Description: this.props.tasks.Description,
      Priority: this.props.tasks.Priority,
      Completed: name,
    };

    this.setState({ isCompleteClick: false });
    editTaskComplete(id, name).then(() => {
      this.props.dispatch(updateTask(newTask));
    });
  };

  completeStyling =(complete) => {
  
    if(complete==='Done'){
      return {textDecoration:'line-through black'}
      }
  }

  renderTasksLists = (task, taskId, handleclick) => {
   const complete= this.props.tasks.Completed

    return (
      
   
      <li   key ={this.props.tasks.id} style={{listStyleType:"none"}} >
        <button className="buttonDeets" onClick={handleclick} name={taskId} style={this.completeStyling(complete)}>
          {task}
        </button>
       </li>
    );
  };

  renderTasksDescription = (description, showtextfield) => {
    return (
      <li>
        <button id="buttonDeets description-tittle" onClick={showtextfield}>
          Description:{description}
        </button>
      </li>
    );
  };

  renderPriorityStatus = (priority) => {
    const isClick = this.state.isClick;

    return (
      <>
        <li>
          <button onClick={this.handlePriorityButton}>
            Priority:{priority}
          </button>
        </li>
        {isClick ? (
          <></>
        ) : (
          <>
            <label>
              High
              <input
                name="Urgent"
                value="submit"
                type="radio"
                onClick={this.handlePriority}
              />
            </label>
            <label>
              Medium
              <input
                name="Need to do it soon"
                value="submit"
                type="radio"
                onClick={this.handlePriority}
              />
            </label>
            <label>
              Low
              <input
                name="Not much pressure"
                value="submit"
                type="radio"
                onClick={this.handlePriority}
              />
            </label>
          </>
        )}
      </>
    );
  };


 

  renderCompletedStatus = (completed) => {
    const isCompleteClick = this.state.isCompleteClick;

    return (
      <>
        <li>
          <button onClick={this.handleCompleteButton}>
            Completed:{completed}
          </button>
        </li>
        {isCompleteClick && (
          <>
            <label>
              Yes
              <input
                name="Done"
                value="submit"
                type="radio"
                onClick={this.handleComplete}
              />
            </label>
            <label>
              No
              <input
                name="Not Yet"
                value="submit"
                type="radio"
                onClick={this.handleComplete}
              />
            </label>
            :<></>
          </>
        )}
      </>
    );
  };

  render() {
    const taskId = this.props.tasks.id;
    const task = this.props.tasks.Tasks;
    const description = this.props.tasks.Description;
    const priority = this.props.tasks.Priority;
    const completed = this.props.tasks.Completed;

    return (
      <ul>
        {this.state.isTaskClick
          ? this.renderTasksLists(task, taskId, this.handleTaskButton)
          : this.renderTasksLists(task, taskId, this.handleClick)}
        {!this.state.showDeleteButton && (
          <button id="delete-button" onClick={this.handleDelete}>
            Delete
          </button>
        )}

        {this.state.showDetails ? (
          <ul>
            {this.state.isDescriptionClicked
              ? this.renderTasksDescription(description, this.hideTextField)
              : this.renderTasksDescription(description, this.showTextField)}
            {this.state.isDescriptionClicked && (
              <FormDescription task={this.props.tasks} />
            )}
            {this.renderPriorityStatus(priority)}
            {this.renderCompletedStatus(completed)}
          </ul>
        ) : (
          <></>
        )}
      </ul>
    );
  }
}

export default connect()(ListOfTasks);
