import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { create } from "../../redux/comments/commentsSlice";
import { useNavigate } from "react-router-dom";

const CreateComment = () => {
  const { post } = useSelector((state) => state.posts);
  const initialState = {
    content: "",
  };
  const [formData, setFormData] = useState(initialState);

  const { content } = formData;

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

    const updatedFormData = {
      ...formData,
      postId: post._id,
    };
    dispatch(create(updatedFormData));

    setFormData(initialState);
  };

  return (
    <div style={{ margin: "15px" }}>
      <h2>Comment</h2>
      <form onSubmit={handleSubmit} className="create-post-container">
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

export default CreateComment;
