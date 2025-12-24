import React, { useRef } from 'react';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import useAuth from '../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useDbUser from '../Hooks/useDbUser';

const Profile2 = () => {
     const axiosSecure = useAxiosSecure()
  //   const {user} = useAuth()
  //   //-------------

  //  const {data:dbuser,refetch} =useQuery({
  //   queryKey:['dbuser',user?.eamil],
  //   queryFn: async()=>{
  //     const res = await axiosSecure.get(`users/${user.email}/user`)
  //     return res.data
  //   }
  //  })



  //   //---------

  //db user from hook---------

  const {dbuser,refetch} = useDbUser()


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
        axiosSecure.patch(`/user/updateProfile/${dbuser?.user2._id}`,updateProfile)
        .then(res => {
            console.log((res.data));
                        if (res.data.modifiedCount) {
                            refetch()
                            Swal.fire({
                                title: `${dbuser?.user2.displayName} has been updated`,
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
            <img className='w-[200px] h-[200px] rounded-full bg-amber-200' src={dbuser?.user2.photo} alt="" />
        </div>
        <p><span className='font-bold'>Name :</span>{dbuser?.user2.displayName}</p>
        <p><span className='font-bold'>Email</span>:{dbuser?.user2.email}</p>
        <p><span className='font-bold'>Status</span>:{dbuser?.user2.status}</p>
      </div>
      <button onClick={openModal} className='btn bg-blue-600 text-white my-4'>Update Profile</button>


      {/* Open the modal using document.getElementById('ID').showModal() method */}

<dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
  <div className="modal-box">
    <h3 className="font-bold text-lg">Update Profile!</h3>
    <form onSubmit={handleUpdate}>
          <fieldset className="fieldset">
          <label className="label">Name</label>
          <input type="text" name='name' defaultValue={dbuser?.user2.displayName} className="input" placeholder="name" />

          <label className="label">Photo Link</label>
          <input type="text" name='photo' defaultValue={dbuser?.user2.photo} className="input" placeholder="photo" />
        
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