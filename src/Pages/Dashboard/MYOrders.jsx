import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const MYOrders = () => {

    const {user} =useAuth()
    const axiosSecure  = useAxiosSecure()
    const {data:myOrders=[]} = useQuery({
        queryKey:['myOrders',user?.email],
        queryFn:async()=>{
            const res= await axiosSecure.get(`/orders?email=${user?.email}`)
            return res.data
        }
        
    })

    //-----------payment button ----

    const handlePayment = (order)=>{
      console.log(order);
      const paymentInfo = {
        bookName:order.bookName,
        orderId:order._id,
        email:order.email,
        cost:order.cost
      }
      axiosSecure.post('/payment-checkout-session',paymentInfo)
      .then(res=>{
        //console.log(res.data.url);
       window.location.assign(res.data.url);
      })

    }
    const handleDelete = ()=>{
      console.log('order deleted');
    }
    return (
        <div>
            it is my order section{myOrders.length}

            <div className="overflow-x-auto">
  <table className="table table-xs">
    <thead>
      <tr>
        <th></th>
        
        <th>Book_Name</th>
        <th>Cost</th>
        <th>Payment_status</th>
        <th>Delivery_status</th>
        <th>Actions</th>
        
      </tr>
    </thead>
    <tbody>
      {
        myOrders.map((order,index)=>
        <tr key={index}>
        <th>{index+1}</th>
        <td>{order.bookName}</td>
        <td>{order.cost}</td>
        <td>{
        order.payment_status==='pay'?<button onClick={()=>handlePayment(order)} className='btn bg-amber-200'>Pay</button>:<button className=' btn text-green-400 bg-green-200'>Paid</button>
        }</td>
        <td>{order.delivery_status}</td>
        <td>
       {
        order.payment_status==='pay'? <button onClick={handleDelete} className='bg-red-500 p-1 text-black rounded-[2px]'>Delete</button>:<button className='' disabled={true}>Delete</button>
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