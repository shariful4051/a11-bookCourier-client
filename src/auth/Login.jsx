import React from 'react';
import GoogleLogin from '../component/GoogleLogin';
import { Link } from 'react-router';

const Login = () => {
    return (
        
   
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
         <h1 className="text-5xl font-bold">Login now!</h1>
        <form action="">
            <fieldset className="fieldset">
          <label className="label">Email</label>
          <input type="email" className="input" placeholder="Email" />
          <label className="label">Password</label>
          <input type="password" className="input" placeholder="Password" />
    
          <button className="btn btn-neutral mt-4">Login</button>
        </fieldset>
       
       
        </form>
        <div>
            <h3 className='text-center font-semibold'>Don't have an account? Please</h3>
           <Link to='/register'> <p className=' text-center underline cursor-pointer font-semibold'>Register Now</p></Link>
        </div>
         <span className=' text-center w-full'> <GoogleLogin></GoogleLogin></span>
      </div>
    </div>
  

           
        
    );
};

export default Login;