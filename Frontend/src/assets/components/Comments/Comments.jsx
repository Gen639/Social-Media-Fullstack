import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Comment from "./Comment/Comment";
import { useDispatch, useSelector } from "react-redux";
import { getAll } from "../../redux/comments/commentsSlice";

const Comments = () => {
  const { id } = useParams();
  console.log(`id   `, id);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAll(id));
  }, []);
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <p>Comments</p> <Comment />
      </div>
    </>
  );
};

export default Comments;
