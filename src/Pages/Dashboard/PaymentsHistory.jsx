import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const PaymentsHistory = () => {

    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const { data: myPayments = [] } = useQuery({
        queryKey: ['paymentsHistory', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments?email=${user?.email}`)
            return res.data
        }
    })
    return (
        <div>
            <h3 className='text-primary text-center my-3'>My Payment History:{myPayments.length}</h3>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Sr No.</th>
                            <th>Book Name</th>
                            <th>Price</th>
                            <th>Transaction Id</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            myPayments.map((payment,index)=>
                             <tr>
                            <th>{index+1}</th>
                            <td>{payment.bookName}</td>
                            <td>{payment.amount}</td>
                            <td>{payment.transactionId}</td>
                            
                        </tr>)
                        }
                       
                        
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default PaymentsHistory;