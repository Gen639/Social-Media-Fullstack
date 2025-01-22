import { useParams } from "react-router-dom";
import { getById } from "../../../redux/posts/postsSlice";
import React, { useEffect } from "react";
import { like, unlike } from "../../../redux/posts/postsSlice";
import { useDispatch, useSelector } from "react-redux";
import Comments from "../../Comments/Comments";
import { HeartOutlined, HeartFilled, CommentOutlined } from "@ant-design/icons";

import "./PostDetail.css";
import CreateComment from "../../CreateComment/CreateComment";

const PostDetail = () => {
  const { id } = useParams();
  const { post } = useSelector((state) => state.posts);
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getById(id));
  }, []);

  const checkTheUserId = () => {
    return (
      post.likes?.some(
        (likeObj) => likeObj.userId === user._id && likeObj.like
      ) ?? false
    );
  };

  console.log(`this is post`, post);
  const isLiked = checkTheUserId();

  const manageLikes = () => {
    if (!isLiked) {
      dispatch(like(post._id));
    } else {
      dispatch(unlike(post._id));
    }
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date)) {
      return "Invalid date";
    }
    return date.toISOString().split("T")[0];
  };

  return (
    <>
      <div className="post-detail">
        <h2>Post Detail</h2>
        <div key={post._id} className={`card `}>
          <h2 className="title">{post.title}</h2>

          <div className="post-info">
            <p>User ID:{post.userId}</p>
            <p>Posted on: {formatDate(post.createdAt)}</p>
          </div>
          <hr></hr>
          <p className="content">{post.content}</p>
          <div className="post-footer">
            <button className="likes" onClick={manageLikes}>
              <span>Likes: {post.likes?.length} </span>
              {isLiked ? <HeartFilled /> : <HeartOutlined />}
            </button>
          </div>
        </div>
      </div>
      <>
        <CreateComment />
      </>
      <div>
        <Comments />
      </div>
    </>
  );
};

export default PostDetail;
