import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
// import { GoogleLogin } from '@leecheuk/react-google-login';
// import dotenv from 'dotenv'
// const clientId = '420343936370-qqafu353om02erpsii3lgujgoousm1iq.apps.googleusercontent.com';
// let env = dotenv.config();

// Customized the useInput function to save user input on the login/signup page
const useInput = init => {
  const [ value, setValue ] = useState(init);
  const onChange = e => {
    setValue(e.target.value);
  };
  return [ value, onChange ];
}

const Login = props => {

  const navigate = useNavigate();  

  const [ username, usernameOnChange ] = useInput('');
  const [ password, passwordOnChange ] = useInput('');

  const [ message, setMessage ] = useState('');

  // handleLogin will send user input to the backend route set up for user authentication
  const handleLogin = () => {
    //userName and password are what the user put in the form
    // console.log(username, password);

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
      // send username and password to backend route
      const url = 'http://localhost:3000/user/login';
      const requestOption = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(userInfo),
        // mode: 'no-cors',
        credentials: 'include',
      };
      fetch(url, requestOption)
        .then((response) => response.json())
        .then(({ success }) => {
          if (success) navigate('/dashboard');
          else setMessage('Username or password wrong');
        })
        .catch(err => console.log(err))
    

      // console.log('json', response.json());
      // console.log('no json', response);
      // // if (response.status === 401) {
      // if (!response.result.success) {
      //   setMessage('Username or password wrong');
      //   return;
      // } else {
      //   setMessage('');
      //   console.log('login successful');
      //   //need to redirect user to their dashboard page
      //   navigate('/dashboard')
      //   return;
      // }
    }
  }

  //handleSignup => should create new user information in database
  const handleSignup = async () => {
    // console.log(username, password);
    // Store username and password in a userInfo object
    const userInfo = {
      username: username,
      password: password,
    }

    //username and password are both required information
    if (username === '' || password === '') {
      setMessage('Username or password missing');
      return;
    } else {
      // send userName and password to backend route
      const url = 'http://localhost:3000/user/signup';
      const requestOption = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(userInfo),
        withCredentials: true,
      }
      const response = await fetch(url, requestOption);
    }
  }

  //handleGoogle send request to backend for google Oauth
  const handleGoogle = () => {
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
    
    window.location.replace("/auth/google");
  }

  // const onSuccess = (res) => {
  //   console.log("LOGIN SUCCESS! Current user: ", res.profileObj);
  // }

  // const onFailure = (res) => {
  //   console.log("LOGIN FAILED! res: ", res);
  // }

  return (
    <div>
      <p><label htmlFor='username'>Username: </label>
      <input name='username' placeholder='username' value={username} onChange={usernameOnChange} /></p>

      <p><label htmlFor='password'>Password: </label>
      <input name='password' type='password' placeholder='password' value={password} onChange={passwordOnChange} /></p>

      <p style={{color: 'red'}}>{message}</p>
      <button onClick={handleLogin}>Log In</button>
      <button onClick={handleSignup}>Sign Up</button>
      <p><button onClick={handleGoogle}>Login with Google</button></p>
      
    </div>
  )
}


export default Login;


{/* <GoogleLogin
        clientId={clientId}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        isSignedIn={true}
      /> */}