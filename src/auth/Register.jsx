import React from 'react';
import GoogleLogin from '../component/GoogleLogin';
import { Link } from 'react-router';
import { useForm } from "react-hook-form"

const Register = () => {


    const {register,handleSubmit} = useForm()
    const handleRegister = (data)=>{
        console.log(data);
    }
    return (
     <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
         <h1 className="text-5xl font-bold">Register now!</h1>
        <form onSubmit={handleSubmit(handleRegister)}>
            <fieldset className="fieldset">

          <label className="label">Name</label>
          <input type="text" {...register('name')} className="input" placeholder="Name" required />

          <label className="label">Photo</label>
          <input type="file" className="file-input" placeholder=""  />

          <label className="label">Email</label>
          <input type="email" {...register('email')} className="input" placeholder="Email" />

          <label className="label">Password</label>
          <input type="password" {...register('password')} className="input" placeholder="Password" />
    
          <button className="btn btn-neutral mt-4">Register Now</button>
        </fieldset>
       
       
        </form>
        <div>
            <h3 className='text-center font-semibold'>Already have an account? Please</h3>
           <Link to='/login'> <p className=' text-center underline cursor-pointer font-semibold'>Login Now</p></Link>
        </div>
         <span className='  text-center w-full'> <GoogleLogin></GoogleLogin></span>
      </div>
    </div>
    );
};

export default Register;