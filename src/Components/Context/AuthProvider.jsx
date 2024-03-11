import { createContext, useReducer } from "react";

const AuthContext = createContext()

const initialState = {
    user : null,
    isAthenticated : false,
}

function authReducer(state , action){
    switch(action.type){
        case "login":
            return {
                ...state,
                user : action.payload.user,
                isAthenticated : true
            }
        case "logout":
            return {
                ...state,
                user : null,
                isAthenticated : false
            }
        default:
          throw new Error("Unknown action")
    }
}

const FAKE_USER = {
    name: "Mohammad Ghorbani",
    email: "user@gmail.com",
    password:"ghorbaniDev@1"
}

export default function AuthContextProvider({children}){
   const [{user , isAthenticated} , dispatch] = useReducer(authReducer , initialState)

function login(email , password){
    if(email === FAKE_USER.email && password === FAKE_USER.password){
        dispatch({
            type : "login",
            payload : {
                user : FAKE_USER,
                isAthenticated : true
            }
        })
    }
}

function logout(){
    dispatch({
        type : "logout"
    })
}


     return <AuthContext.Provider value={{user , isAthenticated , login , logout}}>{children}</AuthContext.Provider>
}