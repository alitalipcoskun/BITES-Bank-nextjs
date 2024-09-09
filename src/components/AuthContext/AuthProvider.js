"use client"
import React, { createContext, useReducer, useContext }  from 'react'
import AuthReducer from './AuthReducer'
import Cookies from 'js-cookie';



// Creating context with undefined values allow developer to make more precise decisions, and improve
// the developer experience while implementing it.
export const AuthContext = createContext({
  setAuthenticated: () => {},
  isAuthenticated: null,
  user: undefined,
  login: () => { },
  logout: () => { },
  cookieFlag: undefined,
  validateStatus: () => {},
  fetchUser: () => {},
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
    switch (response.status) {
      case 401:
        return {label: "root", value: { type: "custom", message: response.response.data.message}}
      
      case 403:
        return{label: "root", value: { type: "custom", message: response.response.data.message}}

      case 404:
        return {label: "root", value: { type: "custom", message: response.response.data.message}}
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


  return <AuthContext.Provider value={{ ...state, login: LoginUser, logout: LogoutUser, setAuthenticated: SetAuthenticated, validateStatus: ValidateStatus}}>
    {props.children}
  </AuthContext.Provider>
}

export const useAuthContext = () => {
  return useContext(AuthContext);
}

