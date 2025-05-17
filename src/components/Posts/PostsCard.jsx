import React, { useEffect, useState } from 'react';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import { Avatar } from '@mui/material';
import { formatTimeDifference } from '../../Utils/formatTimeDifferent';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { bookmarkPost, deletePosts, hiddenPosts, hiddenUser, likePosts, removelikePosts } from '../../redux/Posts/Action';
import CommentModal from './Comments/CommentModal';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import UpdatePosts from './UpdatePosts';
import { toast, ToastContainer } from 'react-toastify';
import { CLEAR_POST_SUCCESS } from '../../redux/Posts/ActionType';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import SharePostModal from './SharePosts/SharePostModal';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import PostImages from './PostImages';
import { motion } from "framer-motion";

const PostsCard = ({ item }) => {
    //Mở modal comment
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    //Mở modal update post
    const [isUpdatePost, setIsUpdatePost] = React.useState(false);
    const handleOpenUpdatePost = () => {
        setIsUpdatePost(true);
    }
    const handleCloseUpdatePost = () => setIsUpdatePost(false);

    //Mở tác vụ cua post
    const [anchorEl, setAnchorEl] = React.useState(null);
    const openMore = Boolean(anchorEl);
    const handleClickMore = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseMore = () => {
        setAnchorEl(null);
    };

    //Mở modal share post
    const [shareOpen, setShareOpen] = React.useState(false);
    const handleOpenShare = () => setShareOpen(true);
    const handleCloseShare = () => setShareOpen(false);

    const { auth, post } = useSelector(store => store)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleProfile = () => {
        navigate(`/profile/${item?.user?.id}`)
    }

    const handleBlockUser = () => {
        dispatch(hiddenUser(item.id))
        handleCloseMore()
    }

    const handleHiddenPost = () => {
        dispatch(hiddenPosts(item.id))
        handleCloseMore()
    }

    const handleLikePost = () => {
        dispatch(likePosts(item?.id))
    }

    const handleRemoveLikePost = () => {
        dispatch(removelikePosts(item?.id))
    }

    const handleBookmarkPost = () => {
        dispatch(bookmarkPost(item?.id))
    }

    const handleDeletePost = () => {
        dispatch(deletePosts(item?.id))
        handleCloseMore()
        toast.success("Delete Post Success!", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }

    const handleNotifyUpdatePostSuccess = () => {
        toast.success("Update Post success!", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        dispatch({ type: CLEAR_POST_SUCCESS })
    }

    useEffect(() => {
        if (post.successMessage) {
            handleNotifyUpdatePostSuccess()
        }
    }, [post.successMessage])

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.4 }}
            className="flex w-full border-b-2 bg-white py-3 px-4 sm:px-6 hover:bg-gray-50 transition duration-200"
        >
            <ToastContainer />
            <div className="flex-shrink-0 flex justify-center sm:block">
                <Avatar
                onClick={handleProfile}
                className="border-2 border-green-400 shadow-sm w-14 h-14"
                src={item?.user?.image}
                />
            </div>
            <div className="flex flex-col mt-3 sm:mt-0 sm:ml-4 w-full">
                <div className="flex justify-between items-start">
                    <div className='flex flex-wrap gap-2 items-center'>
                        <p className="font-bold text-base sm:text-xl ">{item?.user?.fullName}</p>
                        <p className="text-sm text-gray-400">{formatTimeDifference(item?.createdAt)}</p>
                    </div>
                    <div className="ml-auto">
                        <Button
                            id="basic-button"
                            aria-controls={openMore ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={openMore ? 'true' : undefined}
                            onClick={handleClickMore}
                        >
                            <MoreHorizOutlinedIcon />
                        </Button>
                    </div>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={openMore}
                        onClose={handleCloseMore}
                        MenuListProps={{ 'aria-labelledby': 'basic-button' }}
                    >
                        {item.user.id === auth.user.id ? (
                            <>
                                <MenuItem onClick={handleOpenUpdatePost}>Edit</MenuItem>
                                <MenuItem onClick={handleDeletePost}>Delete</MenuItem>
                            </>
                        ) : (
                            <>
                                <MenuItem onClick={handleHiddenPost}>Hidden</MenuItem>
                                <MenuItem onClick={handleBlockUser}>Block</MenuItem>
                            </>
                        )}
                    </Menu>
                </div>
                <p className="mt-2 text-gray-800 text-sm sm:text-base">{item?.content}</p>

                <PostImages images={item.image} />

                <div className="pt-4 flex justify-between items-center w-full gap-3 sm:gap-0">
                    <div className="flex space-x-4 sm:space-x-6">
                        {item?.liked ? (
                            <div
                                onClick={handleRemoveLikePost} 
                                className="text-pink-500 flex space-x-2 cursor-pointer hover:text-pink-600 items-center"
                            >
                                <span>{item?.totalLikes}</span>
                                <FavoriteOutlinedIcon />
                            </div>
                        ) : (
                            <div
                                onClick={handleLikePost}
                                className="text-gray-600 flex space-x-2 cursor-pointer hover:text-pink-500 items-center"
                            >
                                <span>{item?.totalLikes}</span>
                                <FavoriteBorderOutlinedIcon />
                            </div>
                        )}
                        <div
                            className="flex space-x-2 cursor-pointer text-gray-600 hover:text-blue-600 items-center"
                            onClick={handleOpen}
                        >
                            <span>{item?.totalComment}</span>
                            <ChatBubbleOutlineOutlinedIcon />
                        </div>
                        <div
                            className="flex space-x-2 text-gray-600 hover:text-green-500 cursor-pointer items-center"
                            onClick={handleOpenShare}
                        >
                            <span>{item?.totalShare}</span>
                            <ShareOutlinedIcon />
                        </div>
                        
                    </div>
                    <div
                        className="text-gray-600 hover:text-yellow-500 cursor-pointer flex items-center space-x-1"
                        onClick={handleBookmarkPost}
                    >
                        <span>{item?.totalBookmark}</span>
                        {item?.bookmarked ? <BookmarkIcon fontSize="small" /> : <BookmarkBorderOutlinedIcon fontSize="small" />}
                    </div>
                </div>
            </div>
            <CommentModal
                item={item}
                open={open}
                handleClose={handleClose}
            />

            <UpdatePosts
                item={item}
                open={isUpdatePost}
                handleClose={handleCloseUpdatePost}
            />

            <SharePostModal
                item={item}
                open={shareOpen}
                handleClose={handleCloseShare}
            />
        </motion.div>
    );
}

export default PostsCard;
