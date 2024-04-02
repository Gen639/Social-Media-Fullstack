import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { create } from "../../redux/posts/postsSlice";
import { useNavigate } from "react-router-dom";
import "./CreatePost.css";

const CreatePost = () => {
  const initialState = {
    title: "",
    content: "",
  };
  const [formData, setFormData] = useState(initialState);

  const { title, content } = formData;
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    <div style={{ margin: "15px" }}>
      <h2>Share your thoughts</h2>
      <form onSubmit={handleSubmit} className="create-post-container">
        <input
          type="text"
          placeholder="Title"
          onChange={handleChange}
          value={title}
          name="title"
          required
        />
        <input
          type="text"
          onChange={handleChange}
          value={content}
          required
          name="content"
          placeholder="Content"
        />
        <button type="submit">Publish</button>
      </form>
    </div>
  );
};

export default CreatePost;
