import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, reset } from "../../redux/auth/authSlice";
import { notification } from "antd";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const { isError, isSuccess, message } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      notification.error({ message: "Error", description: message });
    }
    if (isSuccess) {
      notification.success({ message: "Success", description: message });
      setTimeout(() => {
        navigate("/profile");
      }, 1500);
    }

    dispatch(reset());
  }, [isError, isSuccess, message]);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData));
  };
  return (
    <>
      <h2>Login</h2>
      <form onSubmit={onSubmit} className="login-container">
        <input
          type="email"
          name="email"
          placeholder="email"
          value={email}
          onChange={onChange}
          required
          className="login-container-element"
        />
        <input
          type="password"
          name="password"
          value={password}
          placeholder="password"
          onChange={onChange}
          required
          className="login-container-element"
        />
        <button type="submit" className="login-container-button">
          Login
        </button>
      </form>
    </>
  );
};
export default Login;
