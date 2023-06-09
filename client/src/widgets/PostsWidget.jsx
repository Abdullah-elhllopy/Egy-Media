import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";
import API from "servers/API";

const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);

  const getPosts = async () => {
    try {
      const { data } = await API.get('posts')
      dispatch(setPosts({ posts: data }));
    } catch (error) {
      console.log(error.message)
    }
  };

  const getUserPosts = async () => {
    try {
      const { data } = await API.get(`posts/${userId}/posts`)
      dispatch(setPosts({ posts: data }));
    } catch (error) {
      console.log(error.message)
    }

  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {posts.map(
        ({
          _id,
          userId,
          description,
          location,
          picturePath,
          likes,
          comments,
        }) => (
          <PostWidget
            key={_id}
            postId={_id}
            postOwner={userId}
            description={description}
            location={location}
            picturePath={picturePath}
            likes={likes}
            comments={comments}
          />
        )
      )}
    </>
  );
};

export default PostsWidget;