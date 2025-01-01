import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { notification } from "antd";
import { reset, updateProfileImg } from "../../redux/auth/authSlice";

const defaultProfileImage = "/images/profile-pic.JPG";

const UploadFoto = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { register, handleSubmit, watch } = useForm();

  const [image, setImage] = useState(defaultProfileImage);
  const [showForm, setShowForm] = useState(false);
  const [isPictureSelected, setIsPictureSelected] = useState(false);
  const formRef = useRef(null);
  const { isError, isSuccess, message } = useSelector((state) => state.auth);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        formRef.current &&
        !formRef.current.contains(event.target) &&
        !event.target.closest(".imageContainer")
      ) {
        setShowForm(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [formRef]);

  useEffect(() => {
    if (user && user.profileImg) {
      setImage(user.profileImg);
    }
  }, [user]);

  useEffect(() => {
    if (isError) {
      notification.error({ message: "Error", description: message });
    }
    if (isSuccess) {
      notification.success({ message: "Success", description: message });
      setShowForm(false);
    }
    dispatch(reset());
  }, [isError, isSuccess, message, dispatch]);

  const submitForm = (data) => {
    const file = data.picture[0];
    const formData = new FormData();
    formData.append("picture", file);

    // Set the preview image URL
    setImage(URL.createObjectURL(file));

    if (user) {
      dispatch(updateProfileImg(formData));
    }
  };

  const handleImageClick = () => {
    setShowForm((prevShowForm) => !prevShowForm);
  };

  const handleFileChange = (event) => {
    setIsPictureSelected(event.target.files.length > 0);
  };

  return (
    <>
      <div className="imageContainer" onClick={handleImageClick}>
        {image ? (
          <img
            width={400}
            height={300}
            src={image}
            alt="profile"
            style={{
              width: "300px",
              height: "300px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
        ) : (
          <p>La imagen no está subida todavía</p>
        )}
      </div>

      {showForm && (
        <div ref={formRef} className="form-container">
          <form onSubmit={handleSubmit(submitForm)}>
            <input
              {...register("picture", { required: "Image is required" })}
              type="file"
              id="picture"
              name="picture"
              onChange={handleFileChange}
            />
            <button type="submit" disabled={!isPictureSelected}>
              Upload
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default UploadFoto;
