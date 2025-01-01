import React from "react";
import { useSelector } from "react-redux";
import UploadFoto from "../UploadFoto/UploadFoto";
const Profile = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div>
      <UploadFoto />
      <h2>Hello {user.username}</h2>
      <p>Profile Info:</p>
      <p>Email:{user.email}</p>
      <p>You have written: *number of posts* posts.</p>
      <p>You got *X* likes on your posts</p>
      <p>Your posts were commented *X* times</p>
    </div>
  );
};

export default Profile;
