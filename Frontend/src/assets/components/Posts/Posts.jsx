import React, { useEffect } from "react";
import Post from "../Post/Post";
import { useDispatch, useSelector } from "react-redux";
import { getAll, reset } from "../../redux/posts/postsSlice";
import "./Posts.css";
import CreatePost from "../CreatePost/CreatePost";

const Posts = () => {
  const { isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAll());
    dispatch(reset());
  }, []);

  return (
    <>
      <CreatePost />
      <div className="posts-container">
        {isLoading ? "Cargando..." : <Post />}
      </div>
    </>
  );
};

export default Posts;
