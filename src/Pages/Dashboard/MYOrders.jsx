import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const MYOrders = () => {

  const { user } = useAuth()
  const axiosSecure = useAxiosSecure()
  const { refetch, data: myOrders = [] } = useQuery({
    queryKey: ['myOrders', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/orders?email=${user?.email}`)
      return res.data
    }

  })

  //-----------payment button ----

  const handlePayment = (order) => {
    console.log(order);
    const paymentInfo = {
      bookName: order.bookName,
      orderId: order._id,
      email: order.email,
      cost: order.cost
    }
    axiosSecure.post('/payment-checkout-session', paymentInfo)
      .then(res => {
        //console.log(res.data.url);
        window.location.assign(res.data.url);
      })

  }
  const handleDelete = (order) => {
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
      <h3 className='text-primary font-bold text-center underline my-3 '> My Orders :{myOrders.length}</h3>

      <div className="overflow-x-auto">
        <table className="table table-xs">
          <thead>
            <tr>
              <th>Sr no.</th>

              <th>Book_Name</th>
              <th>Cost</th>
              <th>Payment_status</th>
              <th>Delivery_status</th>
              <th>Actions</th>

            </tr>
          </thead>
          <tbody>
            {
              myOrders.map((order, index) =>
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{order.bookName}</td>
                  <td>{order.cost}</td>
                  <td>{
                    order.payment_status === 'pay' ? <button onClick={() => handlePayment(order)} className='btn bg-amber-200'>Pay</button> : <button className=' btn text-green-400 bg-green-200'>Paid</button>
                  }</td>
                  <td className={`  ${order.delivery_status == "pending" && 'text-red-500 font-bold '} ${order.delivery_status == 'Shiping' && 'text-amber-500 font-bold'} ${order.delivery_status == 'Delivered' && 'text-green-500 font-bold'}`}>{
                    order.delivery_status
                  }</td>
                  <td>
                    {
                      order.payment_status === 'pay' && order.delivery_status !== 'Shiping' && order.delivery_status !== 'Delivered' ? <button onClick={() => handleDelete(order)} className='bg-red-500 p-1 text-black p-2 rounded-[2px]'>Delete</button> : ""
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

export default MYOrders;