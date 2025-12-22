import React from 'react';
import { NavLink, Outlet } from 'react-router';
import useStatus from '../../Hooks/useStatus';

const Dashboard = () => {
  const { status } = useStatus()
  console.log('status from dashboard', status.status);
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        {/* Page content here */}
        <label htmlFor="my-drawer-3" className="btn drawer-button lg:hidden">
          Open DashBoard
        </label>
        <Outlet></Outlet>


      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu bg-base-200 min-h-full w-80 p-4">
          {/* Sidebar content here */}
          <li><NavLink to='/'>Home</NavLink></li>
          <li><NavLink to='/dashboard/myOrder'>My Orders</NavLink></li>
          <li><NavLink to='/dashboard/paymentHistory'>My Payments History</NavLink></li>

          <li className='font-bold text-2xl'>Librarian</li>
           {
           ( status.status === 'admin' ||status.status==='librarian') && <> 
              <li><NavLink to='/dashboard/addBook'>Add Book</NavLink></li>
              <li><NavLink to='/dashboard/myBooks'>My Books</NavLink></li>
              <li><NavLink to='/dashboard/orderBooks'>Order For My Books</NavLink></li>
           </>
          } 


          <li className='font-bold text-2xl'>Admin</li>
          {
            status.status === 'admin' && <>

              <li><NavLink to='/dashboard/userManagement'>User Management</NavLink></li>
              <li><NavLink to='/dashboard/bookManagement'>Book Management</NavLink></li>
              <li><NavLink to='/dashboard/showAllOrders'> Show All Orders</NavLink></li>

             </>
          } 



        </ul>
      </div>
    </div>
  );
};

export default Dashboard;