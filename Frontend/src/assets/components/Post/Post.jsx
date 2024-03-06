import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Post = () => {
  const { posts } = useSelector((state) => state.posts);
  console.log(`LOOOOOK`, posts && posts[0]?.title);

  return (
    <>
      {posts &&
        posts.map((post, index) => (
          <div key={post._id}>
            <h2>Post nº {index}</h2>
            <p>{post.content}</p>

            <Link to={`/post/${post._id}`}>
              <p>{post.title}</p>
            </Link>
          </div>
        ))}
    </>
  );
};

export default Post;
