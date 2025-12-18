import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import BooksCard from './BooksCard';

const Books = () => {
 const axiosSecure = useAxiosSecure()
    const {data:books=[]} = useQuery({
        queryKey:['books'],
        queryFn:async()=>{
            const res= await axiosSecure.get('/books')
            console.log(res.data);
            return res.data
        }
    })
    console.log(books);
    return (
        <div>
            <h3>Total Books : <span>{books.length}</span></h3>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 '>
                {
                    books.map(book=><BooksCard
                         key={book._id}
                         book={book}
                    ></BooksCard>)
                }
            </div>
        </div>
    );
};

export default Books;