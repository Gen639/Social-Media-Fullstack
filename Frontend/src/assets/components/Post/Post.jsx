import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { like } from "../../redux/posts/postsSlice";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";

const Post = () => {
  const { posts } = useSelector((state) => state.posts);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const post = posts?.map((post, index) => {
    const isLiked = post.likes?.includes(user?._id);
    return (
      <div key={post._id}>
        <h3>Post nº {index}</h3>
        <Link to={`/post/${post._id}`}>
          <p>{post.title}</p>
        </Link>
        <p>{post.content}</p>
        <span>Liked: {post.likes?.length} </span>
        {isLiked ? (
          <HeartFilled onClick={() => console.log("dislike")} />
        ) : (
          <HeartOutlined onClick={() => dispatch(like(post._id))} />
        )}
      </div>
    );
  });

  return post;
};

export default Post;
