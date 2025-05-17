import * as React from 'react';
import Modal from '@mui/material/Modal';
import { Avatar, Box, Button, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../redux/Auth/action';
import {IconButton} from '@mui/material';
import CloseIcon from "@mui/icons-material/Close"
import { uploadToCloudinary } from '../../Utils/uploadToCloudinary';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ProfileModal({open, handleClose}) {
  const [selectedAvatarImage, setSelectedAvatarImage] = React.useState("")
  const [selectedBackgroundImage, setSelectedBackgroundImage] = React.useState("")
  const [uploading, setUploading] = React.useState(false)
  
  const formik = useFormik({
    initialValues:{
      fullName:"",
      location:"",
      birthOfDate:"",
      bio:"",
      numberPhone:"",
      image:"",
      backgroundImage:"",
    },
    onSubmit: (values) => {
      console.log("updateuser form: ", values)
      dispatch(updateUser(values))
      handleClose()
    }
  })

  const {auth} = useSelector(store => store)
  const dispatch = useDispatch()
  
  const handleImageChange = async (event) => {
    event.stopPropagation()
    setUploading(true)
    const {name} = event.target
    const file =  await uploadToCloudinary(event.target.files[0])
    formik.setFieldValue(name,file);
    if (name === 'backgroundImage') {
      setSelectedBackgroundImage(file); // Cập nhật ảnh nền
    } else if (name === 'image') {
      setSelectedAvatarImage(file); // Cập nhật ảnh đại diện
    }
    setUploading(false)
  }
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={formik.handleSubmit}>
            <div className='flex items-center justify-between'>
              <div className='flex items-center space-x-3'>
                <IconButton onClick={handleClose} arial-label="delete">
                    <CloseIcon/>
                </IconButton>
                <p>Edit profile</p>
              </div>
              <Button type='submit'>Save</Button>
            </div>
            <div className='hideScrollBar'>
              <React.Fragment>
                <div className='w-full'>
                    <div className='relative'>
                      <img
                      className='w-full h-[12rem] object-cover object-center'
                       src={selectedBackgroundImage || auth?.findUser?.backgroundImage}/>
                      <input 
                        className='absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer'
                        type='file'
                        name='backgroundImage'
                        onChange={handleImageChange}/>
                    </div>
                </div>
                <div className='w-full transform -translate-y-20 ml-4 h-[6rem]'>
                  <div className='relative'>
                      <Avatar
                        sx={{width:"10rem",height:"10rem",border:"4px solid white"}}
                        src={selectedAvatarImage || auth?.findUser?.image }
                        />
                        <input 
                        className='absolute top-0 left-0 w-[10rem] h-full opacity-0 cursor-pointer'
                        type="file" 
                        name="image"
                        onChange={handleImageChange}/>
                  </div>
                </div>
              </React.Fragment>
              <div className='space-y-3'>
                <TextField
                  id='fullName'
                  name='fullName'
                  fullWidth
                  variant='outlined'
                  value={formik.values.fullName || auth?.findUser?.fullName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.fullName && Boolean(formik.errors.fullName)}
                />
                <TextField
                  id='location'
                  label="location"
                  name='location'
                  fullWidth
                  variant='outlined'
                  value={formik.values.location || auth?.findUser?.location}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.location && Boolean(formik.errors.location)}
                />
                <TextField
                  id='numberPhone'
                  label="numberPhone"
                  name='numberPhone'
                  fullWidth
                  variant='outlined'
                  value={formik.values.numberPhone || auth?.findUser?.numberPhone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.numberPhone && Boolean(formik.errors.numberPhone)}
                />
                <TextField
                  id='bio'
                  label="bio"
                  name='bio'
                  fullWidth
                  variant='outlined'
                  value={formik.values.bio || auth?.findUser?.bio}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.bio && Boolean(formik.errors.bio)}
                />
              </div>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}