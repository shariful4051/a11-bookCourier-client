import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const UserManegement = () => {

    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()

    const {refetch, data: users = [] } = useQuery({
        queryKey: ['userManagement', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get('/users')
            return res.data
        }
    })
    //---------make admin--
    const handleAdmin = (user) => {
        const userStatus = { status: 'admin' }
        axiosSecure.patch(`/users/${user._id}`, userStatus)
            .then(res => {
                console.log('from admin',res.data);
                if (res.data.modifiedCount) {
                    refetch()
                    Swal.fire({
                        title: `${user.displayName} marked as Admin`,
                        icon: "success",
                        draggable: true
                    });
                }
            })
    }
    //------make user---------
    const handleUser = (user) => {
        const userStatus = { status: 'user' }
        axiosSecure.patch(`/users/${user._id}`, userStatus)
            .then(res => {
                if (res.data.modifiedCount) {
                    refetch()
                    Swal.fire({
                        title: `${user.displayName} marked as User`,
                        icon: "success",
                        draggable: true
                    });
                }
            })
    }

    //--------make librarian-----------
   const handleLibrarian = (user) => {
        const userStatus = { status: 'librarian' }
        axiosSecure.patch(`/users/${user._id}`, userStatus)
            .then(res => {
                if (res.data.modifiedCount) {
                    refetch()
                    Swal.fire({
                        title: `${user.displayName} marked as Librarian`,
                        icon: "success",
                        draggable: true
                    });
                }
            })
    }


    return (
        <div>
            <h3 className='text-primary text-center my-3 font-bold'>Total User:{users.length}</h3>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Sr No.</th>
                            <th>User Name</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) =>
                                <tr>
                                    <th>{index + 1}</th>
                                    <td>{user.displayName}</td>
                                    <td>{user.status}</td>
                                    <td>{user.status!=='admin' && <button onClick={() => handleAdmin(user)} className='btn bg-green-400 ' >Admin</button>}
                                     {user.status!=='librarian' && <button onClick={()=>handleLibrarian(user)} className='btn bg-green-400 mx-1'>Librarian</button >}
                                    
                                    {user.status!=='user' && <button onClick={()=>handleUser(user)} className='btn bg-red-500'>Cancel</button>}</td>

                                </tr>)
                        }


                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default UserManegement;