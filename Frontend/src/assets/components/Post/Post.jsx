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
    console.log(post);
    const isPostedByUser = post.userId === user._id;

    // const postStyle = {
    //   padding: "10px",
    //   margin: "10px",
    //   border: "1px solid #ccc",
    // };

    const isLiked = checkTheUserId();

    return (
      <div
        key={post._id}
        // style={postStyle}
        className={`card ${isPostedByUser ? "user-post" : ""}`}
      >
        <div>
          <h2 className="title">{post.title}</h2>
        </div>
        <p className="content ">{post.content}</p>
        <div className="post-footer">
          <div className="likes">
            <span>Liked: {post.likes?.length} </span>
            {isLiked ? (
              <HeartFilled onClick={() => dispatch(unlike(post._id))} />
            ) : (
              <HeartOutlined onClick={() => dispatch(like(post._id))} />
            )}
          </div>
          <div className="comments">
            <Link to={`/post/${post._id}`}>
              <span>Comments: {post.commentsIds?.length} </span>
              <CommentOutlined />
            </Link>
          </div>
        </div>
      </div>
    );
  });

  return post;
};

export default Post;
