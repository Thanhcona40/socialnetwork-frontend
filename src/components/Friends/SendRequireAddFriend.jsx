import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSend_RequestAddFriend, requestAddFriend } from '../../redux/Auth/action';
import { toast, ToastContainer } from 'react-toastify';
import { Avatar } from '@mui/material';

const SendRequireAddFriend = () => {
    const auth = useSelector(store => store.auth)

    const dispatch = useDispatch()

    const handleRemoveRequest = (id) => {
        dispatch(requestAddFriend(id));
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

    useEffect(() => {
        dispatch(getAllSend_RequestAddFriend())
        
    },[auth?.requestFriend]);
    return (
        <div className="bg-white shadow-md rounded-md p-6">
            <ToastContainer />
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
                Friend Requests
            </h2>
            {console.log("a du: ", auth?.listSendRequestFriend)}
            {auth?.listSendRequestFriend?.length > 0 ? (
                <div className="space-y-4">
                    {auth.listSendRequestFriend.map((request) => (
                        <div
                            key={request?.id}
                            className="flex items-center justify-between bg-gray-50 p-4 rounded-md shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className='flex space-x-3'>
                                <Avatar src={request?.receiver?.image} />
                                <p className="font-semibold text-gray-800 mt-2">
                                    {request?.receiver?.fullName}
                                </p>
                            </div>
                            <div className="flex space-x-2">
                                <button
                                    className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition"
                                    onClick={() => handleRemoveRequest(request?.receiver?.id)}
                                >
                                    Cancel Request
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-600">No send requests available.</p>
            )}
        </div>
    );
}

export default SendRequireAddFriend;
