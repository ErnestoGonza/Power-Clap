import React, { useState, useContext } from 'react';
import { GlobalContext } from '../Context/GlobalState';

// Customized the useInput function to save user input on the login/signup page
const useInput = init => {
  const [value, setValue] = useState(init);
  const onChange = e => {
    setValue(e.target.value);
  };
  return [value, onChange];
}

const CreateProject = props => {

  const [projectName, projectNameOnChange] = useInput('');
  const [projectDescription, projectDescriptionOnChange] = useInput('');
  const [members, membersOnChange] = useInput('');

  const [message, setMessage] = useState('');

  const { username } = useContext(GlobalContext);

  const handleCreateProject = () => {
    // console.log('Do we have the user input we need?')
    //store all the project info into an object
    const projectInfo = {
      projectName,
      projectDescription,
      members: members.split(',').map(el => el.trim()),
    }

    // console.log(projectInfo);

    //make sure users put in the required infomation
    //members are not required because there will be at lease one member(the creator) for each project
    //!!!need to push the creator(the logged in user) into the members array at the backend
    if (projectName === '' || projectDescription === '') {
      setMessage('Project name and description are required');
      return;
    } else {
      //send projectInfo to the backend route /create/project
      const url = 'http://localhost:3000/create/project';
      const userUrl = 'http://localhost:3000/userinfo';
      fetch(userUrl, { method: 'GET', credentials: 'include' })
        .then((res) => res.json())
        .then((name) => {
          console.log(name);
          projectInfo.creator = name;
          const requestOption = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(projectInfo),
          }
          fetch(url, requestOption)
            .then(res => res.json())
            .then(data => {
              console.log(data)
            })
            .catch(err => console.log(err))
        })

    }
  }

  return (
    <div>

      <p><label htmlFor='projectName'>Project Name: </label>
        <input name='projectName' placeholder='Project Name' value={projectName} onChange={projectNameOnChange} /></p>

      <p><label htmlFor='projectDescription'>Project Description: </label>
        <textarea name='projectDescription' placeholder='Project Description' value={projectDescription} onChange={projectDescriptionOnChange} /></p>

      <p><label htmlFor='members'>Members: </label>
        <input name='members' placeholder='Separate members by comma' value={members} onChange={membersOnChange} /></p>

      <p style={{ color: 'red' }}>{message}</p>
      <p><button onClick={handleCreateProject}>Create a new project</button></p>

    </div>
  )
}


export default CreateProject;