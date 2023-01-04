import React, { useState } from 'react';
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import { useNavigate } from 'react-router';

const LoginContainer = () => {
    const [currentForm, setCurrentForm] = useState('login')

    const toggleForm = (formName) => {
      setCurrentForm(formName)
    }

    // const useInput = init => {
    //   const [ value, setValue ] = useState(init);
    //   const onChange = e => {
    //     setValue(e.target.value);
    //   };
    //   return [ value, onChange ];
    // }

    return (
          <div className="loginContainer">
            {
              currentForm === 'login' ? 
              <Login 
                toggleForm={toggleForm}
                // useInput = {useInput}
                // navigate = {navigate}
              /> : 
              <Signup 
                toggleForm={toggleForm}
                // navigate = {navigate}
                // useInput={useInput}
              />
            }
          </div>
    )
}

export default LoginContainer