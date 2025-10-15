import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPostById } from '../../redux/Posts/Action';
import { useParams } from 'react-router-dom';
import { Avatar, Button, TextField } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import { commentPost, likePosts, removelikePosts } from '../../redux/Posts/Action';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import { uploadToCloudinary } from '../../Utils/uploadToCloudinary';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import { formatTimeDifference } from '../../Utils/formatTimeDifferent';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import CommentCard from '../Posts/Comments/CommentCard';


const validateSchema = Yup.object().shape({
    content: Yup.string().required("Text is required")
})

const PostDetails = () => {
    const dispatch = useDispatch()
    const { id } = useParams()
    const { post, auth } = useSelector(store => store)

    const [selectImage, setSelectImage] = React.useState("")
    const [uploadingImage, setUploadingImage] = React.useState(false)
    const formik = useFormik({
        initialValues: {
            content: "",
            image: "",
            postId: id,
        },
        validateSchema,
        onSubmit: (values, action) => {
            dispatch(commentPost(values))
            action.resetForm()
            setSelectImage("");
        }
    })

    const handleLikePost = () => dispatch(likePosts(id))
    const handleRemoveLikePost = () => dispatch(removelikePosts(id))

    const handleImageChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        setUploadingImage(true)
        try {
            const imgUrl = await uploadToCloudinary(file);
            formik.setFieldValue("image", imgUrl);
            setSelectImage(imgUrl);
        } catch (error) {
            console.error("Upload failed:", error);
        } finally {
            setUploadingImage(false);
        }
    }

    useEffect(() => {
        dispatch(getPostById(id))
    }, [id, dispatch])

    if (!post?.post) {
        return (
            <div className="flex justify-center items-center h-screen">
                <CircularProgress />
            </div>
        );
    }

    return (
        <div className='relative h-full'>
            {/* Header */}
            <div className="flex justify-center items-center border-b font-bold text-xl py-4 bg-gray-100">
                Bài viết của {post?.post?.user?.fullName}
            </div>

            {/* Nội dung bài viết */}
            <div className="px-5 py-4 space-y-5">

                {/* Thông tin người đăng */}
                <div className="flex items-center space-x-4">
                    <Avatar src={post?.post?.user?.image} alt="User Avatar" className="w-10 h-10" />
                    <div>
                        <p className="font-semibold">{post.post?.user?.fullName}</p>
                        <p className="text-gray-500 text-sm">{formatTimeDifference(post?.createdAt)}</p>
                    </div>
                </div>

                {/* Nội dung text */}
                <p className="text-gray-700">{post.post?.content}</p>

                {/* Hình ảnh bài viết */}
                {post.post?.image && (
                    <img
                        className="w-full rounded-lg mt-3 shadow-sm object-cover max-h-[400px]"
                        src={post.post?.image}
                        alt="Post content"
                    />
                )}

                {/* Like, Comment, Share */}
                <div className="flex justify-between items-center border-t-2 border-b-2 p-3">
                    <div className="flex space-x-8 text-gray-600">
                        {post.post?.liked ? (
                            <div onClick={handleRemoveLikePost} className="flex items-center space-x-2 cursor-pointer text-pink-500 hover:text-pink-600">
                                <span>{post.post?.totalLikes}</span>
                                <FavoriteOutlinedIcon />
                            </div>
                        ) : (
                            <div onClick={handleLikePost} className="flex items-center space-x-2 cursor-pointer hover:text-pink-500">
                                <span>{post.post?.totalLikes}</span>
                                <FavoriteBorderOutlinedIcon />
                            </div>
                        )}
                        <div className="flex items-center space-x-2 cursor-pointer hover:text-blue-600">
                            <span>{post.post?.totalComment}</span>
                            <ChatBubbleOutlineOutlinedIcon />
                        </div>
                        <ShareOutlinedIcon className="cursor-pointer hover:text-green-500" />
                    </div>
                    <BookmarkBorderOutlinedIcon className="cursor-pointer hover:text-yellow-500" />
                </div>

                {/* Danh sách bình luận */}
                <div className='px-3'>
                    {post?.post?.comments
                        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                        .filter((comment) => comment.parentComment === null)
                        .map((comment) => (
                            <CommentCard key={comment.id} comment={comment} postId={id} />
                        ))}
                </div>
            </div>

            {/* Form nhập bình luận */}
            <div className="border-t bg-white p-4 absolute bottom-0 left-0 w-full shadow-md">
                <div className="flex items-start space-x-3">
                    <Avatar src={auth?.user?.image} alt="User Avatar" className="w-8 h-8" />
                    <form onSubmit={formik.handleSubmit} className="flex-1 space-y-2">
                        <TextField
                            id="content"
                            name="content"
                            variant="outlined"
                            value={formik.values.content}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.content}
                            fullWidth
                            placeholder="Viết bình luận..."
                            disabled={uploadingImage}
                            multiline
                            maxRows={4}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    backgroundColor: '#f5f5f5',
                                    '& fieldset': { border: 'none' },
                                },
                            }}
                        />
                        <div className="flex items-center space-x-3">
                            {/* Chọn ảnh */}
                            <label className="cursor-pointer flex items-center text-gray-600 hover:text-gray-800">
                                {uploadingImage ? (
                                    <CircularProgress size={24} />
                                ) : (
                                    <ImageOutlinedIcon />
                                )}
                                <input 
                                    type="file" 
                                    name="file" 
                                    className="hidden" 
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    disabled={uploadingImage}
                                />
                            </label>
                            {/* Nút gửi */}
                            <Button 
                                type="submit" 
                                variant="contained" 
                                color="primary" 
                                disabled={!formik.values.content.trim() || uploadingImage}
                                className="capitalize"
                            >
                                <SendOutlinedIcon fontSize="small" />
                            </Button>
                        </div>
                    </form>
                </div>

                {/* Hiển thị ảnh đã chọn */}
                {selectImage && (
                    <div className="relative mt-3 inline-block">
                        <button 
                            onClick={handleRemoveImage}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm shadow-md hover:bg-red-600 z-10"
                            type="button"
                            aria-label="Remove image"
                        >
                            <CancelOutlinedIcon fontSize="small" />
                        </button>
                        <img 
                            className="rounded-md border w-24 h-24 object-cover" 
                            src={selectImage} 
                            alt="Selected preview" 
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

export default PostDetails;
