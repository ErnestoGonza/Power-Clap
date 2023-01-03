import React, { useState, useContext, useEffect } from 'react';
import { GlobalContext } from '../Context/GlobalState.jsx';

const Dashboard = () => {
  const url = 'http://localhost:3000/userinfo';
  const [username, setUsername] = useState(null);
  const [projects, setProjects] = useState([]);
  const requestOption = {
    method: 'GET',
    credentials: 'include',
  }
  // if (username === null) {

  // }
  const projectUrl = 'http://localhost:3000/userinfo/projects';
  useEffect(() => {
    fetch(url, requestOption)
      .then((res) => res.json())
      .then((data) => {
        setUsername(data);
      });
    if (!projects.length) {
      fetch(projectUrl, requestOption)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setProjects(data);
        })
    }
  }, [])

  return (<>
    username: {username}<br />
    my projects: {JSON.stringify(projects)}
  </>);
}

export default Dashboard;