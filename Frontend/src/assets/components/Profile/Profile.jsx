import React from "react";
import { useSelector } from "react-redux";
const Profile = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div>
      <h2>Profile</h2>
      <p>{user.username}</p>
      <p>{user.email}</p>
    </div>
  );
};

export default Profile;
