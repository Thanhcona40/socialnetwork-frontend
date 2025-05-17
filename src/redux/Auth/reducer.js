import { GET_ALL_POSTS_FAILURE } from "../Posts/ActionType";
import { ACCEPT_REQUEST_ADD_FRIEND_FAILURE, ACCEPT_REQUEST_ADD_FRIEND_SUCCESS, CLEAR_AUTH_FAILURE, CLEAR_AUTH_SUCCESS, GET_ALL_LIST_FRIEND_FAILURE, GET_ALL_LIST_FRIEND_SUCCESS, GET_ALL_REQUEST_ADD_FRIEND_FAILURE, GET_ALL_REQUEST_ADD_FRIEND_SUCCESS, GET_ALL_SEND_REQUEST_ADD_FRIEND_FAILURE, GET_ALL_SEND_REQUEST_ADD_FRIEND_SUCCESS, GET_ALL_USER_LIST_FAILURE, GET_ALL_USER_LIST_SUCCESS, GET_PROFILE_USER_ID_FAILURE, GET_PROFILE_USER_ID_SUCCESS, GET_PROFILE_USER_JWT_FAILURE, GET_PROFILE_USER_JWT_SUCCESS, LOGIN_USER_FAILURE, LOGIN_USER_SUCCESS, LOGOUT_USER, LOGOUT_USER_SUCCESS, REFUSE_REQUEST_ADD_FRIEND_FAILURE, REFUSE_REQUEST_ADD_FRIEND_SUCCESS, REGISTER_USER_FAILURE, REGISTER_USER_SUCCESS, REQUEST_ADD_FRIEND_FAILURE, REQUEST_ADD_FRIEND_SUCCESS, UNFRIEND_FAILURE, UNFRIEND_SUCCESS, UPDATE_STATUS_LIST_USER_SUCCESS, UPDATE_STATUS_USER_FAILURE, UPDATE_STATUS_USER_SUCCESS, UPDATE_USER_FAILURE, UPDATE_USER_SUCCESS } from "./ActionType";

const initialState = {
    user:null,
    error:null,
    jwt:null,
    requestFriend:null,
    listRequestFriend:[],
    listSendRequestFriend:[],
    listFriend:[]
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PROFILE_USER_JWT_FAILURE:
        case UPDATE_USER_FAILURE:
        case GET_PROFILE_USER_ID_FAILURE:
        case GET_ALL_USER_LIST_FAILURE:
        case UPDATE_STATUS_USER_FAILURE:
        case REQUEST_ADD_FRIEND_FAILURE:
        case ACCEPT_REQUEST_ADD_FRIEND_FAILURE:
        case REFUSE_REQUEST_ADD_FRIEND_FAILURE:
        case GET_ALL_REQUEST_ADD_FRIEND_FAILURE:
        case UNFRIEND_FAILURE:
        case GET_ALL_SEND_REQUEST_ADD_FRIEND_FAILURE:
        case GET_ALL_LIST_FRIEND_FAILURE:
            return {...state, error:action.payload}
        case LOGIN_USER_FAILURE:
        case REGISTER_USER_FAILURE:
            return {...state, error:action.payload,user:null}
        case LOGIN_USER_SUCCESS:
            return {...state, error:null, jwt:action.payload}
        case LOGOUT_USER:
            return initialState
        case GET_PROFILE_USER_JWT_SUCCESS:
            return {...state,error:null, user:action.payload}
        case REGISTER_USER_SUCCESS:
            return {...state,error:null, userRegis:action.payload}
        case GET_PROFILE_USER_ID_SUCCESS:
            return {...state, error:null, findUser: action.payload}
        case UPDATE_USER_SUCCESS:
            return {...state, error:null, findUser: action.payload, user:action.payload}
        case UPDATE_STATUS_LIST_USER_SUCCESS:
        case GET_ALL_LIST_FRIEND_SUCCESS:
            const combined = [...action.payload, ...state.listFriend];
            
            const unique = combined.filter((user, index, self) =>
                index === self.findIndex(u => u.id === user.id)
            );
            
            return {
                ...state,
                error: null,
                listFriend: unique
            };
        case UPDATE_STATUS_USER_SUCCESS:
            const updatedUser = action.payload;
            return {
              ...state,
              error: null,
              listFriend: state.listFriend.map(user => 
                user.id === updatedUser.id 
                  ? { ...user, status: updatedUser.status } 
                  : user
              ), // Cập nhật trạng thái bạn bè user
            };        
        case REQUEST_ADD_FRIEND_SUCCESS:
            return { ...state, error:null, requestFriend: action.payload}
        case ACCEPT_REQUEST_ADD_FRIEND_SUCCESS:
            return { ...state, error:null, requestFriend: action.payload}
        case REFUSE_REQUEST_ADD_FRIEND_SUCCESS:
            return { ...state, error:null, requestFriend: action.payload}
        case GET_ALL_REQUEST_ADD_FRIEND_SUCCESS:
            return { ...state, error:null, listRequestFriend: action.payload}
        case GET_ALL_SEND_REQUEST_ADD_FRIEND_SUCCESS:
            return { ...state, error:null, listSendRequestFriend: action.payload}
        case UNFRIEND_SUCCESS:
            return { ...state, error:null, deleteFriend: action.payload}
        case CLEAR_AUTH_FAILURE:
            return { ...state, error: null}
        case CLEAR_AUTH_SUCCESS:
            return { ...state, userRegis: null}
        default:
            return state;
    }
}