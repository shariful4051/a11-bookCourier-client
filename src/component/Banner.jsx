import React from 'react';
import Marquee from 'react-fast-marquee';
import Book1 from '../assets/book1.avif';
import BookDelivered from '../assets/bookDelivered.avif';
import BookPack from '../assets/bookPack.avif'

const Banner = () => {
    return (
         <div className='bg-blue-200 my-4 rounded-md mb-3'>
            <Marquee className='flex'>
                <img className='h-[250px] md:w-[380px] rounded-md' src={Book1} alt="" />
                <img className='h-[250px] md:w-[380px] rounded-md' src={BookDelivered} alt="" />
                <img className='h-[250px] md:w-[380px] rounded-md' src={BookPack} alt="" />
            </Marquee>
        </div>
    );
};

export default Banner;