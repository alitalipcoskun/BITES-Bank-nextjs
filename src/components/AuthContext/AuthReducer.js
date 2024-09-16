
import {useMemo} from 'react'


// AuthReducer is for changing the current context for different tasks. For authentication case,
// it will be used in login, logout processes.
const AuthReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":

            return {
                ...state,
                cookieFlag: true,
                isAuthenticated: true,
                user: action.payload
            }

        case "LOGOUT":

            return {
                ...state,
                cookieFlag: false,
                isAuthenticated: false,
                user: null
            }
        
        case "AUTHENTICATE":
            return {
                ...state,
                isAuthenticated: true,
                token: action.payload.token
            }

        default:
            return state
    }
};

export default AuthReducer;