import React, { useCallback } from 'react';
import Signin from './Signin';
import { useLocation, useNavigate } from 'react-router-dom';
import Signup from './Signup';

const Authentication = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const isSignin = location.pathname === "/signin";

    const handleNavigate = useCallback(() => {
      navigate(isSignin ? "/signup" : "/signin");
  }, [navigate, isSignin]);

    return (
      //Ảnh nền
      <div
        className="h-screen bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('https://cdn.pixabay.com/photo/2024/03/09/06/52/mountains-8622035_640.jpg')" }}
      >
        {/* Login Form */}
        <div className="relative z-10 bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
          {isSignin ? <Signin/> : <Signup/>}
          <button className='mt-2 underline' onClick={handleNavigate}>
            {isSignin ? "No account yet?" : "Do you have an account"}
          </button>
        </div>
      </div>
    );
}

export default Authentication;
