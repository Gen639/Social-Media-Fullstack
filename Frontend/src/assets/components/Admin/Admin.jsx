import React from "react";
import Users from "../Users/Users";

const Admin = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h2>Admin Panel</h2>
        <Users />
      </div>
    </>
  );
};

export default Admin;
