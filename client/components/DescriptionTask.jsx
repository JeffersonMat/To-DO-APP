import React from 'react'
import { connect } from 'react-redux'
import FormDescription from "./FormDescription"



class DescriptionTask extends React.Component{
  
    state ={
        isDescriptionClicked: false,
    }
    
      showTextField = (e) => {
        e.preventDefault()
        this.setState({ isDescriptionClicked: true })
      }
    
      hideTextField = (e) => {
        e.preventDefault()
      this.setState({ isDescriptionClicked: false })
      }
 
      renderTaskDescription =( showtextfield) => {
         
    return (
      <li style={{ listStyle: "none" }}>
        <h5>Task Description 
        {!this.state.isDescriptionClicked  ?  
        <button
          className="btn-floating btn-small waves-effect waves-light description-btn right"
          onClick={showtextfield}
        >
          <i className="small material-icons ">edit</i>
        </button>
         :
        <button
          className="btn-floating btn-small waves-effect waves-light description-btn right"
          onClick={showtextfield}
        >
          <i className="small material-icons ">close</i>
        </button>
      }
      
      
      </h5>
        <p>{this.props.tasks.Description}</p>
       
      </li>
    )
  }


  render() {

   console.log(this.props.view,'view');
    const display = this.state.isDescriptionClicked
   
    return(
         <>
        {display ?
          this.renderTaskDescription(this.hideTextField) :
          this.renderTaskDescription(this.showTextField)
        }
         {display && (
              <FormDescription task={this.props.tasks} />
            )}
       </>
     )
 } 
}

export default connect()(DescriptionTask)