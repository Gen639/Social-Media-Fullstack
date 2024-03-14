import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { create } from "../../redux/posts/postsSlice";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const initialState = {
    title: "",
    content: "",
  };
  const [formData, setFormData] = useState(initialState);

  const { title, content } = formData;
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Title:", title);
    console.log("Content:", content);

    dispatch(create(formData));

    setFormData(initialState);
  };

  return (
    <div>
      <h1>Create a New Post</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          onChange={handleChange}
          value={title}
          name="title"
          required
        />

        <label htmlFor="content">Content:</label>
        <textarea
          onChange={handleChange}
          value={content}
          required
          name="content"
        ></textarea>

        <button type="submit">Create Post</button>
      </form>
    </div>
  );
};

export default CreatePost;
