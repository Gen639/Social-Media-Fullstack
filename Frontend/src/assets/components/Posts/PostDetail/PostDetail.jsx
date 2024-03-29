import { useParams } from "react-router-dom";
import { getById } from "../../../redux/posts/postsSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Comments from "../../Comments/Comments";

const PostDetail = () => {
  const { id } = useParams();

  const { post } = useSelector((state) => state.posts);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getById(id));
  }, []);

  return (
    <>
      <div>
        <h1>PostDetail</h1>
        <p>{post.title}</p>
        <p>{post.content}</p>
      </div>
      <div>
        <Comments />
      </div>
    </>
  );
};

export default PostDetail;
