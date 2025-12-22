import React from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import BooksCard from './BooksCard';

const LatestBooks6 = () => {
    const axiosSecure = useAxiosSecure()
    const { data: books = [] } = useQuery({
        queryKey: ['books'],
        queryFn: async () => {
            const res = await axiosSecure.get('/books/latest')
            console.log(res.data);
            return res.data
        }
    })
    console.log(books);
    return (
        <div>
            <h2 className='text-center font-bold underline my-3 text-primary text-[25px]'>Latest 6 Published Books : <span>{books.length}</span></h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 '>
                {
                    books.map(book => <BooksCard
                        key={book._id}
                        book={book}
                    ></BooksCard>)
                }
            </div>
        </div>
    );
}

    export default LatestBooks6;