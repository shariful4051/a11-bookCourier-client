import React from 'react';
import Navbar from './Navbar';
import { Outlet } from 'react-router';
import Footer from './Footer';


const HomeLayout = () => {
   

    return (
        <div className='max-w-7xl mx-auto'>
          
          <Navbar></Navbar>
          
          <Outlet></Outlet>
          <Footer></Footer>
        </div>
    );
};

export default HomeLayout;