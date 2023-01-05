import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router';

// Customized the useInput function to save user input on the login/signup page
const Login = ({ toggleForm }) => {  

  const navigate = useNavigate();
  
  const useInput = init => {
    const [ value, setValue ] = useState(init);
    const onChange = e => {
      setValue(e.target.value);
    };
    return [ value, onChange ];
  }
  const [ username, usernameOnChange ] = useInput('');
  const [ password, passwordOnChange ] = useInput('');
  const [ message, setMessage ] = useState('');
  
  // handleLogin will send user input to the backend route set up for user authentication
  const handleLogin = (e) => {
    e.preventDefault();
    // userName and password are what the user put in the form
    // Store username and password in a userInfo object
    const userInfo = {
      username: username,
      password: password,
    }

    // Make sure username or password not missing
    if (username === '' || password === '') {
      setMessage('Username or password missing');
      return;
    } else {
      fetch('http://localhost:3000/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userInfo),
        // credentials: 'include',
      })
        .then((response) => response.json())
        .then(({ success }) => {
          if (success) {
            navigate('/dashboard');
          }
          else setMessage('Username or password wrong');
        })
        .catch(err => console.log(err))
    }
  }

  return (
    <div className="loginForm">
      <form onSubmit={handleLogin}>
        <label htmlFor='username'>Username: </label>
          <input name='username' placeholder='username' value={username} onChange={usernameOnChange} />

        <label htmlFor='password'>Password: </label>
          <input name='password' type='password' placeholder='password' value={password} onChange={passwordOnChange} />

        <p style={{color: 'red'}}>{message}</p>
        <button type="submit" >Log In</button>
      </form>
      <div className="NeedAccount">
        Need an Account? 
        <a style={{color: 'green', textDecoration: 'underline'}} 
            onClick={() => {
              toggleForm('signup')
        }}>
            Sign Up
        </a>
      </div>
    </div>
    )
  }
  
  {/* <input id='username' type='text' placeholder='Username' onChange= {() => username = document.querySelector('#username').value} ></input>
  <input id='password' type='text' placeholder='Password' onChange= {() => password = document.querySelector('#password').value} ></input>
  <button onClick={() => handleLogin()}>Log In</button>
  </div> */}

export default Login;


{/* <GoogleLogin
        clientId={clientId}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        isSignedIn={true}
      /> */}

//handleGoogle send request to backend for google Oauth
      // const handleGoogle = () => {
        // fetch('/auth/google', {
        //   method: 'GET',
        //   credentials: 'include'
        // })
        // .then(response => response.json())
        // .then(data => {
        //   // do something with the data
        //   console.log('OAuth data: ', data);
        // })
        // .catch(error => {
        //   console.error('OAuth error:', error);
        // })
        // console.log('This should send request for google Oauth');
        
        // window.location.replace("/auth/google");
      // }