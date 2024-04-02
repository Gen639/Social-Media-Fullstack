import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Comment.css";

const Comment = () => {
  const dispatch = useDispatch();
  const { comments } = useSelector((state) => state.comments);

  console.log(`comments`, comments);

  const reversedComments = comments.slice().reverse();

  const commentsList = reversedComments.map((comment, index) => (
    <div className="comment-container" key={index}>
      <p className="comment-title">
        User <em>{comment.userId}</em> is saying
      </p>
      <hr></hr>
      <p>
        Content: <span>{comment.content}</span>
      </p>
    </div>
  ));

  return <>{commentsList}</>;
};

export default Comment;
