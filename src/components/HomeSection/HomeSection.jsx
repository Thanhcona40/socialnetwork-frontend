import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import { ClipLoader } from 'react-spinners';
import { AnimatePresence } from 'framer-motion';
import PostsCard from '../Posts/PostsCard';
import SharePostsCard from '../Posts/SharePosts/SharePostsCard';
import PostCreationForm from './PostCreationForm';
import { createPosts, getAllPosts } from '../../redux/Posts/Action';

const HomeSection = () => {
  const [lastCreatedAt, setLastCreatedAt] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const post = useSelector(state => state.post);
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const handleCreatePost = (values) => {
    dispatch(createPosts(values));
  };

  const fetchInitialPosts = useCallback(() => {
    if (post?.posts?.length === 0) {
      dispatch(getAllPosts());
    }
  }, [dispatch, post.posts.length]);

  useEffect(() => {
    fetchInitialPosts();
  }, [fetchInitialPosts]);

  useEffect(() => {
    if (!post?.posts || post.posts.length === 0) return;

    if (post?.posts.length % 5 !== 0 && hasMore) {
      setHasMore(false);
    }
    const lastPostTime = post?.posts[post?.posts?.length - 1]?.createdAt;
    if (lastCreatedAt !== lastPostTime && lastPostTime !== undefined) {
      setLastCreatedAt(lastPostTime);
    }
  }, [post?.posts]);

  return (//HomeSection
    <div className="bg-white shadow-md rounded-lg mt-3">

      <PostCreationForm 
        user={auth.user} 
        onCreatePost={handleCreatePost} 
      />

      <section>
        <InfiniteScroll
          dataLength={post?.posts?.length}
          hasMore={hasMore}
          next={() => dispatch(getAllPosts(lastCreatedAt))}
          loader={
            <div className="flex justify-center py-4">
              <ClipLoader color="#9CA3AF" size={35} />
            </div>
          }
        >
          <AnimatePresence>
            {post?.posts?.map((item) =>
              item.originalPost === null ? (
                <PostsCard key={item.id} item={item} />
              ) : (
                <SharePostsCard key={item.id} item={item} />
              )
            )}
          </AnimatePresence>
        </InfiniteScroll>
      </section>
    </div>
  );
};

export default HomeSection;