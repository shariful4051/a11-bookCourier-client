import React from 'react';
import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';
import { useQuery } from '@tanstack/react-query';

const useDbUser = () => {

      const axiosSecure = useAxiosSecure()
    const {user} = useAuth()
    //-------------

   const {data:dbuser,refetch} =useQuery({
    queryKey:['dbuser',user?.eamil],
    queryFn: async()=>{
      const res = await axiosSecure.get(`users/${user.email}/user`)
      return res.data
    }
   })



    //---------
    return {dbuser,refetch}
};

export default useDbUser;