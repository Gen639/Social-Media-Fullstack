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
  const res = await axios.get(API_URL + "/posts/getAll?title=" + title);
  return res.data.posts;
};

const postsService = {
  getAll,
  getById,
  getPostByTitle,
};

export default postsService;
