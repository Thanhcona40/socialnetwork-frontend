import React, { useEffect, useState } from 'react';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import { useDispatch, useSelector } from 'react-redux';
import PostsCard from '../Posts/PostsCard';
import backgroundImageDefault from '../../image/backgroundImageDefault.jpg'
import { Avatar, Button } from '@mui/material';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import ProfileModal from './ProfileModal';
import { getProfileByUserId, requestAddFriend, requestRemoveFriend } from '../../redux/Auth/action';
import { useNavigate, useParams } from 'react-router-dom';
import { getUserPosts } from '../../redux/Posts/Action';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import PersonRemoveOutlinedIcon from '@mui/icons-material/PersonRemoveOutlined'
import DoneIcon from '@mui/icons-material/Done';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { api } from '../../config/api';

const Profile = () => {
    const {auth,post} = useSelector(store => store)
    const [status, setStatus] = useState(null);
    const [showUnfriend, setShowUnfriend] = useState(false);
    const [sizeFriend, setSizeFriend] = useState(null)

    //Mở modal edit profile
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const {id} = useParams()
    const dispatch = useDispatch()
    const navigate= useNavigate()

    const fetchStatus = async (id) => {
        try {
            const {data} = await api.get(`/api/friend/relation/${id}`); // Lấy quan hệ bạn bè 
            setStatus(data);
            console.log("status friend: ", data)
        } catch (err) {
            console.error(err);
        }
    };

    const fetchSizeFriend = async () => {
        try {
            const {data} = await api.get(`/api/friend/size_friend`); // Lấy số lượng bạn bè 
            setSizeFriend(data);
            console.log("status friend: ", data)
        } catch (err) {
            console.error(err);
        }
    };

    const handleAddFriend = () => {
        dispatch(requestAddFriend(id)) // Gửi yêu cầu thêm bạn bè
    }

    const handleUnfriend = () => {
        dispatch(requestRemoveFriend(id)); // Gửi yêu cầu hủy bạn bè
        setShowUnfriend(false); // Ẩn nút sau khi hủy bạn bè
    };

    const renderButtonLabel = () => {
        console.log("status friend: ", status)
        switch (status) {
            case "FRIEND":
                return "Friend";
            case "REQUEST_SENT":
                return "Cancel request";
            case "NOT_FRIEND":
                return "Add";
        }
    };

    useEffect(() => {
       dispatch(getProfileByUserId(id))
       dispatch(getUserPosts(id))
       fetchSizeFriend()
    },[id,open])

    useEffect(() => {
        fetchStatus(id)
    },[auth?.requestFriend, auth?.deleteFriend])
    
    return (
        <div>
            <section className='z-50 flex sticky mt-3 space-x-3 top-0 bg-white h-[3rem]'>
                <ArrowBackOutlinedIcon className='cursor-pointer' onClick={() => navigate(-1)}/>
                <p className='text-lg font-bold'>{auth?.findUser?.fullName}</p>
            </section>

            <section className='mt-4'>
                <img className='w-full h-[15rem] object-cover' src={auth?.findUser?.backgroundImage || backgroundImageDefault} alt="" />
            </section>

            <section>
                <div className='pl-5 flex justify-between space-x-3'>
                    <div className='flex space-x-3'>
                        <Avatar
                            className='transform -translate-y-24'
                            src={auth?.findUser?.image}
                            sx={{ width: "10rem", height: "10rem", border: "4px solid white" }}
                        />
                        <div className='mt-3'>
                            <p className='font-semibold'>{auth?.findUser?.fullName}</p>
                            <p className='text-gray-700'>{sizeFriend} Friends</p>
                        </div>
                    </div>
                    {
                        auth?.findUser?.req_user ? (
                            <Button
                                className="ml-auto"
                                sx={{
                                    borderRadius: "20px",
                                    height: "40px",
                                    marginTop: "15px",
                                    alignItems: "center",
                                }}
                                variant="contained"
                                onClick={handleOpen}
                            >
                                Edit Profile
                            </Button>
                        ) : (
                            (status === "FRIEND") ?
                            (
                                <div className="flex flex-col">
                                    <Button
                                        className="ml-auto font-bold"
                                        sx={{
                                            borderRadius: "20px",
                                            height: "40px",
                                            marginTop: "15px",
                                            alignItems: "center",
                                        }}
                                        color='inherit'
                                        variant="contained"
                                        onClick={() => setShowUnfriend(!showUnfriend)} // Hiển thị nút Unfriend
                                    >
                                        <DoneIcon className="mr-2" />{renderButtonLabel()}
                                    </Button>
                                    {showUnfriend && (
                                            <Button
                                                className="mt-4 font-bold"
                                                variant="contained"
                                                color="error"
                                                size="small"
                                                sx={{
                                                    borderRadius: "20px",
                                                    height: "40px",
                                                    marginTop: "15px",
                                                    alignItems: "center",
                                                }}
                                                onClick={handleUnfriend} // Xử lý hủy bạn bè
                                            >
                                             <CloseOutlinedIcon className='mr-2'/>   Unfriend
                                            </Button>
                                    )}
                                </div>
                            ) : (
                                // Nút Thêm bạn hoặc Hủy yêu cầu
                                <Button
                                    className="ml-auto"
                                    sx={{
                                        borderRadius: "20px",
                                        height: "40px",
                                        marginTop: "15px",
                                    }}
                                    variant="contained"
                                    color={status === "REQUEST_SENT" ? "error" : "primary"} // Màu đỏ khi là "Hủy yêu cầu"
                                    onClick={handleAddFriend}
                                >
                                    {status === "REQUEST_SENT" ? (
                                        <>
                                            <PersonRemoveOutlinedIcon className="mr-2" /> {renderButtonLabel()}
                                        </>
                                    ) : (
                                        <>
                                            <PersonAddOutlinedIcon className="mr-2" /> {renderButtonLabel()}
                                        </>
                                    )}
                                </Button>
                            ) 
                        )
                    }
                </div>
                <div className='space-y-4 transform -translate-y-12 text-gray-500'>
                    <div className='text-black pl-5'>
                        <p>{auth?.findUser?.bio}</p>
                    </div>
                    <div className='flex space-x-3'>
                        {auth?.findUser?.location ? <LocationOnOutlinedIcon/> : ''}
                        <p>{auth?.findUser?.location}</p>
                    </div>
                    <div className='flex space-x-3'>
                        {auth?.findUser?.dateOfBirth ? <CalendarMonthOutlinedIcon /> : ''}
                        <p>{auth?.findUser?.dateOfBirth}</p>
                    </div>
                </div>
                <hr className=' bg-black h-[0.1rem]'/>
            </section>

            <section>
                {post?.postsUser?.map((item) => <PostsCard item={item}/>)}
                {console.log("post user cua t dau: ", post?.postsUser)}
            </section>

            <ProfileModal open={open} handleClose={handleClose}/>
        </div>
    );
}

export default Profile;
