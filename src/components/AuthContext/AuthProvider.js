"use client"
import React, { createContext, useReducer }  from 'react'
import AuthReducer from './AuthReducer'



// Creating context with undefined values allow developer to make more precise decisions, and improve
// the developer experience while implementing it.
export const AuthContext = createContext({
  setAuthenticated: () => {},
  isAuthenticated: null,
  user: undefined,
  login: () => { },
  logout: () => { },
  cookieFlag: undefined,
  validateStatus: () => {}
});


// The state will be destructured and this also helps developer experience.
const initialState = {
  isAuthenticated: null,
  user: undefined,
  cookieFlag: undefined
};


// This component will wrap the app so that this context will be used in entire application.
export const AuthProvider = (props) => {
  const [state, dispatchAuth] = useReducer(AuthReducer, initialState);
  
  const ValidateStatus = (response) => {
    switch (response.data.statusCode) {
      case 403:
        throw new Error(response.data.message);
        break;
    
      default:
        break;
    }
  }

  const LoginUser = (userData) => {
    dispatchAuth({ type: "LOGIN", payload: userData });
  }

  const LogoutUser = () => {
    dispatchAuth({ type: "LOGOUT" });
  }

  const SetAuthenticated = () => {
    dispatchAuth({type: "AUTHENTICATE", payload: true})
  }

  return <AuthContext.Provider value={{ ...state, login: LoginUser, logout: LogoutUser, setAuthenticated: SetAuthenticated, validateStatus: ValidateStatus }}>
    {props.children}
  </AuthContext.Provider>

}
