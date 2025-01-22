import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { like, unlike } from "../../redux/posts/postsSlice";
import { HeartOutlined, HeartFilled, CommentOutlined } from "@ant-design/icons";
import "./Post.css";

const Post = () => {
  const { posts } = useSelector((state) => state.posts);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const reversedPosts = posts.slice().reverse();

  const post = reversedPosts?.map((post, index) => {
    const checkTheUserId = () => {
      for (const obj of post.likes) {
        if (obj.userId === user._id) {
          return true;
        }
      }
      return false;
    };
    // console.log(post);
    const isPostedByUser = post.userId === user._id;

    const isLiked = checkTheUserId();

    const manageLikes = () => {
      if (!isLiked) {
        dispatch(like(post._id)).then(() => dispatch(getById(post._id)));
      } else {
        dispatch(unlike(post._id)).then(() => dispatch(getById(post._id)));
      }
    };
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toISOString().split("T")[0];
    };
    console.log(
      `From post, the number of likes in the array of each post is ${post.likes.length}`
    );
    return (
      <div
        key={post._id}
        className={`card ${isPostedByUser ? "user-post" : ""}`}
      >
        <h2 className="title">{post.title}</h2>

        <div className="post-info">
          <p>User ID:{post.userId}</p>
          <p>Posted on: {formatDate(post.createdAt)}</p>
        </div>
        <hr></hr>
        <p className="content ">{post.content}</p>
        <div className="post-footer">
          <button className="likes" onClick={manageLikes}>
            <span>Likes: {post.likes?.length} </span>
            {isLiked ? <HeartFilled /> : <HeartOutlined />}
          </button>
          <button className="comments">
            <Link to={`/post/${post._id}`}>
              <span>Comments: {post.commentsIds?.length} </span>
              <CommentOutlined />
            </Link>
          </button>
        </div>
      </div>
    );
  });

  return post;
};

export default Post;
