import { Button, Grid2, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup'
import { registerUser } from '../../redux/Auth/action';
import { toast, ToastContainer } from 'react-toastify';
import { CLEAR_AUTH_FAILURE, CLEAR_AUTH_SUCCESS } from '../../redux/Auth/ActionType';

const validateSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required") // Phải nhập
                          .min(8, "Length min is 8 characters") // Độ dài tối thiểu là 8
                          .matches(/[a-zA-Z]/, "Password must contain at least one letter"), // Ít nhất 1 ký tự chữ,
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required("Confirm password is required"),
});

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
const days = Array.from({ length: 31 }, (_, i) => i + 1);
const months = [
    { value: 1, label: "January" },
    { value: 2, label: "February" },
    { value: 3, label: "March" },
    { value: 4, label: "April" },
    { value: 5, label: "May" },
    { value: 6, label: "June" },
    { value: 7, label: "July" },
    { value: 8, label: "August" },
    { value: 9, label: "September" },
    { value: 10, label: "October" },
    { value: 11, label: "November" },
    { value: 12, label: "December" }
];

const Signup = () => {
    const dispatch = useDispatch();
    const auth = useSelector(store => store.auth);

    const formik = useFormik({
        initialValues: {
            fullName: "",
            email: "",
            password: "",
            confirmPassword: "",
            dateOfBirth: {
                day: '',
                month: '',
                year: ''
            },
            image: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
        },
        validationSchema: validateSchema,
        onSubmit: (values, action) => {
            const { day, month, year } = values.dateOfBirth;
            const dateOfBirth = `${year}-${month}-${day}`;
            values.dateOfBirth = dateOfBirth;
            dispatch(registerUser(values));
            action.resetForm();
            console.log("values:", values);
        }
    });

    const handleDateChange = (name) => (event) => {
        formik.setFieldValue("dateOfBirth", {
            ...formik.values.dateOfBirth,
            [name]: event.target.value
        });
    };

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
        }else if (auth.userRegis) {
            toast.success("You signup success!", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            dispatch({type: CLEAR_AUTH_SUCCESS})
        } 
    };

    useEffect(() => {
        handleNotify();
    }, [auth?.userRegis, auth?.error]);

    return (
        <div className='w-full'>
            <ToastContainer />
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">SignUp</h2>
            <form onSubmit={formik.handleSubmit} className="space-y-4 text-center">
                <Grid2 container spacing={2}>
                    <Grid2 item size={{ xs: 12 }}>
                        <TextField
                            fullWidth
                            label="Full Name"
                            name="fullName"
                            variant='outlined'
                            size='large'
                            value={formik.values.fullName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.fullName && Boolean(formik.errors.fullName)}
                            helperText={formik.touched.fullName && formik.errors.fullName}
                        />
                    </Grid2>
                    <Grid2 item size={{ xs: 12 }}>
                        <TextField
                            fullWidth
                            label="Email"
                            name="email"
                            variant='outlined'
                            size='large'
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                        />
                    </Grid2>
                    <Grid2 item size={{ xs: 12 }}>
                        <TextField
                            fullWidth
                            label="Password"
                            name="password"
                            variant='outlined'
                            size='large'
                            type='password'
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                        />
                    </Grid2>
                    <Grid2 item size={{ xs: 12 }}>
                        <TextField
                            fullWidth
                            label="Confirm Password"
                            name="confirmPassword"
                            variant='outlined'
                            type='password'
                            value={formik.values.confirmPassword}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                            helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                        />
                    </Grid2>
                    <Grid2 item size={{ xs: 4 }}>
                        <InputLabel>Date</InputLabel>
                        <Select
                            name="day"
                            fullWidth
                            onChange={handleDateChange("day")}
                            onBlur={formik.handleBlur}
                            value={formik.values.dateOfBirth.day}
                        >
                            {days.map((day) => <MenuItem key={day} value={day}>{day}</MenuItem>)}
                        </Select>
                    </Grid2>
                    <Grid2 item size={{ xs: 4 }}>
                        <InputLabel>Month</InputLabel>
                        <Select
                            name="month"
                            fullWidth
                            onChange={handleDateChange("month")}
                            onBlur={formik.handleBlur}
                            value={formik.values.dateOfBirth.month}
                        >
                            {months.map((month) => <MenuItem key={month.value} value={month.value}>{month.label}</MenuItem>)}
                        </Select>
                    </Grid2>
                    <Grid2 item size={{ xs: 4 }}>
                        <InputLabel>Year</InputLabel>
                        <Select
                            name="year"
                            fullWidth
                            onChange={handleDateChange("year")}
                            onBlur={formik.handleBlur}
                            value={formik.values.dateOfBirth.year}
                        >
                            {years.map((year) => <MenuItem key={year} value={year}>{year}</MenuItem>)}
                        </Select>
                    </Grid2>
                    <Grid2 className="mt-10" item size={{ xs: 12 }}>
                        <Button
                            sx={{ borderRadius: "29px", py: "15px", bgcolor: 'blue' }}
                            type="submit"
                            fullWidth
                            variant='contained'
                            size='large'
                        >
                            Signup
                        </Button>
                    </Grid2>
                </Grid2>
            </form>
        </div>
    );
};

export default Signup;