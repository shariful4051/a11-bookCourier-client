import React from 'react';
import useAuth from '../Hooks/useAuth';
import { Navigate, useLocation } from 'react-router';
import Loding from '../component/Loding';

const PrivateRoute = ({children}) => {
    const{user,loding} = useAuth()
    const location = useLocation()
    if(loding){
        return <Loding></Loding>

    }
    if(user){
        return children
    }
    return <Navigate state={location.pathName} to='/login'></Navigate>
};

export default PrivateRoute;