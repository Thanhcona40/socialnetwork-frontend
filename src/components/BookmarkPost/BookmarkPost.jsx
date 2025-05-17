import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBookmark, getBookmarkUser } from '../../redux/Posts/Action';
import { Avatar } from '@mui/material';
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import CommentModal from '../Posts/Comments/CommentModal';

const BookmarkPost = () => {
    //Mở modal post
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const {post} = useSelector(store => store)
    const dispatch = useDispatch()

    const handleRemoveBookmark = (id) => {
        dispatch(deleteBookmark(id))
    }

    useEffect(() => {
        dispatch(getBookmarkUser())
    },[])

    return (
            <div className="p-6 max-w-3xl mx-auto space-y-4">
                {post?.bookmarkPosts?.map((bookmarkPost) => (
                    <div 
                        key={bookmarkPost.id} 
                        className="flex items-start gap-4 p-4 bg-white shadow-sm rounded-lg border hover:shadow-md transition-all"
                    >
                        {/* Ảnh bài viết bên trái */}
                        {bookmarkPost.posts.image ? (
                            <img 
                                src={bookmarkPost.posts.image[0]} 
                                alt="Post" 
                                className="w-24 h-24 object-cover rounded-md cursor-pointer"
                                onClick={handleOpen}
                            />
                        ) : (
                            <div className="w-24 h-24 bg-gray-200 rounded-md flex items-center justify-center text-gray-500 cursor-pointer">
                                <Avatar 
                                    src={bookmarkPost.posts.user.image} 
                                    className="w-24 h-24 rounded-md"
                                    onClick={handleOpen}
                                />
                            </div>
                        )}
    
                        {/* Nội dung bên phải */}
                        <div className="flex-1">
                            <div className="flex items-center justify-between">
                                <p className="font-semibold text-gray-900 text-sm cursor-pointer" onClick={handleOpen}>
                                    {bookmarkPost.posts.content.length > 80 
                                        ? bookmarkPost.posts.content.slice(0, 80) + "..."
                                        : bookmarkPost.posts.content}
                                </p>
                                <button className="p-1 hover:bg-gray-100 rounded-full" onClick={() => handleRemoveBookmark(bookmarkPost.id)}>
                                    <CloseOutlinedIcon className="w-5 h-5 text-gray-600" />
                                </button>
                            </div>
    
                            {/* Thông tin nguồn bài viết */}
                            <p className="text-xs text-gray-500 mt-1">
                                Post • Bookmarked
                            </p>
                            <p className="text-xs text-gray-500">
                                Bookmarked from to post of {" "}
                                <span className="text-blue-500 font-medium">
                                    {bookmarkPost.posts.user.fullName}
                                </span>{" "}
                                {formatDistanceToNow(new Date(bookmarkPost.createdAt), { addSuffix: true, locale: vi })}
                            </p>
                        </div>
                        <CommentModal
                            item={bookmarkPost.posts}
                            open={open}
                            handleClose={handleClose}
                        />
                    </div> 
                ))}
            </div>
    );
}

export default BookmarkPost;
