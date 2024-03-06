import React, { useEffect } from "react";
import Post from "../Post/Post";
import { useDispatch, useSelector } from "react-redux";
import { getAll, reset } from "../../redux/posts/postsSlice";

const Posts = () => {
  const { isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAll());
    dispatch(reset());
  }, []);

  return (
    <>
      <h2>Posts</h2>
      {isLoading ? "Cargando..." : <Post />}
      {/* <Post /> */}
    </>
  );
};

export default Posts;
