import React from "react"
import { connect } from "react-redux"


import DescriptionTask from "./DescriptionTask"
import PriorityTasks from "./PriorityTasks"



class CardPanel extends React.Component{


    render() {
        
        return (
          <div className="card-panel content">
            <DescriptionTask tasks={this.props.tasks} view={this.props.view} />
              <PriorityTasks tasks={this.props.tasks} />
          </div>
        )
    }
}


export default connect()(CardPanel)