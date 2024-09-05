import React from 'react'


// AuthReducer is for changing the current context for different tasks. For authentication case,
// it will be used in login, logout processes.
const AuthReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload
            }
            break;

        case "LOGOUT":
            return {
                ...state,
                isAuthenticated: false,
                user: null
            }
            break;
        

        default:
            return state
            break;
    }
}

export default AuthReducer;