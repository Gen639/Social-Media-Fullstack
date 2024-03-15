import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/auth/authSlice";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

const TheHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [text, setText] = useState("");

  const onLogout = (e) => {
    e.preventDefault();

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
  const isAdmin = user?.role === "admin";
  return (
    <>
      <nav>
        <Link to="/">Home | </Link>
        {user ? (
          <>
            <Link onClick={onLogout}>Logout | </Link>
            <Link to="/profile">Profile | </Link>
            <Link to="/create">Write a post | </Link>

            {isAdmin && <Link to="/admin">Admin Panel | </Link>}
            <input
              onKeyUp={handleChange}
              placeholder="Enter the title of the post "
              name="text"
            />
          </>
        ) : (
          <>
            <Link to="/login">Login | </Link>
            <Link to="/register">Register |</Link>{" "}
          </>
        )}
      </nav>
    </>
  );
};

export default TheHeader;
