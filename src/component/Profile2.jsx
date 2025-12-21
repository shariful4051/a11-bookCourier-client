import React, { useRef } from 'react';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const Profile2 = ({user,refetch}) => {
    const axiosSecure = useAxiosSecure()
    const modalRef = useRef()
    const openModal=()=>{
        modalRef.current.showModal()
    }
    const handleUpdate=(e)=>{
        e.preventDefault()
        const displayName = e.target.name.value;
        const photo = e.target.photo.value;
        const updateProfile = {displayName,photo}
        console.log(updateProfile);
        axiosSecure.patch(`/user/updateProfile/${user._id}`,updateProfile)
        .then(res => {
            console.log((res.data));
                        if (res.data.modifiedCount) {
                            refetch()
                            Swal.fire({
                                title: `${user.displayName} has been updated`,
                                icon: "success",
                                draggable: true
                            });
                            modalRef.current.close()
                        }
        })

    }
    return (
     <div className='max-w-[1140px] mx-auto'>
            
      <div className=' bg-blue-200 p-3 rounded-2xl'>
          <h1 className='font-bold  text-green-700'>Your Profile</h1>
        <div>
            <img className='w-[200px] h-[200px] rounded-full bg-amber-200' src={user?.photo} alt="" />
        </div>
        <p><span className='font-bold'>Name :</span>{user?.displayName}</p>
        <p><span className='font-bold'>Email</span>:{user?.email}</p>
        <p><span className='font-bold'>Status</span>:{user?.status}</p>
      </div>
      <button onClick={openModal} className='btn bg-blue-600 text-white my-4'>Update Profile</button>


      {/* Open the modal using document.getElementById('ID').showModal() method */}

<dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
  <div className="modal-box">
    <h3 className="font-bold text-lg">Update Profile!</h3>
    <form onSubmit={handleUpdate}>
          <fieldset className="fieldset">
          <label className="label">Name</label>
          <input type="text" name='name' defaultValue={user?.displayName} className="input" placeholder="name" />

          <label className="label">Photo Link</label>
          <input type="text" name='photo' defaultValue={user?.photo} className="input" placeholder="photo" />
        
          <button className="btn btn-neutral mt-4">Update</button>
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
    );
};

export default Profile2;