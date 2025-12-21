import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router';
import useAuth from '../../Hooks/useAuth';
import Loding from '../../component/Loding';



const Navbar = () => {
     const[toggle,setToggle] = useState('home')

     const {user,logOutUser} = useAuth()

     //----------
     
     

     const logOut = ()=>{
      logOutUser()
      .then()
      .catch(error=>{
        alert(error.message)
      })
     }
  
  const links = <>
    <li><NavLink  to="/"><span onClick={()=>setToggle('home')} className={` font-medium text-[#000000] mr-3 ${toggle==='home'&&'text-[#9F62F2]   border-b'}`}>Home</span></NavLink></li>

    <li><NavLink  to="/books"><span onClick={()=>setToggle('books')} className={` font-medium text-[#000000] mr-3 ${toggle==='books'&&'text-[#9F62F2]   border-b'}`}>Books</span></NavLink></li>

    <li><NavLink  to="/dashboard"><span onClick={()=>setToggle('Dashboard')} className={` font-medium text-[#000000] mr-3 ${toggle==='Dashboard'&&'text-[#9F62F2]   border-b'}`}>Dashboard</span></NavLink></li>
  
  </>

  //----------theme toggle-----------
   const [theme,setTheme] = useState(localStorage.getItem('theme') ||'light')

   useEffect(()=>{
   const html = document.querySelector('html')
   html.setAttribute('data-theme',theme)
   localStorage.setItem('theme',theme)
   
   },[theme])

   const handleTheme = (checked)=>{
    setTheme(checked?'dark':'light')
   }
  
    return (
        <div className="navbar bg-base-100 shadow-sm">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
       {links}
      </ul>
    </div>
    <a className="btn btn-ghost text-xl">daisyUI</a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      {links}
    </ul>
  </div>
  <div className="navbar-end">

    <div className="dropdown dropdown-end">
  <div tabIndex={0} role="button" className=" m-1">{user?<img className='w-[50px] h-[50px] bg-blue-300 rounded-full' src={user?.photoURL} alt="" />:<button><Link to='/login' className='btn'><span className='text-primary '>Login</span></Link></button>}</div>
  <ul tabIndex="-1" className="dropdown-content menu bg-base-100 rounded-box z-100 w-52 p-2 shadow-sm">
 
      <li className='font-semibold'><NavLink to='/login'>Login </NavLink></li>
      <li className='font-semibold'><NavLink to='/profile'>Profile</NavLink></li>
      <input className='toggle' onChange={(e)=>handleTheme(e.target.checked)} type="checkbox" name="" id="" />
    <li className='font-semibold'><a onClick={logOut}>Logout</a></li>
   
  </ul>
</div>
  </div>
</div>
    );
};

export default Navbar;