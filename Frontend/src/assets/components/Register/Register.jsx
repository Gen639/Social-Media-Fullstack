import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/authSlice";
import { notification } from "antd";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });
  const { username, email, password, password2 } = formData;

  const dispatch = useDispatch();
  const { isSuccess, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isSuccess) {
      notification.success({
        message: "Success",
        description: message,
      });
    }
  }, [isSuccess]);

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
      return notification.success({
        message: "Error",
        description: "Passwords do not match ",
      });
    }
  };
  return (
    <>
      <h2> Register new user</h2>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="username"
          placeholder="introduce your name"
          value={username}
          onChange={onChange}
        />
        <input
          type="email"
          name="email"
          placeholder="introduce your email"
          value={email}
          onChange={onChange}
        />
        <input
          type="password"
          name="password"
          placeholder="introduce your password"
          value={password}
          onChange={onChange}
        />
        <input
          type="password"
          name="password2"
          placeholder="introduce your once again"
          value={password2}
          onChange={onChange}
        />
        <button type="submit">Register</button>
      </form>
    </>
  );
};
export default Register;
