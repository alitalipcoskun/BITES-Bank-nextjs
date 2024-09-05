"use client"
import React, { createContext, useReducer }  from 'react'
import AuthReducer from './AuthReducer'



// Creating context with undefined values allow developer to make more precise decisions, and improve
// the developer experience while implementing it.
export const AuthContext = createContext({
  isAuthenticated: null,
  user: undefined,
  login: () => { },
  logout: () => { },
});


// The state will be destructured and this also helps developer experience.
const initialState = {
  isAuthenticated: null,
  user: null
};


// This component will wrap the app so that this context will be used in entire application.
export const AuthProvider = (props) => {
  const [state, dispatchAuth] = useReducer(AuthReducer, initialState);

  const LoginUser = (userData) => {
    dispatchAuth({ type: "LOGIN", payload: userData });
  }

  const LogoutUser = () => {
    dispatchAuth({ type: "LOGOUT" });
  }

  return <AuthContext.Provider value={{ ...state, login: LoginUser, logout: LogoutUser }}>
    {props.children}
  </AuthContext.Provider>

}
