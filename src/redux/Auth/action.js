import axios from "axios"
import { api, API_BASE_URL } from "../../config/api"
import { ACCEPT_REQUEST_ADD_FRIEND_FAILURE, ACCEPT_REQUEST_ADD_FRIEND_SUCCESS, GET_ALL_LIST_FRIEND_FAILURE, GET_ALL_LIST_FRIEND_SUCCESS, GET_ALL_REQUEST_ADD_FRIEND_FAILURE, GET_ALL_REQUEST_ADD_FRIEND_SUCCESS, GET_ALL_SEND_REQUEST_ADD_FRIEND_FAILURE, GET_ALL_SEND_REQUEST_ADD_FRIEND_SUCCESS, GET_ALL_USER_LIST_FAILURE, GET_ALL_USER_LIST_SUCCESS, GET_PROFILE_USER_ID_FAILURE, GET_PROFILE_USER_ID_SUCCESS, GET_PROFILE_USER_JWT_FAILURE, GET_PROFILE_USER_JWT_SUCCESS, LOGIN_USER_FAILURE, LOGIN_USER_SUCCESS, LOGOUT_USER, REFUSE_REQUEST_ADD_FRIEND_FAILURE, REFUSE_REQUEST_ADD_FRIEND_SUCCESS, REGISTER_USER_FAILURE, REGISTER_USER_SUCCESS, REQUEST_ADD_FRIEND_FAILURE, REQUEST_ADD_FRIEND_SUCCESS, UNFRIEND_FAILURE, UNFRIEND_SUCCESS, UPDATE_STATUS_LIST_USER_FAILURE, UPDATE_STATUS_LIST_USER_SUCCESS, UPDATE_STATUS_USER_FAILURE, UPDATE_STATUS_USER_SUCCESS, UPDATE_USER_FAILURE, UPDATE_USER_SUCCESS } from "./ActionType"

export const registerUser = (registerData) => async (dispatch) => {
    try {
        const {data} = await axios.post(`${API_BASE_URL}/auth/signup`,registerData)
        dispatch({type: REGISTER_USER_SUCCESS, payload: data})
    } catch (error) {
        console.log("error signup: ", error)
        dispatch({type: REGISTER_USER_FAILURE, payload: error.response.data})
    }
}

export const loginUser = (loginData) => async (dispatch) => {
    try {
        const {data} = await axios.post(`${API_BASE_URL}/auth/signin`,loginData,
            {withCredentials: true});
        console.log("vua dang nhap: ",data)
        if(data != null) {
            localStorage.setItem("accessToken", data.accessToken)
        }
        dispatch({type: LOGIN_USER_SUCCESS, payload: data.accessToken})
    } catch (error) {
        dispatch({type: LOGIN_USER_FAILURE, payload: error.response.data})
    }
}

export const logOut = () => async (dispatch) => {
    try {
        await axios.get(`${API_BASE_URL}/auth/logout`, { withCredentials: true });
        console.log("log out")
        localStorage.removeItem("accessToken");
        dispatch({ type: LOGOUT_USER, payload: null });
    } catch (error) {
        console.log("error logout: ", error.message)
    }
};


export const getProfileByJwt = () => async (dispatch) => {
    try {
        const {data} = await api.get("/api/users/profile")
        dispatch({type: GET_PROFILE_USER_JWT_SUCCESS, payload: data})
    } catch(error) {
        dispatch({type: GET_PROFILE_USER_JWT_FAILURE, payload: error.message})
    }
}

export const getProfileByUserId = (userId) => async (dispatch) => {
    try {
        const {data} = await api.get(`/api/users/${userId}`)
        console.log("findUser: ", data)
        dispatch({type: GET_PROFILE_USER_ID_SUCCESS, payload: data})
    } catch (error) {
        dispatch({type: GET_PROFILE_USER_ID_FAILURE, payload: error.message})
    }
}

export const updateUser = (user) => async (dispatch) => {
    try {
        const {data} = await api.put(`/api/users/update`, user)
        console.log("user update: " , data)
        dispatch({type: UPDATE_USER_SUCCESS, payload: data})
    } catch (error) {
        dispatch({type: UPDATE_USER_FAILURE, payload: error.message})
    }
} 

export const updateUserStatus = (user) => async (dispatch) => {
    try {
        console.log("user update status: " , user)
        dispatch({type: UPDATE_STATUS_USER_SUCCESS, payload: user})
    } catch (error) {
        dispatch({type: UPDATE_STATUS_USER_FAILURE, payload: error.message})
    }
} 

export const updateUserListStatus = (listUser) => async (dispatch) => {
    try {
        dispatch({type: UPDATE_STATUS_LIST_USER_SUCCESS, payload: listUser})
    } catch (error) {
        dispatch({type: UPDATE_STATUS_LIST_USER_FAILURE, payload: error.message})
    }
} 

export const requestAddFriend = (userId) => async (dispatch) => {
    try {
        const {data} = await api.get(`/api/friend/require/${userId}`)
        dispatch({type: REQUEST_ADD_FRIEND_SUCCESS, payload: data})
    } catch (error) {
        dispatch({type: REQUEST_ADD_FRIEND_FAILURE, payload: error.message})
    }
} 

export const acceptAddFriend = (userId) => async (dispatch) => {
    try {
        const {data} = await api.get(`/api/friend/accept/${userId}`)
        console.log("id cua ng gui friend: ", userId)
        console.log("add friend: ", data)
        dispatch({type: ACCEPT_REQUEST_ADD_FRIEND_SUCCESS, payload: data})
    } catch (error) {
        dispatch({type: ACCEPT_REQUEST_ADD_FRIEND_FAILURE, payload: error.message})
    }
} 

export const refuseAddFriend = (userId) => async (dispatch) => {
    try {
        const {data} = await api.get(`/api/friend/refuse/${userId}`)
        console.log("refuse friend: ", data)
        dispatch({type: REFUSE_REQUEST_ADD_FRIEND_SUCCESS, payload: data})
    } catch (error) {
        dispatch({type: REFUSE_REQUEST_ADD_FRIEND_FAILURE, payload: error.message})
    }
} 

export const getAllRequestAddFriend = () => async (dispatch) => {
    try {
        const {data} = await api.get(`/api/friend/all/request_add_friend`)
        dispatch({type: GET_ALL_REQUEST_ADD_FRIEND_SUCCESS, payload: data})
    } catch (error) {
        dispatch({type: GET_ALL_REQUEST_ADD_FRIEND_FAILURE, payload: error.message})
    }
} 

export const getAllSend_RequestAddFriend = () => async (dispatch) => {
    try {
        const {data} = await api.get(`/api/friend/all/send_request_add_friend`)
        console.log("send request all: ", data)
        dispatch({type: GET_ALL_SEND_REQUEST_ADD_FRIEND_SUCCESS, payload: data})
    } catch (error) {
        dispatch({type: GET_ALL_SEND_REQUEST_ADD_FRIEND_FAILURE, payload: error.message})
    }
} 

export const requestRemoveFriend = (userId) => async (dispatch) => {
    try {
        const {data} = await api.delete(`/api/friend/unfriend/${userId}`)
        console.log("delete friend: ", data)
        dispatch({type: UNFRIEND_SUCCESS, payload: data})
    } catch (error) {
        dispatch({type: UNFRIEND_FAILURE, payload: error.message})
    }
} 

export const getListFriend = () => async (dispatch) => {
    try {
        const {data} = await api.get(`/api/friend/`)
        console.log("list friend: ", data)
        dispatch({type: GET_ALL_LIST_FRIEND_SUCCESS, payload: data})
    } catch (error) {
        dispatch({type: GET_ALL_LIST_FRIEND_FAILURE, payload: error.message})
    }
}