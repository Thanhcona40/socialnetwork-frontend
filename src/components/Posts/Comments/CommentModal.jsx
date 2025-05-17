import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { Avatar, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import { commentPost, likePosts, removelikePosts } from '../../../redux/Posts/Action';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import { uploadToCloudinary } from '../../../Utils/uploadToCloudinary';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import { formatTimeDifference } from '../../../Utils/formatTimeDifferent';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import CommentCard from './CommentCard';
import PostImages from '../PostImages';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    height: '700px',
};

const validateSchema = Yup.object().shape({
    content: Yup.string().required("Text is required")
})

export default function CommentModal({ item, open, handleClose }) {
    const auth = useSelector(store => store.auth)
    const dispatch = useDispatch()
    const [selectImage, setSelectImage] = React.useState("")
    const [uploadingImage, setUploadingImage] = React.useState(false)
    
    const formik = useFormik({
        initialValues: {
            content: "",
            image: "",
            postId: item?.id,
        },
        validateSchema,
        onSubmit: (values, action) => {
            dispatch(commentPost(values))
            setSelectImage("")
            action.resetForm()
        }
    })

    const handleLikePost = () => {
        dispatch(likePosts(item?.id))
    }

    const handleRemoveLikePost = () => {
        dispatch(removelikePosts(item?.id))
    }

    const handleImageChange = async (event) => {
        setUploadingImage(true)
        const imgUrl = await uploadToCloudinary(event.target.files[0])
        formik.setFieldValue("image", imgUrl) // cho url vao
        setSelectImage(imgUrl) // cho url vao
        setUploadingImage(false)
    }

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className="rounded-lg overflow-y-hidden">

                    {/* Header */}
                    <div className="flex justify-center items-center border-b font-bold text-xl py-4 bg-gray-100">
                        Post of {item.user.fullName}
                    </div>

                    {/* Nội dung bài viết */}
                    <div className="overflow-y-scroll max-h-[500px] px-5 py-4 space-y-5">

                        {/* Thông tin người đăng */}
                        <div className="flex items-center space-x-4">
                            <Avatar src={item?.user?.image} alt="User Avatar" className="w-10 h-10" />
                            <div>
                                <p className="font-semibold">{item?.user?.fullName}</p>
                                <p className="text-gray-500 text-sm">{formatTimeDifference(item?.createdAt)}</p>
                            </div>
                        </div>

                        {/* Nội dung text */}
                        <p className="text-gray-700">{item?.content}</p>

                        {/* Hình ảnh bài viết */}
                        <div className='mt-5 m-auto w-[20vw] h-[30vh]'>
                            <PostImages images={item.image} />
                        </div>

                        {/* Like, Comment, Share */}
                        <div className="flex justify-between items-center border-t-2 border-b-2 p-3">
                            <div className="flex space-x-8 text-gray-600">
                                {item?.liked ? (
                                    <div onClick={handleRemoveLikePost} className="flex items-center space-x-2 cursor-pointer text-pink-500 hover:text-pink-600">
                                        <span>{item?.totalLikes}</span>
                                        <FavoriteOutlinedIcon />
                                    </div>
                                ) : (
                                    <div onClick={handleLikePost} className="flex items-center space-x-2 cursor-pointer hover:text-pink-500">
                                        <span>{item?.totalLikes}</span>
                                        <FavoriteBorderOutlinedIcon />
                                    </div>
                                )}
                                <div className="flex items-center space-x-2 cursor-pointer hover:text-blue-600">
                                    <span>{item?.totalComment}</span>
                                    <ChatBubbleOutlineOutlinedIcon />
                                </div>
                                <ShareOutlinedIcon className="cursor-pointer hover:text-green-500" />
                            </div>
                            <BookmarkBorderOutlinedIcon className="cursor-pointer hover:text-yellow-500" />
                        </div>

                        {/* Danh sách bình luận */}
                        <div className='px-3'>
                            {item?.comments
                            .sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                            .filter((comment) => comment.parentComment === null)
                            .map((comment) => (
                                <CommentCard key={comment.id} comment={comment} postId={item.id} />
                            ))}
                        </div>
                    </div>

                    {/* Form nhập bình luận */}
                    <div className="border-t bg-white p-4 fixed bottom-0 right-0 left-0 shadow-md">
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
                                        <ImageOutlinedIcon />
                                        <input type="file" name="file" className="hidden" onChange={handleImageChange} />
                                    </label>
                                    {/* Nút gửi */}
                                    <Button type="submit" variant="contained" color="primary" className="capitalize">
                                        <SendOutlinedIcon fontSize="small" />
                                    </Button>
                                </div>
                            </form>
                        </div>

                        {/* Hiển thị ảnh đã chọn */}
                        {selectImage && (
                            <div className="relative mt-3 w-24 h-24">
                                {/* Nút X nằm trên đầu ảnh */}
                                <button
                                    onClick={() => setSelectImage(null)}
                                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs shadow hover:bg-red-600 z-10"
                                >
                                    <CancelOutlinedIcon fontSize="small" />
                                </button>

                                {/* Ảnh hiển thị phía dưới */}
                                <img
                                    className="rounded-md border w-full h-full object-cover"
                                    src={selectImage}
                                    alt="Selected"
                                />
                            </div>
                        )}
                    </div>
                </Box>
            </Modal>
        </div>

    );
}

