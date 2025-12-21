import React from 'react';
import Error from '../assets/App-Error.png'
import { Link } from 'react-router';

const ErrorPage = () => {
    return (
        <div className='flex flex-col items-center gap-3'>
             <img src={Error} alt="" />
            <Link to='/' className='btn bg-purple-400 text-center'>Go Home</Link>
        </div>
    );
};

export default ErrorPage;