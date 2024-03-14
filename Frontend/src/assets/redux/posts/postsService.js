import axios from "axios";

const API_URL = "http://localhost:8080";

const getAll = async () => {
  const res = await axios.get(API_URL + "/posts/getAll");
  return res.data.posts;
};

const getById = async (id) => {
  const res = await axios.get(API_URL + "/posts/getAll?id=" + id);
  // console.log(res.data.posts[0]);
  return res.data.posts[0];
};
const getPostByTitle = async (postTitle) => {
  const res = await axios.get(API_URL + "/posts/getAll?title=" + postTitle);
  return res.data.posts;
};

const like = async (_id) => {
  const token = JSON.parse(localStorage.getItem("token"));
  const res = await axios.put(
    `${API_URL}/posts/like/${_id}`,
    {},
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data.updatedPost;
};

const unlike = async (_id) => {
  const token = JSON.parse(localStorage.getItem("token"));
  const res = await axios.delete(`${API_URL}/posts/unlike/${_id}`, {
    headers: {
      authorization: token,
    },
  });
  return res.data.updatedPost;
};

const create = async (postData) => {
  const token = JSON.parse(localStorage.getItem("token"));
  const res = await axios.post(`${API_URL}/posts/`, postData, {
    headers: {
      authorization: token,
    },
  });
  return res.data;
};

const postsService = {
  getAll,
  getById,
  getPostByTitle,
  like,
  unlike,
  create,
};

export default postsService;
