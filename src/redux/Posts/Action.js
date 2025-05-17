import { api } from "../../config/api"
import { BOOKMARK_POST_FAILURE, BOOKMARK_POST_SUCCESS, COMMENT_POST_FAILURE, COMMENT_POST_SUCCESS, DELETE_BOOKMARK_POST_FAILURE, DELETE_BOOKMARK_POST_SUCCESS, DELETE_POSTS_FAILURE, DELETE_POSTS_SUCCESS, GET_ALL_BOOKMARK_POST_FAILURE, GET_ALL_BOOKMARK_POST_SUCCESS, GET_ALL_POSTS_FAILURE, GET_ALL_POSTS_SUCCESS, GET_LIKE_POST_FAILURE, GET_LIKE_POST_SUCCESS, GET_POSTS_BY_ID_FAILURE, GET_POSTS_BY_ID_SUCCESS, GET_USER_POSTS_FAILURE, GET_USER_POSTS_SUCCESS, HIDDEN_POST_FAILURE, HIDDEN_POST_SUCCESS, HIDDEN_USER_FAILURE, HIDDEN_USER_SUCCESS, LIKE_COMMENT_FAILURE, LIKE_COMMENT_SUCCESS, LIKE_POST_FAILURE, LIKE_POST_SUCCESS, POST_CREATE_FAILURE, POST_CREATE_SUCCESS, REPLIES_COMMENT_FAILURE, REPLIES_COMMENT_SUCCESS, SHARE_POST_FAILURE, SHARE_POST_SUCCESS, UPDATE_POSTS_FAILURE, UPDATE_POSTS_SUCCESS } from "./ActionType"

export const createPosts = (post) => async (dispatch) => {
    try {
        const {data} = await api.post("/api/posts/", post)
        console.log("post: ", data)
        dispatch({type: POST_CREATE_SUCCESS, payload: data})
    } catch (error) {
        dispatch({type: POST_CREATE_FAILURE, payload: error.message})
    }
}

export const getAllPosts = (lastCreatedAt) => async (dispatch) => {
    try {
        const {data} = await api.get(`/api/posts/all?size=5${lastCreatedAt ? `&lastCreatedAt=${lastCreatedAt}` : ''}`)
        console.log("createdAt in function: " , lastCreatedAt)
        dispatch({type: GET_ALL_POSTS_SUCCESS, payload: data})
    } catch (error) {
        dispatch({type: GET_ALL_POSTS_FAILURE, payload: error.message})
    }
}

export const deletePosts = (postId) => async (dispatch) => {
    try {
        const {data} = await api.delete(`/api/posts/${postId}`)
        dispatch({type: DELETE_POSTS_SUCCESS, payload: data})
    } catch (error) {
        dispatch({type: DELETE_POSTS_FAILURE, payload: error.message})
    }
}

export const updatePost = (reqPost) => async (dispatch) => {
    try {
        const {data} = await api.put(`/api/posts/`,reqPost)
        dispatch({type: UPDATE_POSTS_SUCCESS, payload: data})
    } catch (error) {
        dispatch({type: UPDATE_POSTS_FAILURE, payload: error.message})
    }
}

export const getPostById = (postId) => async (dispatch) => {
    try {
        const {data} = await api.get(`/api/posts/${postId}`)
        dispatch({type: GET_POSTS_BY_ID_SUCCESS, payload: data})
    } catch (error) {
        dispatch({type: GET_POSTS_BY_ID_FAILURE, payload: error.message})
    }
}

export const getUserPosts =(userId) => async (dispatch) => {
    try {
        const {data} = await api.get(`/api/posts/user/${userId}`)
        dispatch({type: GET_USER_POSTS_SUCCESS, payload: data})
    } catch (error) {
        dispatch({type: GET_USER_POSTS_FAILURE, payload: error.message})
    }
}

export const likePosts = (postId) => async (dispatch) => {
    try {
        const {data} = await api.get(`/api/likes/post/${postId}`)
        console.log("like: ", data)
        dispatch({type: LIKE_POST_SUCCESS, payload: data})
    } catch (error) {
        dispatch({type: LIKE_POST_FAILURE, payload: error.message})
    }
}

export const removelikePosts = (postId) => async (dispatch) => {
    try {
        const {data} = await api.delete(`/api/likes/post/${postId}`)
        console.log("like: ", data)
        dispatch({type: LIKE_POST_SUCCESS, payload: data})
    } catch (error) {
        dispatch({type: LIKE_POST_FAILURE, payload: error.message})
    }
}

export const likeComment = (postId,commentId) => async (dispatch) => {
    try {
        const {data} = await api.get(`/api/likes/comment/${postId}/${commentId}`)
        console.log("like: ", data)
        dispatch({type: LIKE_COMMENT_SUCCESS, payload: data})
    } catch (error) {
        dispatch({type: LIKE_COMMENT_FAILURE, payload: error.message})
    }
}

export const removelikeComment = (postId,commentId) => async (dispatch) => {
    try {
        const {data} = await api.delete(`/api/likes/comment/${postId}/${commentId}`)
        console.log("like: ", data)
        dispatch({type: LIKE_COMMENT_SUCCESS, payload: data})
    } catch (error) {
        dispatch({type: LIKE_COMMENT_FAILURE, payload: error.message})
    }
}

export const getAllLikePosts = (postId) => async (dispatch) => {
    try {
        const {data} = await api.get(`/api/likes/all/${postId}`)
        dispatch({type: GET_LIKE_POST_SUCCESS, payload: data})
    } catch (error) {
        dispatch({type: GET_LIKE_POST_FAILURE, payload: error.message})
    }
}

export const commentPost = (postReq) => async (dispatch) => {
    try {
        const {data} = await api.post(`/api/comment/`, postReq)
        console.log("comment post: ", data)
        dispatch({type: COMMENT_POST_SUCCESS, payload: data})
    } catch (error) {
        dispatch({type: COMMENT_POST_FAILURE, payload: error.message})
    }
}

export const repliesComment = (repliesRequest) => async (dispatch) => {
    try {
        const {data} = await api.post(`/api/comment/reply`, repliesRequest)
        console.log("post data reply: ", data)
        dispatch({type: REPLIES_COMMENT_SUCCESS, payload: data})
    } catch (error) {
        dispatch({type: REPLIES_COMMENT_FAILURE, payload: error.message})
    }
}

export const hiddenUser = (postId) => async (dispatch) => {
    try {
        const {data} = await api.post(`/api/posts/${postId}/hiddenUser`)
        console.log("hidden post: ", data)
        dispatch({type: HIDDEN_USER_SUCCESS, payload: data})
    } catch (error) {
        dispatch({type: HIDDEN_USER_FAILURE, payload: error.message})
    }
}

export const hiddenPosts = (postId) => async (dispatch) => {
    try {
        const {data} = await api.post(`/api/posts/${postId}/hiddenPost`)
        console.log("hidden post: ", data)
        dispatch({type: HIDDEN_POST_SUCCESS, payload: data})
    } catch (error) {
        dispatch({type: HIDDEN_POST_FAILURE, payload: error.message})
    }
}

export const sharePost = (postRequest) => async (dispatch) => {
    try {
        const {data} = await api.post(`/api/posts/sharepost`,postRequest)
        console.log("share post: ", data)
        dispatch({type: POST_CREATE_SUCCESS, payload: data})
    } catch (error) {
        dispatch({type: POST_CREATE_FAILURE, payload: error.message})
    }
}

export const bookmarkPost = (postId) => async (dispatch) => {
    try {
        const {data} = await api.post(`/api/bookmark/${postId}`)
        console.log("book post: ", data)
        dispatch({type: BOOKMARK_POST_SUCCESS, payload: data})
    } catch (error) {
        dispatch({type: BOOKMARK_POST_FAILURE, payload: error.message})
    }
}

export const getBookmarkUser = () => async (dispatch) => {
    try {
        const {data} = await api.get(`/api/bookmark/`)
        console.log("bookmark all post: ", data)
        dispatch({type: GET_ALL_BOOKMARK_POST_SUCCESS, payload: data})
    } catch (error) {
        dispatch({type: GET_ALL_BOOKMARK_POST_FAILURE, payload: error.message})
    }
}

export const deleteBookmark = (bookmarkId) => async (dispatch) => {
    try {
        const {data} = await api.delete(`/api/bookmark/${bookmarkId}`)
        console.log("bookmark all post: ", data)
        dispatch({type: DELETE_BOOKMARK_POST_SUCCESS, payload: data})
    } catch (error) {
        dispatch({type: DELETE_BOOKMARK_POST_FAILURE, payload: error.message})
    }
}



