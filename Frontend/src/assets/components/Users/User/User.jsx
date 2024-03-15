import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Avatar, Card, Skeleton, Switch } from "antd";
const { Meta } = Card;

const User = () => {
  const { users } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };
  const userList =
    users &&
    users.map((user, id) => (
      //   <div key={id}>
      //     <span>{user.username} </span>
      //     <span>{user.email}</span>
      //   </div>

      <>
        <Card
          style={{ width: 300, marginTop: 16 }}
          actions={[
            <SettingOutlined key="setting" />,
            <EditOutlined key="edit" />,
            <EllipsisOutlined key="ellipsis" />,
          ]}
        >
          <Meta
            avatar={
              <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />
            }
            actions={[<DeleteOutlined />]}
            title={user.email}
            description={
              <div>
                <p>Username: {user.username}</p>
                <p>Created: {formatDate(user.createdAt)}</p>
                <span>Posts published: </span>
                <span>{user.publishedPostsIds.length}</span>
              </div>
            }
          />
        </Card>
      </>
    ));

  return <div>{userList}</div>;
};

export default User;
