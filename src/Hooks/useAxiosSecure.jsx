import axios from 'axios';
import React from 'react';

const instance = axios.create({
      baseURL:'https://book-courier-jade.vercel.app'
      
})
const useAxiosSecure = () => {
    return instance;
};

export default useAxiosSecure;