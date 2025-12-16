import React from 'react';
import { createBrowserRouter } from 'react-router';
import HomeLayout from '../layOut/homeLayout/HomeLayout';
import Home from '../layOut/homeLayout/Home';
import Login from '../auth/Login';
import Register from '../auth/Register';

const Router = createBrowserRouter([
    {
        path:'/',
        errorElement:<p>page not found</p>,
        Component:HomeLayout,
        children:[
            {
                index:true,
                Component:Home
            },
            {
                path:'/login',
                Component:Login
            },
            {
                path:'/register',
                Component:Register
            }
        ]
    }
])

export default Router;