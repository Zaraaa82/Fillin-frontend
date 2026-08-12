import React from 'react'
import { useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router';

function GuestRoute({children}) {
    const {user} = useAuth();
    if(user){
        if(!user.isProfileComplete){
            return <Navigate to={'/profile/form'}/>
        }else{
            return <Navigate to={user.role === 'worker'? '/shifts'  : '/business/shifts'}/>
        }
    }
  return children;
}

export default GuestRoute
