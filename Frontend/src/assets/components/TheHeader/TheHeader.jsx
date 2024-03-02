import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/auth/authSlice";

const TheHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch;

  const { user } = useSelector((state) => state.auth);

  const onLogout = (e) => {
    e.preventDefault();
    console.log("trying to logout");
    dispatch(logout());
    navigate("/login");
  };

  return (
    <>
      <div>
        {user ? (
          <>
            <button onClick={onLogout}>Logout</button>
            <Link to="/profile">Profile</Link>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>{" "}
          </>
        )}
      </div>
    </>
  );
};

export default TheHeader;
