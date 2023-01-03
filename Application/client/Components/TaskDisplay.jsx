import React from 'react';


const TaskDisplay = props => {
  return (
    <div className='task-container'>
      <h5>Task Name: {props.info._id}</h5>
      <p>Description: {props.info.description}</p>
      <p>Date Started: {props.info.startDate}</p>
      <p>Deadline: {props.info.deadline}</p>    
      <p>Members: {props.info.responsibleBy}</p>
      <button onClick={props.stageClick} value={[props.info._id, props.info.stage]}>Change Stage</button>
      <button onClick={props.handleClick} value={props.info._id}>Delete task</button>  
    </div>
  )
}

export default TaskDisplay;