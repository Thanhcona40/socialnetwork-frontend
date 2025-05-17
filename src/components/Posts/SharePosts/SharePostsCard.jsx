import React, { useEffect } from 'react';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import { Avatar } from '@mui/material';
import { formatTimeDifference } from '../../../Utils/formatTimeDifferent';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deletePosts, hiddenPosts, hiddenUser, likePosts, removelikePosts } from '../../../redux/Posts/Action';
import CommentModal from '../Comments/CommentModal';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import UpdatePosts from '../UpdatePosts';
import { toast, ToastContainer } from 'react-toastify';
import { CLEAR_POST_SUCCESS } from '../../../redux/Posts/ActionType';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import SharePostModal from './SharePostModal';

const SharePostsCard = ({item}) => {
   //Mở modal comment
   const [open, setOpen] = React.useState(false);
   const handleOpen = () => setOpen(true);
   const handleClose = () => setOpen(false);

   //Mở modal update post
   const [isUpdatePost, setIsUpdatePost] = React.useState(false);
   const handleOpenUpdatePost = () => {
       setIsUpdatePost(true);
       handleCloseMore()
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

   const handleProfile = (id) => {
       navigate(`/profile/${id}`)
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
    <div className="w-full border-b bg-white hover:bg-gray-50 transition duration-200 px-4 py-4">
    <ToastContainer />
  
    {/* Phần header của người chia sẻ */}
    <div className="flex items-start space-x-4">
      <Avatar
        onClick={() => handleProfile(item.user.id)}
        className="border-2 border-green-400 shadow-sm cursor-pointer"
        src={item?.user?.image}
      />
      <div className="w-full">
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-2">
            <p className="font-semibold text-base">{item?.user?.fullName}</p>
            <span className="text-sm text-gray-400">{formatTimeDifference(item?.createdAt)}</span>
          </div>
          <div>
            <Button
              id="basic-button"
              aria-controls={openMore ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={openMore ? 'true' : undefined}
              onClick={handleClickMore}
              className="min-w-0 p-1"
            >
              <MoreHorizOutlinedIcon />
            </Button>
            {item.user.id === auth.user.id ? (
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={openMore}
                onClose={handleCloseMore}
                MenuListProps={{ 'aria-labelledby': 'basic-button' }}
              >
                <MenuItem onClick={handleOpenUpdatePost}>Edit</MenuItem>
                <MenuItem onClick={handleDeletePost}>Delete</MenuItem>
              </Menu>
            ) : (
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{ 'aria-labelledby': 'basic-button' }}
              >
                <MenuItem onClick={handleHiddenPost}>Hidden</MenuItem>
                <MenuItem onClick={handleBlockUser}>Block</MenuItem>
              </Menu>
            )}
          </div>
        </div>
        <p className="mt-2 text-gray-800 text-sm">{item?.content}</p>
  
        {/* Phần post gốc được share */}
        <div className="border rounded-lg bg-gray-50 mt-4 p-4">
          <div className="flex items-start space-x-4">
            <Avatar
              onClick={() => handleProfile(item.originalPost.user.id)}
              className="border-2 border-green-400 shadow-sm cursor-pointer"
              src={item?.originalPost?.user?.image}
            />
            <div className="w-full">
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-2">
                  <p className="font-semibold text-sm">{item?.originalPost?.user?.fullName}</p>
                  <span className="text-xs text-gray-400">{formatTimeDifference(item?.originalPost?.createdAt)}</span>
                </div>
              </div>
              <p className="mt-2 text-gray-700 text-sm">{item?.originalPost?.content}</p>
  
              {item?.originalPost?.image && (
                <img
                  src={item?.originalPost?.image}
                  alt="post"
                  onClick={() => handleOpen(item?.originalPost?.user.id)}
                  className="w-full mt-3 h-60 object-cover rounded-md shadow-sm cursor-pointer"
                />
              )}
            </div>
          </div>
        </div>
  
        {/* Action buttons */}
        <div className="flex justify-between items-center mt-4">
          <div className="flex space-x-6 text-gray-600 text-sm">
            {item?.liked ? (
              <div
                onClick={handleRemoveLikePost}
                className="flex items-center space-x-1 text-pink-500 cursor-pointer hover:text-pink-600"
              >
                <span>{item?.totalLikes}</span>
                <FavoriteOutlinedIcon fontSize="small" />
              </div>
            ) : (
              <div
                onClick={handleLikePost}
                className="flex items-center space-x-1 cursor-pointer hover:text-pink-500"
              >
                <span>{item?.totalLikes}</span>
                <FavoriteBorderOutlinedIcon fontSize="small" />
              </div>
            )}
            <div
              onClick={handleOpen}
              className="flex items-center space-x-1 cursor-pointer hover:text-blue-500"
            >
              <span>{item?.totalComment}</span>
              <ChatBubbleOutlineOutlinedIcon fontSize="small" />
            </div>
            <div
              onClick={handleOpenShare}
              className="flex items-center space-x-1 cursor-pointer hover:text-green-500"
            >
              <span>{item?.totalShare}</span>
              <ShareOutlinedIcon fontSize="small" />
            </div>
          </div>
          <BookmarkBorderOutlinedIcon className="cursor-pointer hover:text-yellow-500" />
        </div>
      </div>
    </div>
  
    {/* Modal phần dưới */}
    <CommentModal item={item.originalPost} open={open} handleClose={handleClose} />
    <UpdatePosts item={item} open={isUpdatePost} handleClose={handleCloseUpdatePost} />
    <SharePostModal item={item} open={shareOpen} handleClose={handleCloseShare} />
  </div>
  
   );
}

export default SharePostsCard;
