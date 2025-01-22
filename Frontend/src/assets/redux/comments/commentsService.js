import axios from "axios";

const API_URL = "http://192.168.1.72:8080";

const getAll = async (postId) => {
  const token = JSON.parse(localStorage.getItem("token"));
  const res = await axios.get(API_URL + "/comments/getAll?postId=" + postId, {
    headers: {
      authorization: token,
    },
  });
  return res.data;
};

const create = async (commentData) => {
  const token = JSON.parse(localStorage.getItem("token"));
  const res = await axios.post(`${API_URL}/comments/`, commentData, {
    headers: {
      authorization: token,
    },
  });
  return res.data.comment;
};

const commentsService = {
  getAll,
  create,
};

export default commentsService;
