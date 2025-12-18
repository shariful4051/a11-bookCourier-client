import React, { useRef } from 'react';
import { useLoaderData } from 'react-router';
import useAuth from '../../Hooks/useAuth';

const BookDetails = () => {
    const {user} = useAuth()
    console.log( 'from details',user);
    const modalRef = useRef()

    const openModal = () => {
        modalRef.current.showModal();
    }

    const book = useLoaderData()
    console.log('book from details', book);
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
                            <form >
                                <fieldset className="fieldset">
                                    <label className="label">Name</label>
                                    <input type="text" value={user?.displayName} className="input"  readOnly />

                                    <label className="label">Email</label>
                                    <input type="email" value={user?.email} className="input"  readOnly />

                                    <label className="label">Phone</label>
                                    <input type="text"  className="input" placeholder='Phone number'  required />

                                    <label className="label">Address</label>
                                    <input type="text"  className="input" placeholder='address' required />
                                    
                                    
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