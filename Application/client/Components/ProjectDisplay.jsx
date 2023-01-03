import React from 'react';
import { useState, useEffect } from 'react';

import TaskDisplay from './TaskDisplay.jsx';


const ProjectDisplay = props => {

  const [task, setTask] = useState([]);
  const [changed, setChanged] = useState([]);
  const [projectId, setProjectId] = useState(null);

  //useEffect will fetch the task cards from backend and update the state?
  useEffect(() => {
    const url = 'http://localhost:3000/read/task';
    // console.log('how many times is useEffect fired?')
    if (!task.length) {
      fetch(url)
        .then(res => res.json())
        .then(data => {
          // console.log(data);
          //[[{},{},{}]]
          setTask(task => [...task, ...data])
          
        })
        .catch(err => console.log(err))
      // console.log('what is out state for task now? ', task);
    }
  }, [task]);


  //handleSubmit is going to handle creating new task card
  const handleSubmit = e => {
    e.preventDefault();

    const taskInfo = {
      project: '63b0c014072cf2ff4951654d',
      description: e.target.description.value,
      responsibleBy: e.target.responsible.value,
      startDate: e.target.dateStarted.value,
      deadline: e.target.deadline.value,
      stage: 1,
    }
    // console.log(taskInfo);

    const url = 'http://localhost:3000/create/task?' + new URLSearchParams(taskInfo);
    const requestOption = {
      method: 'POST'
    }
    fetch(url, requestOption)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setTask(task => [...task, data]);
      })
      .catch(err => console.log(err))
  }
  

  //handleClick is for each child task card to delete
  const handleClick = e => {
    // console.log('Is handleClick fired?');
    // console.log('e.target.: ', e.target.value);
    const url = 'http://localhost:3000/delete/task';
    const requestOption = {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({id: e.target.value}),
      credentials: 'include',
    }
    fetch(url, requestOption)
    .then(res => res.json())
    .then(data => {
      // console.log(data);
      const copy = [...task].filter(el => el._id !== e.target.value);
      // console.log(copy);
      setTask(copy);
    })
    .catch(err => console.log(err))
  }


  //stageClick will handle stage change for specific task
  const stageClick = e => {
    console.log('e.target.value: ', e.target.value);
    // console.log('e.target.stage', e.target.stage);
    const url = 'http://localhost:3000/patch/task';
    const requestOption = {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({data: e.target.value}),
      credentials: 'include',
    }
    fetch(url, requestOption)
    .then(res => res.json())
    .then(data => {
      console.log('current stage: ', data.stage);
      // setTask(...task);
      window.location.reload();    

      setChanged(true);
    })
    .catch(err => console.log(err))

  }
  
  // const tasksArr = [];
  // for (let i = 0; i < task.length; i++) {
  //   tasksArr.push(<TaskDisplay key={`task${i}`} info={task[i]} handleClick={handleClick} stageClick={stageClick}/>)
  // }

  const toDoArr = [];
  const inProgress = [];
  const toVerify = [];
  const completed = [];

  // populating render arrays
  for (let i = 0; i < task.length; i++) {
    console.log('test');
    if (task[i].stage == 1) {
      toDoArr.push(<TaskDisplay key={`task${i}`} info={task[i]} handleClick={handleClick} stageClick={stageClick}/>)
    } else if (task[i].stage == 2) {
      inProgress.push(<TaskDisplay key={`task${i}`} info={task[i]} handleClick={handleClick} stageClick={stageClick}/>)
    } else if (task[i].stage == 3) {
      toVerify.push(<TaskDisplay key={`task${i}`} info={task[i]} handleClick={handleClick} stageClick={stageClick}/>)
    } else if (task[i].stage == 4 || task[i].stage > 4) {
      completed.push(<TaskDisplay key={`task${i}`} info={task[i]} handleClick={handleClick} stageClick={stageClick}/>)
    }
  }
  

  return (
    <>
      <div className='form-container'>Create Task Form
        <form className='form' onSubmit={handleSubmit}>
          <label htmlFor='members' id='members' name='members'>Members: </label>
          <input type='text' id='members' name='members' placeholder='members'></input><br />
          <label htmlFor='description' id='description' name='description'>Task Description: </label>
          <input type='text' id='description' name='description' placeholder='description'></input><br />
          <label htmlFor='dateStarted' id='dateStarted' name='dateStarted'>Date Started: </label>
          <input type='text' id='dateStarted' name='dateStarted' placeholder='date'></input><br />
          <label htmlFor='deadline' id='deadline' name='deadline'>Deadline: </label>
          <input type='text' id='deadline' name='deadline' placeholder='deadline'></input><br />
          <label htmlFor='Responsible' id='responsible' name='responsible'>Responsible By: </label>
          <input type='text' id='responsible' name='responsible' placeholder='responsible'></input><br />
          <input type="submit" value="Submit"></input>
        </form>
      </div>

      <div className='column-container'>
        <div className='column1'>Column1: To Do
          {toDoArr}
        </div>

        <div className='column2'>Column2: In Progress
          {inProgress}
        </div>
         
        <div className='column3'>Column3: To Verify
          {toVerify}
        </div>
          
        <div className='column4'>Column4: Completed 
          {completed}
        </div>
          
      </div>
    </>
  )
}

export default ProjectDisplay;