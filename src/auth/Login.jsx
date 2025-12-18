import React from 'react';
import GoogleLogin from '../component/GoogleLogin';
import { Link, useLocation, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import useAuth from '../Hooks/useAuth';
import { toast } from 'react-toastify';

const Login = () => {
  const location = useLocation()
  const navigate = useNavigate()
 const {loginUser} =useAuth()
  const {register,handleSubmit} = useForm()

  const handleLogin = (data)=>{
    const email = data.email;
    const password = data.password;
    
    loginUser(email,password)
    .then(()=>{
      toast.success('Login success.')
      navigate(location.state || '/')
    })
    .catch(error=>{
      toast.error(error.message)
    })
  }
    return (
        
   
    <div className=" mx-auto my-7 card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
         <h1 className="text-5xl font-bold">Login now!</h1>
        <form onSubmit={handleSubmit(handleLogin)}>
            <fieldset className="fieldset">

          <label className="label">Email</label>
          <input type="email" {...register('email')} className="input" placeholder="Email" />

          <label className="label">Password</label>
          <input type="password" {...register('password')} className="input" placeholder="Password" />
    
          <button className="btn btn-neutral mt-4">Login</button>
        </fieldset>
       
       
        </form>
        <div>
            <h3 className='text-center font-semibold'>Don't have an account? Please</h3>
           <Link state={location.state} to='/register'> <p className=' text-center underline cursor-pointer font-semibold'>Register Now</p></Link>
        </div>
         <span className=' text-center w-full'> <GoogleLogin></GoogleLogin></span>
      </div>
    </div>
  

           
        
    );
};

export default Login;