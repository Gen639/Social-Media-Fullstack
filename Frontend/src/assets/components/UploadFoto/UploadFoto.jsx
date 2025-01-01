import React from "react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { notification } from "antd";
import { reset } from "../../redux/auth/authSlice";

import { updateProfileImg } from "../../redux/auth/authSlice";

const defaultProfileImage = "/images/profile-pic.JPG";

const UploadFoto = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm();

  const [image, setImage] = useState(defaultProfileImage);
  const [showForm, setShowForm] = useState(false);
  console.log(image);
  const { isError, isSuccess, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user && user.profileImg) {
      setImage(user.profileImg);

      console.log(image);
    }
  }, [user]);

  useEffect(() => {
    if (isError) {
      notification.error({ message: "Error", description: message });
    }
    if (isSuccess) {
      notification.success({ message: "Success", description: message });
      setShowForm((prevShowForm) => !prevShowForm);
      setTimeout(() => {}, 1500);
    }

    dispatch(reset());
  }, [isError, isSuccess, message]);

  const submitForm = (data) => {
    console.log(data);

    const formData = new FormData();
    formData.append("picture", data.picture[0]);

    user && dispatch(updateProfileImg(formData));
  };

  return (
    <>
      <div
        className="imageContainer"
        onClick={() => setShowForm((prevShowForm) => !prevShowForm)}
      >
        {(image && (
          <img
            width={400}
            height={300}
            // src={user.profileImg}
            src={image}
            alt="profile"
            style={{
              width: "300px",
              height: "300px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
        )) || <p>La imagen no está subida todavía</p>}
      </div>

      {showForm && (
        <form onSubmit={handleSubmit(submitForm)}>
          {/* <input
          {...register("name", { required: "Recipe name is required" })}
          type="text"
          id="name"
        /> */}
          <input
            {...register("picture", { required: "Image is required" })}
            type="file"
            id="picture"
          />

          <input type="submit" />
        </form>
      )}
    </>
  );
};

export default UploadFoto;
