import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { like, unlike } from "../../redux/posts/postsSlice";
import { HeartOutlined, HeartFilled, CommentOutlined } from "@ant-design/icons";

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
        <p>Post nº {index + 1}</p>
        <div>
          <h2>{post.title}</h2>
        </div>
        <p>{post.content}</p>
        <span>Liked: {post.likes?.length} </span>
        {isLiked ? (
          <HeartFilled onClick={() => dispatch(unlike(post._id))} />
        ) : (
          <HeartOutlined onClick={() => dispatch(like(post._id))} />
        )}
        <div>
          <Link to={`/post/${post._id}`}>
            {" "}
            <span>Comments: {post.commentsIds?.length} </span>
            <CommentOutlined />
          </Link>
        </div>
      </div>
    );
  });

  return post;
};

export default Post;
