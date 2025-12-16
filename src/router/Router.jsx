import React from 'react';
import { createBrowserRouter } from 'react-router';
import HomeLayout from '../layOut/homeLayout/HomeLayout';
import Home from '../layOut/homeLayout/Home';

const Router = createBrowserRouter([
    {
        path:'/',
        errorElement:<p>page not found</p>,
        Component:HomeLayout,
        children:[
            {
                index:true,
                Component:Home
            }
        ]
    }
])

export default Router;