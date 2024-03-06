import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPostByTitle } from "../../redux/posts/postsSlice";
import { useDispatch, useSelector } from "react-redux";
import Post from "../Post/Post";

const Search = () => {
  const { postTitle } = useParams();
  console.log(`this is postTitle`, postTitle);

  // const { posts } = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPostByTitle(postTitle));
  }, [postTitle]);

  return (
    <div>
      <h2>Search</h2>
      <>
        <Post />
      </>
    </div>
  );
};

export default Search;
