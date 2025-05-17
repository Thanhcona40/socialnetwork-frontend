import { LOGOUT_USER } from "../Auth/ActionType";
import { bookmarkPost } from "./Action";
import { BOOKMARK_POST_SUCCESS, CLEAR_POST_SUCCESS, COMMENT_POST_FAILURE, COMMENT_POST_SUCCESS, DELETE_BOOKMARK_POST_SUCCESS, DELETE_POSTS_FAILURE, DELETE_POSTS_SUCCESS, GET_ALL_BOOKMARK_POST_SUCCESS, GET_ALL_POSTS_FAILURE, GET_ALL_POSTS_SUCCESS, GET_LIKE_POST_FAILURE, GET_LIKE_POST_SUCCESS, GET_POSTS_BY_ID_SUCCESS, GET_USER_POSTS_FAILURE, GET_USER_POSTS_SUCCESS, HIDDEN_POST_FAILURE, HIDDEN_POST_SUCCESS, HIDDEN_USER_FAILURE, HIDDEN_USER_SUCCESS, LIKE_COMMENT_FAILURE, LIKE_COMMENT_SUCCESS, LIKE_POST_FAILURE, LIKE_POST_SUCCESS, POST_CREATE_FAILURE, POST_CREATE_SUCCESS, REPLIES_COMMENT_FAILURE, REPLIES_COMMENT_SUCCESS, SHARE_POST_SUCCESS, UPDATE_POSTS_FAILURE, UPDATE_POSTS_SUCCESS } from "./ActionType";

const initialState = {
    user:null,
    post:null,
    posts:[],
    error:null,
    like:null,
    postsUser:[],
    bookmarkPosts:[]
}

export const PostsReducer = (state=initialState, action) => {
    switch (action.type) {
        case GET_ALL_POSTS_SUCCESS:
            return {...state,error:null, posts: [...state.posts,...action.payload]}
        case POST_CREATE_SUCCESS:
            return {...state,error:null, posts: [action.payload,...state.posts]}
        case GET_USER_POSTS_SUCCESS:
            return {...state, error:null, postsUser: action.payload}
        case GET_ALL_BOOKMARK_POST_SUCCESS:
            return {...state, error: null, bookmarkPosts: action.payload }
        case DELETE_BOOKMARK_POST_SUCCESS:
            return {...state, error:null, bookmarkPosts: state.bookmarkPosts.filter((bookmark) => bookmark.id !== action.payload.id)}
        case LIKE_POST_SUCCESS:
        case LIKE_COMMENT_SUCCESS:
        case BOOKMARK_POST_SUCCESS:
            return {...state,error:null, posts: state.posts.map((post) =>
                post.id === action.payload.id ? action.payload : post)}
        case REPLIES_COMMENT_SUCCESS :
            return {...state,error:null, posts: state.posts.map((post) => 
                post.id === action.payload.postId 
                ? {
                ...post,
                comments: 
                post.comments.map((comment) => 
                    post.id === action.payload.postId ? {...comment, replies: [action.payload, ...comment.replies]} : comment)
                }
            : post
        )}       
        case COMMENT_POST_SUCCESS:
            return {...state,error:null, posts: state.posts.map(
                (post) => post.id === action.payload.postId ? {...post,comments: [action.payload, ...post.comments]} : post
                )}
        case UPDATE_POSTS_SUCCESS:
            return {...state,error:null, successMessage: action.payload, posts: state.posts.map((post) =>
                                post.id === action.payload.id ? action.payload : post)}
        case GET_POSTS_BY_ID_SUCCESS:
            return {...state,error:null, post: action.payload}
        case SHARE_POST_SUCCESS:
            return {...state, error: null, sharePost: action.payload}
        case HIDDEN_POST_SUCCESS:
        case HIDDEN_USER_SUCCESS:
        case DELETE_POSTS_SUCCESS:
            return {...state, error:null, posts: state.posts.filter((post) => post.id !== action.payload.id) }
        case CLEAR_POST_SUCCESS:
            return {...state, successMessage: null}
        case LOGOUT_USER:
            return initialState
        default:
            return state;
    }
}