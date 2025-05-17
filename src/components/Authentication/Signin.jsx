import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import {  TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/Auth/action';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import { CLEAR_AUTH_FAILURE } from '../../redux/Auth/ActionType';

const validateSchema = Yup.object().shape({
    email : Yup.string().email("invalid email").required("Email is required"),
    password: Yup.string().required("Password is required")
  })
const Signin = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const auth = useSelector(store => store.auth)
    
    const formik = useFormik({
      initialValues:{
        email:"",
        password:"",
      },
      validateSchema,
      onSubmit: (values) => {
        dispatch(loginUser(values))
        navigate("/")
      }
    })

    //Thông báo đăng nhập lỗi
    const handleNotify = () => {
        if (auth.error) {
            toast.error(auth.error, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            dispatch({type: CLEAR_AUTH_FAILURE})
        }
    };

    useEffect(() => {
        handleNotify();
    }, [formik.handleSubmit]);

    return (
        <div className='w-full'>
            <ToastContainer/>
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>
            <form onSubmit={formik.handleSubmit} className="space-y-4 text-center">
                
                <TextField
                    name='email'
                    fullWidth
                    type='email'
                    label='email'
                    variant='outlined'
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur} 
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                />

                <TextField
                    name='password'
                    fullWidth
                    type='password'
                    label='password'
                    variant='outlined'
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur} 
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                />

                <button
                    type="submit"
                    className="w-28 py-2 mt-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none "
                >
                    Login
                </button>
            </form>
        </div>
    );
}

export default Signin;
