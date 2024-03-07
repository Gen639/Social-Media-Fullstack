import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPostByTitle } from "../../redux/posts/postsSlice";
import { useDispatch, useSelector } from "react-redux";
import Post from "../Post/Post";

const Search = () => {
  const { postTitle } = useParams();
  console.log(`this is postTitle`, postTitle);
  // const [postFound, setPostFound] = useState(true);

  const { posts } = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPostByTitle(postTitle));
  }, [postTitle]);

  return (
    <div>
      <h2>Search</h2>
      {posts.length === 0 ? <p>Nothing found for "{postTitle}"</p> : <Post />}
    </div>
  );
};

export default Search;
