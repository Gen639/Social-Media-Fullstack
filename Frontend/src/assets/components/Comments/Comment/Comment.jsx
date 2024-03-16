import React from "react";
import { useSelector, useDispatch } from "react-redux";

const Comment = () => {
  const dispatch = useDispatch();
  const { comments } = useSelector((state) => state.comments);

  console.log(`comments`, comments);

  const reversedComments = comments.slice().reverse();

  const commentsList = reversedComments.map((comment, index) => (
    <div key={index}>
      <p>
        Content: <span>{comment.content}</span>
      </p>
    </div>
  ));

  return <>{commentsList}</>;
};

export default Comment;
