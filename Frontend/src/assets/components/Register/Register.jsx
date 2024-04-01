import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register, reset } from "../../redux/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";
import "./Register.css";

// initialsctae to do
const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });
  const { username, email, password, password2 } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isSuccess, message, isError } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isSuccess) {
      notification.success({
        message: "Success",
        description: message,
      });
      dispatch(reset());
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    }
    if (isError) {
      notification.error({
        message: "Error",
        description: message,
      });
    }
    dispatch(reset());
  }, [isSuccess, isError, message]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== password2) {
      return notification.error({
        message: "Error",
        description: "Passwords do not match ",
      });
    } else {
      console.log("formData", formData);
      dispatch(register(formData));
    }
  };
  return (
    <>
      <h2> Register New User</h2>
      <form onSubmit={onSubmit} className="register-container">
        <input
          type="text"
          name="username"
          placeholder="introduce your name"
          value={username}
          onChange={onChange}
          className="register-container-element"
        />
        <input
          type="email"
          name="email"
          placeholder="introduce your email"
          value={email}
          onChange={onChange}
          className="register-container-element"
        />
        <input
          type="password"
          name="password"
          placeholder="introduce your password"
          value={password}
          onChange={onChange}
          className="register-container-element"
        />
        <input
          type="password"
          name="password2"
          placeholder="introduce your once again"
          value={password2}
          onChange={onChange}
          className="register-container-element"
        />
        <button type="submit" className="register-container-button">
          Register
        </button>
      </form>
    </>
  );
};
export default Register;
