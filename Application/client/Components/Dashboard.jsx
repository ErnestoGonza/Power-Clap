import React, { useState, useContext, useEffect } from 'react';
import { GlobalContext } from '../Context/GlobalState.jsx';
import { Link, Route, Routes } from 'react-router-dom';
import ProjectDisplay from './ProjectDisplay.jsx';
const Dashboard = () => {
  const [username, setUsername] = useState(null);
  const [projects, setProjects] = useState([]);
  const [currentProject, setCurrentProject] = useState(null);
  const requestOption = {
    credentials: 'include',
  };

  const filterTasks = async (projectName) => {
    //make func to pull only tasks that match the projectName
    // fetch('http://localhost:3000/tasks');
    const matchProjectName = projectName.target.innerText;

    console.log('This is projectName', matchProjectName);

    let projectObj;
    //grap all projects and filter to only include project with matching projectName
    await fetch('http://localhost:3000/userinfo/projects', requestOption)
      .then((res) => res.json())
      .then((data) => {
        console.log('data from /userinfo/projects', data);
        projectObj = data.filter(
          (projects) => projects.projectName === matchProjectName
        );
      })
      .catch((err) =>
        console.log('ERR in /userinfo/projects fetch request', err)
      );
    console.log('This is the projectobj inside filterTasks func: ', projectObj);
    setCurrentProject(projectObj._id);
    const projectTasks = [];
    await fetch('http://localhost:3000/tasks', requestOption)
      .then((res) => res.json())
      .then((data) => {
        console.log('This is retrieved task information: ', data);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    console.log('hello');
    fetch('http://localhost:3000/userinfo', requestOption)
      .then((res) => res.json())
      .then((data) => {
        console.log('DATA FROM FIRST FETCH REQUEST IN DASHBOARD:', data);
        setUsername(data);
      })
      .catch((err) => console.log('ERR in /userinfo fetch request', err));

    if (!projects.length) {
      fetch('http://localhost:3000/userinfo/projects', requestOption)
        .then((res) => res.json())
        .then((data) => {
          console.log('data from /userinfo/projects', data);
          const buttonElements = [];
          data.forEach((projectObj, index) => {
            buttonElements.push(
              <button
                className="createBtns"
                key={index}
                onClick={(projectid = projectObj.projectName) =>
                  filterTasks(projectid)
                }
              >
                {projectObj.projectName}
              </button>
            );
          });
          setProjects(buttonElements);
        })
        .catch((err) =>
          console.log('ERR in /userinfo/projects fetch request', err)
        );
    }
  }, []);

  return (
    <>
      <div className="project-selector">
        <h2>Please Select A Project</h2>
        <div className="button-filter">{projects}</div>
      </div>
      <section className="taskboard">
        <ProjectDisplay currentProject={currentProject} />
      </section>
    </>
  );
};

export default Dashboard;
