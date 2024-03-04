import axios from "axios";

const API_URL = "http://localhost:8080";

const getAll = async () => {
  const res = await axios.get(API_URL + "/posts/getAll");
  return res.data.posts;
};

const postsService = {
  getAll,
};

export default postsService;
