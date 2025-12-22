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
import MYOrders from '../Pages/Dashboard/MYOrders';
import PaymentSuccess from '../Pages/Dashboard/PaymentSuccess';
import PaymentCancelled from '../Pages/Dashboard/PaymentCancelled';
import PaymentsHistory from '../Pages/Dashboard/PaymentsHistory';
import UserManegement from '../Pages/Dashboard/UserManegement';
import LibrarianAddBooks from '../Pages/LibrarianAddBooks';
import OrderBooks from '../Pages/Dashboard/OrderBooks';
import BookManage from '../Pages/Dashboard/BookManage';
import ShowOrders from '../Pages/Dashboard/ShowOrders';
import ErrorPage from '../component/ErrorPage';
import Profile from '../component/Profile';

   const Router = createBrowserRouter([
    {
        path: '/',
        errorElement: <ErrorPage></ErrorPage>,
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
                element:<PrivateRoute><BookDetails></BookDetails></PrivateRoute>,
                loader:({params})=>fetch(`http://localhost:3000/books/${params.id}`)

            },
            {
                path: '/login',
                Component: Login
            },
            {
                path: '/register',
                Component: Register
            },
            {
                path:'profile',
                element:<PrivateRoute><Profile></Profile></PrivateRoute>
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
                path:'myOrder',
                Component:MYOrders
            },


            //----------Librarians


            {
                path: '/dashboard/addBook',
                Component: AddBook
            },
            {
                path:'myBooks',
                element:<LibrarianAddBooks></LibrarianAddBooks>
            },
            {
                path:'orderBooks',
                element:<OrderBooks></OrderBooks>
            },
            {
                path:'payment-success',
                Component:PaymentSuccess
            },
            {
                path:'payment-cancelled',
                Component:PaymentCancelled
            },
            {
                path:'paymentHistory',
                Component:PaymentsHistory
            },
            //----------admin-----
            {
                path:'userManagement',
                element:<UserManegement></UserManegement>
            },
            {
                path:'bookManagement',
                element:<BookManage></BookManage>
            },
            {
                path:'showAllOrders',
                element:<ShowOrders></ShowOrders>
            }
        ]
    }
])

export default Router;