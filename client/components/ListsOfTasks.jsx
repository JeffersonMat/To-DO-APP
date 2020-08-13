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
    swapArrows:false,
  
   
  };

  handleClick = (e) => {
   
    this.setState({
      showDetails: true,
      showDeleteButton: true,
      isTaskClick: true,
      swapArrows:true,
      isClick:true,
      
      
    }) 
  }


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
  
    if(complete==='YES'){
      return {textDecoration:'line-through red', opacity:0.5, background:'black', color:'#fff'}
      }
  }

  renderTasksLists = (task, taskId, handleclick) => {
   const complete= this.props.tasks.Completed

    return (
      
    <div className="task-container">
      <li  key ={this.props.tasks.id} style={{listStyleType:"none"}} >
       {this.state.isTaskClick ? 
       <button className="buttonDeets" onClick={handleclick} name={taskId} style={this.completeStyling(complete)}>
       {task} <i class="small material-icons right">arrow_drop_up</i>
      </button> 
      :
       <button className="buttonDeets" onClick={handleclick} name={taskId} style={this.completeStyling(complete)}>
       {task} <i class="small material-icons right">arrow_drop_down</i>
      </button> 
  }   
        <button id="delete-button" className="btn-large" onClick={this.handleDelete}><i className="large material-icons delete">delete</i></button>
       </li>
       </div>
       
    );
  };

  renderTasksDescription = (description, showtextfield) => {
    return (
      <li style={{listStyle:'none'}}>
            
             <h5>Task Description</h5>
             <p>{description}</p>
             <button className="btn-floating btn-small waves-effect waves-light description-btn" onClick={showtextfield}><i class="small material-icons ">add</i></button>
      </li>
    );
  };

  renderPriorityStatus = (priority) => {
    const isClick = this.state.isClick;

    return (
      <>
        <li style={{listStyle:'none'}}>
          {/* <button className="description-buttons"  onClick={this.handlePriorityButton}> */}   
          <h5> Priority: {priority}<button className="btn-floating btn-small waves-effect waves-light priority-btn" onClick={this.handlePriorityButton}><i class="small material-icons ">add</i></button></h5>
        </li>
        {isClick ? (
          <></>
        ) : (
          <>
          
          
              <button
                className="btn-floating btn-small waves-effect waves-light priority-buttons"
                name="Urgent"
           
                type="submit"
                onClick={this.handlePriority}
              ><i className="small material-icons ">priority_high</i>
                </button>
     
                
              
              <button
                className=" btn-floating btn-small waves-effect waves-light priority-buttons"
                name="Hurry Up"
            
                type="submit"
                onClick={this.handlePriority}
              >
                {/* <i className="small material-icons ">low_priority</i> */}
              </button>
                
             <button
                className="btn-floating btn-small waves-effect waves-light priority-buttons"
                name="Can Chill"  
                type="submit"       
                onClick={this.handlePriority}
                >
                <i className="small material-icons">low_priority</i>
                </button>
           
       
          </>
        )}
      </>
    );
  };


 

  renderCompletedStatus = (completed) => {
    const isCompleteClick = this.state.isCompleteClick;

    return (
      <>
        <li style={{listStyle:'none'}}>
          {/* <button className="description-buttons" onClick={this.handleCompleteButton}>
           Is completed? {completed}
          </button> */}
          <h5> Is Completed: {completed}<button className="btn-floating btn-small waves-effect waves-light priority-btn" onClick={this.handleCompleteButton}><i className="small material-icons ">add</i></button></h5>

        </li>
        {isCompleteClick && (
          <>
    
              <button
                className="btn complete-buttons"
                name="YES"
                value="YES"
                type="submit"
                onClick={this.handleComplete}
              >
                <i className="small material-icons">done</i>

              </button>
          
          {/* btn-floating btn-small waves-effect waves-light */}
   
              <button
                className="btn complete-buttons "
                name="NOT YET"
                value="NO"
                type="submit"
                onClick={this.handleComplete}
              >
                <i className="small material-icons done-icone">done</i>
             </button>
              
   
            <></>
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
      <ul className="unordered-tag">
        {this.state.isTaskClick
          ? this.renderTasksLists(task, taskId, this.handleTaskButton)
          : this.renderTasksLists(task, taskId, this.handleClick)}
        {/* {!this.state.showDeleteButton && (
          <button id="delete-button" onClick={this.handleDelete}>
            Delete
          </button>
        )} */}

        {this.state.showDetails ? (
          <ul className="unordered-tag">
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
