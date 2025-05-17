import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { logOut } from '../redux/Auth/action';
import { LOGIN_USER_SUCCESS } from '../redux/Auth/ActionType';
import { API_BASE_URL } from '../config/api';

export const useAuth = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const accessToken = localStorage.getItem('accessToken');

  const checkAuth = useCallback(async () => {
    try{
      const { data } = await axios.post(`${API_BASE_URL}/auth/refresh-token`, {}, {
          withCredentials: true, // Tự động gửi refreshToken từ cookie
      });
      localStorage.setItem("accessToken",data.accessToken)
      dispatch({type: LOGIN_USER_SUCCESS, payload: data.accessToken})
    } catch(err) {
      console.error("Refresh Token failed: " ,err.response.data)
      dispatch(logOut())
    }
  },[dispatch])

  useEffect(() => {
    if (!accessToken) {
      dispatch(logOut());
    } else {
      checkAuth();
    }
  }, [accessToken, checkAuth, dispatch]);

  return { auth, checkAuth };
};