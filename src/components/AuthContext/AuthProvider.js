"use client"
import React, { createContext, useReducer, useContext, useCallback, useMemo } from 'react'
import AuthReducer from './AuthReducer'
import Cookies from 'js-cookie';
const { default: axios, HttpStatusCode } = require("axios");



// Creating context with undefined values allow developer to make more precise decisions, and improve
// the developer experience while implementing it.
export const AuthContext = createContext({
  setAuthenticated: () => { },
  isAuthenticated: null,
  user: undefined,
  login: () => { },
  logout: () => { },
  cookieFlag: undefined,
  validateStatus: () => { },
  fetchUser: () => { },
  axiosInstance: () => { }
});


// The state will be destructured and this also helps developer experience.
const initialState = {
  isAuthenticated: null,
  user: undefined,
  cookieFlag: undefined,
  token: Cookies.get("jwt") || null
};


// This component will wrap the app so that this context will be used in entire application.
export const AuthProvider = (props) => {

  const [state, dispatchAuth] = useReducer(AuthReducer, initialState);
  const axiosInstance = useMemo(() => {
    const instance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      validateStatus: function (status) {
        return status < HttpStatusCode.InternalServerError;
      }
    });

    instance.interceptors.request.use((config) => {
      if (state.token) {
        config.headers.Authorization = `Bearer ${state.token}`
      }
      return config;
    }, (error) => {
      return Promise.reject(error);
    });

    return instance;
  }, []);

  const LoginUser = useCallback((userData) => {
    dispatchAuth({ type: "LOGIN", payload: userData });
  }, [dispatchAuth]);

  const LogoutUser = useCallback(() => {
    dispatchAuth({ type: "LOGOUT" });
  }, [dispatchAuth]);

  const SetAuthenticated = useCallback(() => {
    dispatchAuth({ type: "AUTHENTICATE", payload: true })
  }, [dispatchAuth]);


  const login = useCallback(async (userData) => {
    console.log(userData);
    const response = await axiosInstance.post("/api/v1/auth/authenticate",
      {
        "phone": userData.phone,
        "password": userData.password
      }
    );
    if (response.data.token) {
      Cookies.set("jwt", response.data.token);
      LoginUser({ type: "AUTHENTICATE", payload: { token: response.data.token } })
    } else {
      throw new Error("Authentication error occured!");
    }
  }
    , [axiosInstance]);

  const logout = useCallback(() => {
    Cookies.remove("jwt");
    dispatchAuth({ type: "LOGOUT" });
  }, [dispatchAuth]);


  const checkToken = useCallback(() => {
    const token = Cookies.get("jwt");
    console.log(token);
    if (token) {
      dispatchAuth({ type: "AUTHENTICATE", payload: { token: token } });
    } else {
      logout();
    }
  }, [dispatchAuth]);




  const ValidateStatus = useCallback((response) => {
    switch (response.status) {
      case 401:
        return { label: "root", value: { type: "custom", message: response.response.data.message } }

      case 403:
        return { label: "root", value: { type: "custom", message: response.response.data.message } }

      case 404:
        return { label: "root", value: { type: "custom", message: response.response.data.message } }
      default:
        break;
    }
  }, []);







  const contextValue = useMemo(() => {
    return {
      ...state,
      login: login,
      logout: logout,
      axiosInstance: axiosInstance,
      LoginUser: LoginUser,
      LogoutUser: LogoutUser,
      SetAuthenticated: SetAuthenticated,
      checkToken: checkToken,

    }
  })

  return <AuthContext.Provider
    value={contextValue}>
    {props.children}
  </AuthContext.Provider>
}

export const useAuthContext = () => {
  return useContext(AuthContext);
}

