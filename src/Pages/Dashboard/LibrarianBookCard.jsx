import React, { useRef } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const LibrarianBookCard = ({ book, refetch }) => {

  const axiosSecure = useAxiosSecure()
  const id = book._id;

  const modalRef = useRef()
  const openModal = () => {
    modalRef.current.showModal();
  }
  const handleEdit = (e) => {
    e.preventDefault()
    const bookName = e.target.name.value;
    const photo = e.target.photo.value;
    const price = Number(e.target.price.value);
    const editBook = { bookName, photo, price }
    console.log('from edit', editBook, id);

    axiosSecure.patch(`/books/${id}`, editBook)
      .then(res => {

        console.log(res.data);
        if (res.data.modifiedCount) {
          refetch()
          Swal.fire({
            title: "Book Updated Successfully !",
            icon: "success",
            draggable: true
          });
          modalRef.current.close()
        }
      })

  }
  return (
    <div className="card bg-base-100 w-96 shadow-sm">
      <figure>
        <img className='w-[250px] h-[180px]'
          src={book.photo}
          alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title"><span>Book Name:</span>    <span>{book.bookName}</span></h2>
        <h2 className="card-title"><span>Writer:</span>    <span>{book.author}</span></h2>
        <p><span>Price:</span> <span>{book.price}$</span></p>
        <p><span>Book Status:</span> <span className={`${book.status=='Published'?'text-green-500 font-bold':'text-red-500 font-bold'}`}>{book.status}</span></p>

        <div className="card-actions justify-end">
          <button onClick={openModal} className="btn btn-primary">Edit</button>


          <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
              <h3 className="font-bold text-lg">Edit now</h3>
              <form onSubmit={handleEdit}>
                <fieldset className="fieldset">

                  <label className="label">Book Name</label>
                  <input type="text" name="name" defaultValue={book.bookName} className="input" placeholder="Book name" />

                  <label className="label">photo Link</label>
                  <input type="text" name="photo" defaultValue={book.photo} className="input" placeholder="photo" />

                  <label className="label">Price</label>
                  <input type="text" name="price" defaultValue={book.price} className="input" placeholder="Price" />

                  <button className="btn btn-neutral mt-4">Edit now</button>
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

export default LibrarianBookCard;