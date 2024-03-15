import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DeleteOutlined } from "@ant-design/icons";
import { Avatar, Card, Flex } from "antd";
import { deleteUser } from "../../../redux/auth/authSlice";

const { Meta } = Card;

const User = () => {
  const { users } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  const manageDelete = (_id) => {
    dispatch(deleteUser(_id));
  };

  const userList =
    users &&
    users.map((user, _id) => (
      <Card
        key={_id}
        style={{ width: 350, marginTop: 16 }}
        actions={[<DeleteOutlined onClick={() => manageDelete(user._id)} />]}
      >
        <Meta
          avatar={
            <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />
          }
          title={user.username}
          description={
            <Flex gap="middle" align="start">
              <div>
                <p>Email: {user.email}</p>
                <>
                  <span>Posts published: </span>
                  <span>{user.publishedPostsIds.length}</span>
                </>
              </div>

              <div>
                <p>Role: {user.role}</p>
                <p>Created: {formatDate(user.createdAt)}</p>
              </div>
            </Flex>
          }
        />
      </Card>
    ));

  return <div>{userList}</div>;
};

export default User;
