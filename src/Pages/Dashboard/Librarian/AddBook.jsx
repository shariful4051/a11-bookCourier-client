import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2'
import useAuth from '../../../Hooks/useAuth';


const AddBook = () => {

    const {user} = useAuth()
    console.log(user.email);
    const { register, handleSubmit } = useForm()
    const axiosSecure = useAxiosSecure()

    const handleAddBook = data => {
        console.log(data);
        const bookImage = data.photo[0]
        console.log('photo', bookImage);

        const newBook = {
            bookName: data.bookName,
            author: data.Author,
            price: data.price,
            status: data.status,
            librarian_email:user.email,
            create_at:new Date()
        }
        console.log('new book from object', newBook);

        const formData = new FormData()
        formData.append('image', bookImage)
        const imageURL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`
        axios.post(imageURL, formData)
            .then(res => {

                newBook.photo = res.data.data.url;
                axiosSecure.post('/books', newBook)
                    .then(res => {
                        console.log('after book post', res.data);
                        if (res.data.insertedId) {
                            Swal.fire({
                                title: "Book Added Successfully !",
                                icon: "success",
                                draggable: true
                            });
                        }
                    })
                    .catch(error=>{
                        alert(error.message)
                    })
            })





    }
    return (
        <div>
            <h4 className='text-center mt-4 font-bold underline '>Add Book</h4>

            <form onSubmit={handleSubmit(handleAddBook)}>
                <fieldset className="fieldset">

                    <label className="label">Book-Name</label>
                    <input type="text" {...register('bookName')} className="input" placeholder="Book-Name" required />

                    {/* photo */}
                    <label className="label">Photo</label>
                    <input type="file" {...register('photo')} className="file-input" placeholder="" required />

                    {/* book status */}
                    <select {...register('status')} defaultValue="Pick a color" className="select">
                        <option disabled={true}>Book-Status</option>
                        <option value={"Published"}>Published</option>
                        <option value={'Unpublished'}>Unpublished</option>

                    </select>


                    <label className="label">Author</label>
                    <input type="text" {...register('Author')} className="input" placeholder="Author-Name" required />

                    <label className="label">Price</label>
                    <input type="text" {...register('price')} className="input" placeholder="Price" required />

                    <button className="btn btn-neutral mt-4">Add Book</button>
                </fieldset>
            </form>
        </div>
    );
};

export default AddBook;