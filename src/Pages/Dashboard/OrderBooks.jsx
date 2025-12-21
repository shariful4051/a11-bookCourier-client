import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const OrderBooks = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const { refetch, data: orderBooks = [] } = useQuery({
        queryKey: ['orderBooks', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/orders/librarian?librarian_email=${user?.email}`)
            return res.data
        }
    })

    //------change delivery status--------

    //---------shiping----
    const handleShiping = (order) => {
        const delivery_status = { delivery_status: 'Shiping' }
        axiosSecure.patch(`/orders/${order._id}`, delivery_status)
            .then(res => {
                if (res.data.modifiedCount) {
                    refetch()
                    Swal.fire({
                        title: `${order.bookName} is shiping now`,
                        icon: "success",
                        draggable: true
                    });
                }
            })

    }
    //----------------delivered-------

    const handleDelivered = (order) => {
        const delivery_status = { delivery_status: 'Delivered' }
        axiosSecure.patch(`/orders/${order._id}`, delivery_status)
            .then(res => {
                if (res.data.modifiedCount) {
                    refetch()
                    Swal.fire({
                        title: `${order.bookName} is Delivered`,
                        icon: "success",
                        draggable: true
                    });
                }
            })

    }

    //-------------cancel order------
    const handleCancel = (order) => {


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

                axiosSecure.delete(`/orders/${order._id}`)
                    .then(res => {

                        if (res.data.deletedCount) {
                            refetch()
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    })


            }
        });

    }


    return (
        <div>
            <h3 className='font-bold text-center underline my-2'>Order For My Added Books : {orderBooks.length}</h3>


            <div className="overflow-x-auto">
                <table className="table table-xs">
                    <thead>
                        <tr>
                            <th>sr no.</th>

                            <th>Book_Name</th>
                            <th>Buyer Name</th>
                            <th>Payment_status</th>
                            <th>Delivery_status</th>
                            <th>Actions</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            orderBooks.map((order, index) =>
                                <tr key={index}>
                                    <th>{index + 1}</th>
                                    <td>{order.bookName}</td>
                                    <td>{order.name}</td>

                                    <td>{
                                        order.payment_status === 'pay' ? <button className='btn bg-amber-200'>Pay</button> : <button className=' btn text-green-400 bg-green-200'>Paid</button>
                                    }</td>
                                    <td className={` btn ${order.delivery_status=="pending" && 'bg-red-300'} ${order.delivery_status=='Shiping' && 'bg-amber-100'} ${order.delivery_status=='Delivered' && 'bg-green-500'}`}>{
                                    order.delivery_status
                                    }</td>
                                    <td>
                                        
                                              
                                           
                                                
                                                     <button onClick={() => handleShiping(order)} className='btn mx-2 bg-green-500'>Shiping</button>
                                                
                                                <button onClick={() => handleDelivered(order)} className='btn bg-green-500'>Delivered</button>
                                                  {
                                                    order.delivery_status === "pending"&&order.payment_status==='pay' && <button onClick={() => { handleCancel(order) }} className='btn bg-red-500'>Cancel</button>
                                                }

                                        
                                        

                                    </td>

                                </tr>)
                        }

                    </tbody>

                </table>
            </div>

        </div>
    );
};

export default OrderBooks;