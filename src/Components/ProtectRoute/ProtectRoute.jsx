import React, { useEffect } from 'react'
import { useAuth } from '../Context/AuthProvider'
import { useNavigate } from 'react-router-dom'

const ProtectRoute = ({children}) => {
    const {isAuthenticated} = useAuth()
    const navigate = useNavigate()
    useEffect(()=>{
        if(!isAuthenticated){
            navigate("/login") //Authentication
        }
    },[isAuthenticated , navigate])
  return isAuthenticated ? children : null
}

export default ProtectRoute