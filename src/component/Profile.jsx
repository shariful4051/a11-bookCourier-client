// import React from 'react';
// import useAuth from '../Hooks/useAuth';
// import { useQuery } from '@tanstack/react-query';
// import useAxiosSecure from '../Hooks/useAxiosSecure';
// import Loding from './Loding';
// import Profile2 from './Profile2';

// const Profile = () => {
//     const axiosSecure = useAxiosSecure()
//     const {user} = useAuth()
//     const {refetch,data:dbUser=[] }= useQuery({
//         queryKey:['dbUser',user?.email],
//         queryFn: async()=>{
//             const res = await axiosSecure.get(`/users?email=${user.email}`) 
//             console.log('from object',res.data);
//             return res.data
//         }
//     })
//     console.log('from user2',dbUser.length);
   
//     return (

//         <h3>
//             {
//             dbUser.map((dbuser,index)=><Profile2 key={index} dbuser={dbuser} refetch={refetch}></Profile2>)
//             }
//             </h3>
//     );
// };

// export default Profile;