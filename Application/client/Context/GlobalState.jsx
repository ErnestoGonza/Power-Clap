/***** GlobalContext.jsx *****/
import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer'


const initialState = {
  username: null,
};

// this is the object you import in any component to access state
export const GlobalContext = createContext(initialState);

// this is the provider you import in App.jsx to wrap main content in
export const GlobalProvider = ({ children }) => {
  // set up the dispatch function using your initial state and the reducer
  const [state, dispatch] = useReducer(AppReducer, initialState);


  const toggleDarkMode = (checked) => {
    dispatch({
      type: 'Toggle_DARK_MODE',
      payload: checked,
    })
  }

  const setUsername = (username) => {
    dispatch({
      type: 'SET_USERNAME',
      payload: username,
    });
  }

  const values = {
    ...state,
    toggleDarkMode,
    setUsername,
  };

  return (
    <GlobalContext.Provider value={values}>
      {children}
    </GlobalContext.Provider>
  )
}