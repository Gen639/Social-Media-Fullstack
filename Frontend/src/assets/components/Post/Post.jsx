import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { like, unlike } from "../../redux/posts/postsSlice";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";

const Post = () => {
  const { posts } = useSelector((state) => state.posts);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const post = posts?.map((post, index) => {
    const checkTheUserId = () => {
      for (const obj of post.likes) {
        if (obj.userId === user._id) {
          return true;
        }
      }
      return false;
    };

    const isPostedByUser = post.userId === user._id;

    const postStyle = {
      backgroundColor: isPostedByUser ? "lightblue" : "white",
      padding: "10px",
      margin: "10px",
      border: "1px solid #ccc",
    };

    const isLiked = checkTheUserId();

    return (
      <div key={post._id} style={postStyle}>
        <h3>Post nº {index + 1}</h3>
        <Link to={`/post/${post._id}`}>
          <p>{post.title}</p>
        </Link>
        <p>{post.content}</p>
        <span>Liked: {post.likes?.length} </span>
        {isLiked ? (
          <HeartFilled onClick={() => dispatch(unlike(post._id))} />
        ) : (
          <HeartOutlined onClick={() => dispatch(like(post._id))} />
        )}
      </div>
    );
  });

  return post;
};

export default Post;
