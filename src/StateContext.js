import React, { createContext, useContext, useReducer } from 'react';

const StateContext = createContext();

export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

// Create a custom hook to access the state
export const useStateValue = () => useContext(StateContext);
