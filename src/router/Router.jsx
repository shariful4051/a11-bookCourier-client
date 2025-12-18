import React from 'react';
import { createBrowserRouter } from 'react-router';
import HomeLayout from '../layOut/homeLayout/HomeLayout';
import Home from '../layOut/homeLayout/Home';
import Login from '../auth/Login';
import Register from '../auth/Register';
import DashboardLayOut from '../layOut/dashbordLayout/DashboardLayOut';
import PrivateRoute from './PrivateRoute';
import Hero from '../layOut/dashbordLayout/Hero';
import AddBook from '../Pages/Dashboard/Librarian/AddBook';
import Books from '../layOut/homeLayout/Books';
import BookDetails from '../layOut/homeLayout/BookDetails';

const Router = createBrowserRouter([
    {
        path: '/',
        errorElement: <p>page not found</p>,
        Component: HomeLayout,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: 'books',
                Component: Books
            },
            {
                path:'bookDetails/:id',
                Component:BookDetails,
                loader:({params})=>fetch(`http://localhost:3000/books/${params.id}`)

            },
            {
                path: '/login',
                Component: Login
            },
            {
                path: '/register',
                Component: Register
            }
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><DashboardLayOut></DashboardLayOut></PrivateRoute>,
        children: [
            {
                index: true,
                Component: Hero
            },
            {
                path: '/dashboard/addBook',
                Component: AddBook
            }
        ]
    }
])

export default Router;