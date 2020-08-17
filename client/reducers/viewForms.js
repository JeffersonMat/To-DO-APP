const initialstate= false

import{ VIEW_DESCRIPTION } from '../actions/index'

const reducer = (state=initialstate, action)=>{
    
    switch(action.type){

       case VIEW_DESCRIPTION:
       return action.type

       default:
        return state;
    }

}

export default reducer