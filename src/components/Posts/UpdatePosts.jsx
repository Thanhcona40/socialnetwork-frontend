import React, { useEffect, useState } from 'react';
import { formatTimeDifference } from '../../Utils/formatTimeDifferent';
import {Avatar, Button, IconButton} from '@mui/material';
import CloseIcon from "@mui/icons-material/Close"
import { Box, Modal, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { uploadToCloudinary } from '../../Utils/uploadToCloudinary';
import { useDispatch } from 'react-redux';
import { updatePost } from '../../redux/Posts/Action';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    boxShadow: 24,
    height: '700px',
};

const UpdatePosts = ({item,open,handleClose}) => {
    const [selectedImage, setSelectedImage] = React.useState("")
    const [uploading, setUploading] = React.useState(false)
    const [content, setContent] = useState('')
    const dispatch = useDispatch()
    
    const formik = useFormik({
      initialValues:{
        image:"",
        content:"",
        id: item.id
      },
      onSubmit: (values) => {
        console.log("updateuser form: ", values)
        dispatch(updatePost(values))
        handleCloseModal()
      }
    })
  
    const handleImageChange = async (event) => {
      setUploading(true)
      const {name} = event.target
      const file =  await uploadToCloudinary(event.target.files[0])
      formik.setFieldValue(name,file);
      setSelectedImage(file)
      setUploading(false)
    }

    const handleCloseModal = () => {
        handleClose(); 
        formik.values.content = "" 
        setSelectedImage(""); 
    };

    useEffect(() => {
        if(item?.content) {
            setContent(item.content)
        }
    },[item.content])

    return (
        <Modal
            open={open}
            onClose={handleCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style} className="rounded-lg">
                <form onSubmit={formik.handleSubmit}>
                    <div className="px-5 py-4 space-y-5">
                        {/* Thông tin người đăng */}
                        <div className="flex justify-between">
                            <div className='flex items-center space-x-4'>
                                <Avatar src={item?.user?.image} alt="User Avatar" className="w-10 h-10" />
                                <div>
                                    <p className="font-semibold">{item?.user?.fullName}</p>
                                    <p className="text-gray-500 text-sm">{formatTimeDifference(item?.createdAt)}</p>
                                </div>
                            </div>
                            <div className='flex items-center justify-between'>
                                <div className='flex items-center space-x-3'>
                                    <IconButton onClick={handleCloseModal} arial-label="delete">
                                        <CloseIcon />
                                    </IconButton>
                                </div>
                                <Button type='submit'>Save</Button>
                            </div>
                        </div>

                        {/* Nội dung text */}
                       <TextField
                            id='content'
                            name='content'
                            variant='standard'
                            value={formik.values.content || item.content}
                            onChange={formik.handleChange}
                        />

                        {/* Hình ảnh bài viết */}
                        {item?.image && (
                            <div className='relative'>
                                <img
                                    className="w-full rounded-lg mt-3 shadow-sm object-cover max-h-[400px]"
                                    src={selectedImage || item.image}
                                    alt="Post content"
                                />
                                <input
                                    className='absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer'
                                    type='file'
                                    name='image'
                                    onChange={handleImageChange} />
                            </div>
                        )}
                    </div>
                </form>
            </Box>
        </Modal>
    );
}

export default UpdatePosts;
