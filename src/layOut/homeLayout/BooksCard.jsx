import React from 'react';
import { Link } from 'react-router';

const BooksCard = ({book}) => {
    
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
    <p><span>Status:</span> <span>{book.status}</span></p>

    <div className="card-actions justify-end">
      <Link to={`/bookDetails/${book._id}`} className="btn btn-primary">View Details</Link>
    </div>
  </div>
</div>
    );
};

export default BooksCard;