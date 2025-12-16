import React from 'react';
import GoogleLogin from '../component/GoogleLogin';
import { Link } from 'react-router';
import { useForm } from "react-hook-form"
import useAuth from '../Hooks/useAuth';
import { toast } from 'react-toastify';
import axios from 'axios';

const Register = () => {

    const { createUser,updateUser,setUser} = useAuth()
    const {register,handleSubmit,formState:{errors}} = useForm()

    const handleRegister = (data)=>{
        console.log( data);
        
        const profileImg = data.photo[0]
        createUser(data.email,data.password)
        .then(result=>{
          const user= result.user
          console.log(result.user);
         //toast.success('register success')
          //store image and get image url
          const formData = new FormData()
          formData.append('image',profileImg)
          console.log('from form data',formData,formData.append('image',profileImg));
          const imageURL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host}`

          axios.post(imageURL,formData)
          .then(res=>{
            console.log('after upload image',res.data.data.url);
              const userProfile = {
            photoURL:res.data.data.url,
            displayName:data.name,
            
          }
           //update user profile
          updateUser(userProfile)
          .then(()=>{
            toast.success('Register success.')
            //setUser({...user,displayName:data.name,photoURL:res.data.data.url})
            setUser({...user,...userProfile})
          })
          .catch(error=>{
            toast.error(error.message)
          })


          })
        
         
         


        })
        .catch(error=>{
          toast.error(error.message)
        })



      
          //store the image and get image url
          // const formData =new FormData();
          // formData.append('image',profileImg)
          // console.log('form data',formData);
          // const imageURL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host}`
          // axios.post(imageURL,formData)
          // .then(res=>{
          //   console.log('after image upload',res.data.data.url);
          // })
          
    }
    return (
     <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
         <h1 className="text-5xl font-bold">Register now!</h1>
        <form onSubmit={handleSubmit(handleRegister)}>
            <fieldset className="fieldset">

              {/* name */}
          <label className="label">Name</label>
          <input type="text" {...register('name',
          {
            minLength:3
          }
          )}
          className="input" placeholder="Name" required />
          {errors.name?.type==="minLength"
           &&
           <p className='text-red-500 '>
            'Name must be 3 character or longer.'
            </p>}


             {/* photo */}
          <label className="label">Photo</label>
          <input type="file" {...register('photo')} className="file-input" placeholder=""  />


             {/* email */}
          <label className="label">Email</label>
          <input type="email" {...register('email')} className="input" placeholder="Email" required />


                  {/*password  */}
          <label className="label">Password</label>
          <input type="password" {...register('password',
            {
              pattern:/^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
            }
          )}
           className="input" placeholder="Password" required />
           {
            errors.password?.type==='pattern' && <p className='text-small text-red-500'>Password must contain at least one uppercase letter, one lowercase letter, and be at least 6 characters or long.</p>
           }
    
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