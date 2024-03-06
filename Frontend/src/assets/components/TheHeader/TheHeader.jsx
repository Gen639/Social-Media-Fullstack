import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/auth/authSlice";

const TheHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [text, setText] = useState("");

  const onLogout = (e) => {
    e.preventDefault();
    console.log("trying to logout");
    dispatch(logout());
    navigate("/login");
  };

  const handleChange = (e) => {
    setText(e.target.value);
    if (e.key === "Enter") {
      // console.log(text);
      navigate(`/search/${text}`);
    }
  };

  return (
    <>
      <nav>
        <Link to="/">Home </Link>
        {user ? (
          <>
            <button onClick={onLogout}>Logout </button>
            <Link to="/profile">Profile </Link>
            <input
              onKeyUp={handleChange}
              placeholder="search post"
              name="text"
            />
          </>
        ) : (
          <>
            <Link to="/login">Login </Link>
            <Link to="/register">Register </Link>{" "}
          </>
        )}
      </nav>
    </>
  );
};

export default TheHeader;
