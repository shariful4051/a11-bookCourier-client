import React from 'react';
import { NavLink, Outlet } from 'react-router';

const Dashboard = () => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        {/* Page content here */}
        <label htmlFor="my-drawer-3" className="btn drawer-button lg:hidden">
          Open drawer
        </label>
        <Outlet></Outlet>


      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu bg-base-200 min-h-full w-80 p-4">
          {/* Sidebar content here */}
          <li><NavLink to='/'>Home</NavLink></li>
          <li><NavLink>My Orders</NavLink></li>
          <li className='font-bold text-2xl'>Librarian</li>
          <li><NavLink to='/dashboard/addBook'>Add Book</NavLink></li>
          <li><NavLink>My Books</NavLink></li>
          <li><NavLink>Orders</NavLink></li>


        </ul>
      </div>
    </div>
  );
};

export default Dashboard;