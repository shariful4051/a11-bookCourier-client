import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const PaymentSuccess = () => {
    const [transactionId,setTransactionId] = useState()
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get('sessionid')
    const axiosSecure = useAxiosSecure()
    console.log(sessionId);
    useEffect(()=>{
        if(sessionId){
            axiosSecure.patch(`/payment-success?sessionid=${sessionId}`)
            .then(res=>{
                console.log(res.data);
                setTransactionId(res.data.transactionId
)
            })
        }
    },[sessionId,axiosSecure])

    return (
        <div>
            <h3>Payment Successfull</h3>
            <h3>Your Transaction Id: <span className='text-green-500'>{transactionId}</span></h3>
        </div>
    );
};

export default PaymentSuccess;