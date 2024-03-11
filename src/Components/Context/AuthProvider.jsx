import { createContext, useContext, useReducer } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext()

const initialState = {
    user : null,
    isAuthenticated : false,
}

function authReducer(state , action){
    switch(action.type){
        case "login":
            return {
                ...state,
                user : action.payload.user,
                isAuthenticated : true
            }
        case "logout":
            return {
                ...state,
                user : null,
                isAuthenticated : false
            }
        default:
          throw new Error("Unknown action")
    }
}

const FAKE_USER = {
    name: "Mohammad Ghorbani",
    email: "ghorbani.dev1985@gmail.com",
    password:"ghorbaniDev@1"
}

export default function AuthProvider({children}){
   const [{user , isAuthenticated} , dispatch] = useReducer(authReducer , initialState)
function login(email , password){
    if(email === FAKE_USER.email && password === FAKE_USER.password){
        dispatch({
            type : "login",
            payload : {
                user : FAKE_USER,
                isAuthenticated : true
            }
        })
    }
}

function logout(){
    dispatch({
        type : "logout"
    })
}


     return <AuthContext.Provider value={{user , isAuthenticated , login , logout}}>{children}</AuthContext.Provider>
}

export function useAuth(){
    return useContext(AuthContext)
}