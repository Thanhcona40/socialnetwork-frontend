import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { acceptAddFriend, getAllRequestAddFriend, refuseAddFriend } from '../../redux/Auth/action';
import { Avatar } from '@mui/material';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';

const RequestAddFriend = () => {
     const auth = useSelector(store => store.auth)

    const dispatch = useDispatch()

    //Thông báo chấp nhận thành công
    const handleAccept = (id) => {
        dispatch(acceptAddFriend(id));
        toast.success("Friend request accepted!", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    };

    //Thông báo từ chối thành công
    const handleRefuse = (id) => {
        dispatch(refuseAddFriend(id));
        toast.error("Friend request declined!", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    };

    useEffect(() => {
        dispatch(getAllRequestAddFriend())
    },[auth?.requestFriend]);
    
    return (
        <div className="bg-white shadow-md rounded-md p-6">
            <ToastContainer />
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
                Friend Requests
            </h2>
            {auth?.listRequestFriend?.length > 0 ? (
                <div className="space-y-4">
                    {auth.listRequestFriend.map((request) => (
                        <div
                            key={request?.id}
                            className="flex items-center justify-between bg-gray-50 p-4 rounded-md shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className='flex space-x-3'>
                                <Avatar src={request?.sender?.image} />
                                <p className="font-semibold text-gray-800 mt-2">
                                    {request?.sender?.fullName}
                                </p>
                            </div>
                            <div className="flex space-x-2">
                                <button
                                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                                    onClick={() => handleAccept(request?.sender?.id)}
                                >
                                    Accept
                                </button>
                                <button
                                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                                    onClick={() => handleRefuse(request?.sender?.id)}
                                >
                                    Decline
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-600 ml-10">No friend requests available.</p>
            )}
        </div>
    );
}

export default RequestAddFriend;
