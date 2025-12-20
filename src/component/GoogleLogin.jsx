import React from 'react';
import useAuth from '../Hooks/useAuth';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router';
import useAxiosSecure from '../Hooks/useAxiosSecure';

const GoogleLogin = () => {

    const {user}=useAuth();

    console.log('from google user',user);
    
    const axiosSecure = useAxiosSecure()

    const location = useLocation()
    const navigate = useNavigate()
    //console.log(location);

    const {googleUser,setUser} = useAuth()

    const googleLogin = () =>{
        googleUser()
        .then(result =>{
          setUser(result.user) 

          const userInfo = {
            displayName:user.displayName,
            email:user.email,
            photo:user.photoURL,
            status:'user'
          }
          console.log('user object',userInfo);
          axiosSecure.post('/users',userInfo) 
          .then(res=>{
            //console.log('user post  from google',res.data,);
          })
          toast.success('Google login success.')
          navigate(location.state || '/')
        })
        .catch(error=>{
            toast.error(error.message)
        })
    }
    return (
        <div>
            {/* Google */}
            <button onClick={googleLogin} className="btn bg-white w-full text-black border-[#e5e5e5]">
            <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
            Login with Google
            </button>
        </div>
    );
};

export default GoogleLogin;