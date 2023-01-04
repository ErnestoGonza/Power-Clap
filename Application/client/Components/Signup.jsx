import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router';

const Signup = ({ toggleForm }) => {

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

  const navigate = useNavigate();  


  const handleSignup = (e) => {
    e.preventDefault();
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
        fetch('http://localhost:3000/user/signup', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(userInfo),
          withCredentials: true,
        })
        .then((response) => response.json())
        .then((data) => {
          if (data.username) navigate('/dashboard');
          else setMessage('Username is Taken');
        })
        .catch(err => console.log(err))
    }
  }
  
  
  return (
    <div>
      <form onSubmit={handleSignup}>
        <label htmlFor='username'>Username: </label>
          <input name='username' placeholder='username' value={username} onChange={usernameOnChange} />
    
        <label htmlFor='password'>Password: </label>
          <input name='password' type='password' placeholder='password' value={password} onChange={passwordOnChange} />
    
        <p style={{color: 'red'}}>{message}</p>
        <button type="submit">Sign Up</button>
      </ form> 
      <div className="HaveAccount">
        Already have an account? 
        <a style={{color: 'Green', textDecoration: 'underline'}} 
                        onClick={() => toggleForm('login')}>
                        Login
        </a>
      </div>
    </div>
  )
}

export default Signup;
