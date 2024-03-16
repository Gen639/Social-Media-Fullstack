import axios from "axios";

const API_URL = "http://localhost:8080";

const getAll = async (postId) => {
  const token = JSON.parse(localStorage.getItem("token"));

  const res = await axios.get(API_URL + "/comments/getAll?postId=" + postId, {
    headers: {
      authorization: token,
    },
  });

  return res.data;
};

const commentsService = {
  getAll,
};

export default commentsService;
