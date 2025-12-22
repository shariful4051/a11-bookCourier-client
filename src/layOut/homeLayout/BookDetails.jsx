import React, { useRef } from 'react';
import { useLoaderData, useNavigate } from 'react-router';
import useAuth from '../../Hooks/useAuth';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const BookDetails = () => {
    const navigate =useNavigate()
    const { user } = useAuth()
    console.log( 'from details',user);
    const modalRef = useRef()

    const openModal = () => {
        modalRef.current.showModal();
    }

    const book = useLoaderData()
    console.log('book from details', book);


    //------------order-
    const { register, handleSubmit, formState: { errors } } = useForm()
    const axiosSecure = useAxiosSecure()

    const handleOrder = data => {
        console.log('object from order:', data);
        const orderBook = {
            ...data,
            bookName: book.bookName,
            librarian_email:book.librarian_email,
            cost: Number(book.price),
            delivery_status: 'pending',
            payment_status: 'pay',
            createAt:new Date()
        }
        console.log('orderbook', orderBook);
        axiosSecure.post('/orders', orderBook)
            .then(res => {
                console.log('after order post', res.data);
                if (res.data.insertedId) {
                    navigate('/dashboard/myOrder')
                    modalRef.current.close()
                    Swal.fire({
                        title: "Book Added Successfully !",
                        icon: "success",
                        draggable: true
                    });
                }
            })
    }
    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row">
                <img
                    src={book.photo}
                    className="md:max-w-sm max-w-[350px] rounded-lg lg:h-[555px] h-[333px] shadow-2xl"
                />
                <div>
                    <h1 className=" text-2xl md:text-5xl font-bold">
                        <span className='font-semibold '>Name :</span>
                        <span className='font-bold text-primary'>{book.bookName}</span>
                    </h1>
                    <p className="py-2">
                        <span className='font-semibold '>Writer :</span>
                        <span className='font-bold text-primary'>{book.author}</span>
                    </p>
                    <p className="py-2">
                        <span className='font-semibold '>Price:</span>
                        <span className='font-bold text-primary'>{book.price}.</span>
                    </p>
                    <p className="py-2">
                        <span className='font-semibold '>CreateAt :</span>
                        <span className='font-bold text-primary'>{book.create_at}.</span>
                    </p>
                    <p className="py-2">
                        <span className='font-semibold '>AvailabilityTime :</span>
                        <span className='font-bold text-primary'>{book.status}.</span>
                    </p>


                    <button onClick={openModal} className="btn btn-primary">Order now</button>


                    {/* Open the modal using document.getElementById('ID').showModal() method */}

                    <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
                        <div className="modal-box">
                            <h3 className="font-bold text-lg">Buy Now</h3>
                            <form onSubmit={handleSubmit(handleOrder)}>
                                <fieldset className="fieldset">
                                    <label className="label">Name</label>
                                    <input type="text" {...register('name')} value={user?.displayName} className="input" required />

                                    <label className="label">Email</label>
                                    <input type="email" {...register('email')} value={user?.email} className="input" readOnly />

                                    <label className="label">Phone</label>
                                    <input type="text" {...register('phone',
                                        { pattern: /^(?:\+880|880|01)[3-9]\d{8}$/ }
                                    )} className="input" placeholder='017XXXXXXXX' required />
                                    {
                                        errors.phone?.type === 'pattern' && <p className='text-red-500 text-sm'>Please enter a valid Bangladeshi phone number (e.g. 017XXXXXXXX or +88017XXXXXXXX).</p>

                                    }

                                    <label className="label">Address</label>
                                    <input type='text' {...register('address')} className="input" placeholder='address' required />


                                    <button className="btn btn-neutral mt-4">Order Now</button>
                                </fieldset>
                            </form>

                            <div className="modal-action">
                                <form method="dialog">
                                    {/* if there is a button in form, it will close the modal */}
                                    <button className="btn">Close</button>
                                </form>
                            </div>
                        </div>
                    </dialog>
                </div>
            </div>
        </div>
    );
};

export default BookDetails;