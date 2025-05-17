import { useFormik } from 'formik';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sharePost } from '../../../redux/Posts/Action';
import { Avatar, Box, Button, Modal, TextField } from '@mui/material';
import * as Yup from 'yup'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    boxShadow: 24,
    height: '300px',
};

const validateSchema = Yup.object().shape({
    content: Yup.string().required("Text is required")
})

const SharePostModal = ({ item, open, handleClose }) => {
    const auth = useSelector(store => store.auth)
    const dispatch = useDispatch()

    const formik = useFormik({
            initialValues: {
                content: "",
                image: "",
                postId: item?.id,
            },
            validateSchema,
            onSubmit: (values, action) => {
                dispatch(sharePost(values))
                action.resetForm()
                handleClose()
            }
        })
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
                        Share Post 
                    </div>

                    {/* Nội dung bài viết */}
                    <div className="px-5 py-4 space-y-5">
                        {/* Thông tin người đăng */}
                        <div className="flex items-center space-x-4">
                            <Avatar src={auth?.user?.image} alt="User Avatar" className="w-10 h-10" />
                            <p className="font-semibold">{auth?.user?.fullName}</p>
                        </div>
                        <form onSubmit={formik.handleSubmit} className="flex-1 space-y-2">
                            <TextField
                                id="content"
                                name="content"
                                value={formik.values.content}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.content}
                                placeholder="Write something ..."
                                variant="standard" // hoặc "outlined" tùy bạn
                                InputProps={{
                                    disableUnderline: true, // nếu dùng variant="standard"
                                    style: { border: 'none', boxShadow: 'none' }, // ẩn viền
                                }}
                            />

                            <div className="flex justify-end mt-2">
                                <Button type="submit" variant="contained" color="primary">
                                    Share now
                                </Button>
                            </div>
                        </form>

                    </div>

                </Box>
            </Modal>
        </div>
    );
}

export default SharePostModal;
