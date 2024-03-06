import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const Search = () => {
  const { postTitle } = useParams;
  console.log(`this is postTitle`, postTitle);

  useEffect(() => {
    console.log(postTitle);
  }, [postTitle]);

  return <div>Search</div>;
};

export default Search;
