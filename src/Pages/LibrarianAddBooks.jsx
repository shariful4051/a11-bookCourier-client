import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../Hooks/useAuth';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import LibrarianBookCard from './Dashboard/LibrarianBookCard';

const LibrarianAddBooks = () => {

    const {user} = useAuth()
    const axiosSecure = useAxiosSecure()

    const{refetch, data:myBooks=[]} =useQuery({
        queryKey:["myBooks",user?.email],
        queryFn: async()=>{
            const res =await axiosSecure.get(`/books?email=${user?.email}`)
           // console.log(res.data);
            return res.data 
        }
    })
    return (
        <div>
            <h3 className='font-bold underline text-center my-3'>All My Added Books:{myBooks.length}</h3>
            <div className='grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-3 '>
                {
                    myBooks.map((book,index)=><LibrarianBookCard key={index} book={book} refetch={refetch}></LibrarianBookCard>)
                }
            </div>

        </div>
    );
};

export default LibrarianAddBooks;