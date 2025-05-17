import { Avatar } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { formatTimeDifference } from '../../../Utils/formatTimeDifferent';
import { likeComment,  removelikeComment, repliesComment } from '../../../redux/Posts/Action';
import { getListFriend } from '../../../redux/Auth/action';

const CommentCard = ({comment,postId}) => {
    const [showReplyForm, setShowReplyForm] = useState(false);
    const [showFriendsList, setShowFriendList] = useState(false);
    const [replyContent, setReplyContent] = useState('');
    const [taggedUsers, setTaggedUsers] = useState([]);
    const [containReplyComment, setContainReplyComment] = useState(false)
    const [showReplyComment, setShowReplyComment] = useState(false)

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const auth = useSelector(store => store.auth)

    const handleLikeComment = (id) => {
        dispatch(likeComment(postId,id))
        console.log("liked true")
    }

    const handleDislikeComment = (id) => {
        dispatch(removelikeComment(postId,id))
        console.log("liked false")
    }

    const handleReplyClick = () => {
        setShowReplyForm(!showReplyForm);
    };

    const handleFriendSelect = (friend) => {
        const newComment = replyContent + friend.fullName
        setReplyContent(newComment)
        setTaggedUsers([...taggedUsers, friend])
        setShowFriendList(false);
    }

    const handleReplySubmit = (e) => {
        e.preventDefault();
        dispatch(repliesComment({postId, commentId: comment.id, content: replyContent, taggedUsers}))
        console.log("Reply content:", replyContent);
        setReplyContent('');
        setTaggedUsers([]);
        setShowReplyForm(false);
        setShowReplyComment(true)
    };

    const renderContentComment = (comment) => {
            return comment.content.split(/(@\w+)/).map((word, index) => {
                if (word.startsWith("@")) {
                  const username = word.substring(1);
                  const friend = comment.taggedUsers.find(u => u.fullName == username)
                  console.log("tag user id: ", friend.id)
                  if (friend) {
                    return <a key={index} onClick={() => navigate(`/profile/${friend.id}`)} className="text-blue-500 cursor-pointer">@{username}</a>;
                  }
                }
                return word;
              });
        }

    useEffect(() => {
        if(typeof replyContent === "string" && replyContent?.endsWith("@")){
            dispatch(getListFriend())
            setShowFriendList(true)
        }else{
            setShowFriendList(false)
        }

        if(comment.replies.length > 0){
            setContainReplyComment(true)
        }else{
            setContainReplyComment(false)
        }
    },[replyContent])

    return (
        <div className={`pt-3 flex space-x-4 w-full pl-4`}>
            <Avatar src={comment?.user?.image}/>
            <div>
                <div className='flex space-x-3'>
                    <p className='font-bold'>{comment?.user?.fullName}</p>
                    <p>{renderContentComment(comment)}</p>            
                </div>

                {/* Thêm hình ảnh của comment nếu có */}
                {comment.image && (
                <img
                    src={comment.image}
                    alt="comment-image"
                    className="mt-2 max-w-[10rem] rounded-lg object-cover"
                />
                )}
                <div className='flex text-gray-500 text-sm space-x-5 cursor-pointer'>
                    <p>{formatTimeDifference(comment?.createdAt)}</p>
                    {comment?.liked ?(
                        <p 
                            onClick={() => handleDislikeComment(comment?.id)} 
                            className={"text-pink-500"}>{comment?.totalLikes}likes</p>
                        ) : (
                        <p 
                            onClick={() => handleLikeComment(comment?.id)} 
                            className={"text-black"}>{comment?.totalLikes}likes</p>
                            )}
                    <p onClick={handleReplyClick}>reply</p>
                </div>
                {(containReplyComment && !showReplyComment) && (
                    <p className='text-sm text-gray-400 cursor-pointer pl-5 mt-2'
                        onClick={() => setShowReplyComment(true)}>Xem phản hồi...</p>
                )}
                {showReplyComment && (
                    <p
                        className='text-sm text-gray-400 cursor-pointer pl-5 mt-2'
                        onClick={() => setShowReplyComment(false)}
                    >
                        Ẩn phản hồi
                    </p>
                )}
                
                {showReplyComment && (
                    comment.replies.map((reply) => ( 
                        <div key={reply.id} className='pt-3 flex space-x-4 w-full pl-4'>
                            <Avatar src={reply?.user?.image} />
                            <div>
                                <div className='flex space-x-3'>
                                    <p className='font-bold'>{reply?.user?.fullName}</p>
                                    <p>{renderContentComment(reply)}</p>
                                </div>
                                <div className='flex text-gray-500 text-sm space-x-5 cursor-pointer'>
                                    <p>{formatTimeDifference(reply?.createdAt)}</p>
                                    {reply?.liked ? (
                                        <p
                                            onClick={() => handleDislikeComment(reply.id)}
                                            className={"text-pink-500"}
                                        >
                                            {reply?.totalLikes} likes
                                        </p>
                                    ) : (
                                        <p
                                            onClick={() => handleLikeComment(reply.id)}
                                            className={"text-black"}
                                        >
                                            {reply?.totalLikes} likes
                                        </p>
                                    )}
                                    <p onClick={() => handleReplyClick(reply)}>reply</p>
                                </div>
                            </div>
                        </div>
                    ))
                )}
                
                {showReplyForm && (
                    <form onSubmit={handleReplySubmit} className="mt-2 flex space-x-3 relative">
                        <input
                            type="text"
                            value={replyContent}
                            onChange={(e) => setReplyContent(e.target.value)}
                            placeholder="Write a reply..."
                            className="border p-2 w-full"
                        />
                        <button type="submit" className="mt-2 bg-blue-500 text-white p-1 rounded">
                            Send
                        </button>
                        {showFriendsList && (
                        <ul className='absolute bottom-full mb-2 w-full bg-white border rounded shadow-lg z-10'>
                            {auth?.listFriend?.map((friend) => (
                                <li key={friend.id} onClick={() => handleFriendSelect(friend.friend)} className='flex space-x-3'>
                                    <Avatar src={friend.friend.image}/>
                                    {friend.friend.fullName}
                                </li>
                            ))}
                        </ul>
                    )}
                    </form>
                )}
            </div>
        </div>
    );
}

export default CommentCard;
