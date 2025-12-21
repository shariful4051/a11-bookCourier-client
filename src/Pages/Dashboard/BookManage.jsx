import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const BookManage = () => {

    const axiosSecure = useAxiosSecure()

    const { refetch, data: allBooks = [] } = useQuery({
        queryKey: ['books'],
        queryFn: async () => {
            const res = await axiosSecure.get('/books')
            return res.data
        }
    })

    //----update published-----
    const handlePublished = (book) => {
        const status = { status: 'Published' }
        axiosSecure.patch(`/books/status/${book._id}`, status)
            .then(res => {
                if (res.data.modifiedCount) {
                    refetch()
                    Swal.fire({
                        title: `${book.bookName} is Published`,
                        icon: "success",
                        draggable: true
                    });
                }
            })

    }

    //--------unpublished---------

      const handleUnPublished = (book) => {
        const status = { status: 'Unpublished' }
        axiosSecure.patch(`/books/status/${book._id}`, status)
            .then(res => {
                if (res.data.modifiedCount) {
                    refetch()
                    Swal.fire({
                        title: `${book.bookName} is Unpublished`,
                        icon: "success",
                        draggable: true
                    });
                }
            })

    }

    //----------delete book------

    const handleDelete = (book)=>{
         Swal.fire({
                    title: "Are you sure?",
                    text: "You won't be able to revert this!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, delete it!"
                }).then((result) => {
                    if (result.isConfirmed) {
        
                        axiosSecure.delete(`/books/${book._id}`)
                            .then(res => {
        
                                if (res.data.deletedCount) {
                                    refetch()
                                    Swal.fire({
                                        title: "Deleted!",
                                        text: `${book.bookName} has been deleted.`,
                                        icon: "success"
                                    });
                                }
                            })
        
        
                    }
                });

    }
    return (
        <div>
            <h3 className='text-primary text-center underline font-bold my-2'>All Books:{allBooks.length}</h3>


            <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Sr no.</th>
                            <th>Book Name</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allBooks.map((book, index) =>
                                <tr key={index}>

                                    <th>{index + 1}</th>
                                    <td>{book.bookName}</td>
                                    <td className={` text-amber-100 ${book.status == 'Published' && 'text-green-600'} ${book.status == 'Unpublished' && 'text-red-500'}`}>{
                                        book.status
                                    }</td>
                                    <td>
                                        <button onClick={() => handlePublished(book)} className='bg-green-400 btn'>Published</button>
                                        <button onClick={()=>handleUnPublished(book)} className='bg-amber-100 btn  mx-2'>UnPublished</button>
                                        <button onClick={()=>handleDelete(book)} className='bg-red-500 btn'>Delete</button>
                                    </td>

                                </tr>
                            )
                        }


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BookManage;