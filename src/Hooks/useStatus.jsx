import React from 'react';
import useAuth from './useAuth';

import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useStatus = () => {

    const {user} =useAuth()
    const axiosSecure = useAxiosSecure()
    const {isLoading:statusLoding,data:status='user'}=useQuery({
        queryKey:['user-status',user?.email],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/users/${user.email}/status`)
            return res.data
        }

    })
    return {statusLoding,status}
};

export default useStatus;