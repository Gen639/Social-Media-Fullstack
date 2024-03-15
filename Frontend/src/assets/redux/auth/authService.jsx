import axios from "axios";

const API_URL = "http://localhost:8080";

const register = async (userData) => {
  const res = await axios.post(`${API_URL}/users/`, userData);
  return res.data;
};

const login = async (userData) => {
  const res = await axios.post(`${API_URL}/users/login`, userData);

  if (res.data) {
    const lastToken = res.data.tokens[res.data.tokens.length - 1];
    localStorage.setItem("user", JSON.stringify(res.data.user));
    localStorage.setItem("token", JSON.stringify(lastToken));
  }
  return res.data;
};

const logout = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  const logoutURL = API_URL + `/users/logout`;

  const res = await axios.delete(logoutURL, {
    headers: {
      authorization: token,
    },
  });

  if (res.data) {
    localStorage.clear();
  }
  return res.data;
};

const getAll = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  const res = await axios.get(`${API_URL}/users/getAll`, {
    headers: {
      authorization: token,
    },
  });
  return res.data.users;
};

const deleteUser = async (_id) => {
  const token = JSON.parse(localStorage.getItem("token"));
  const res = await axios.delete(`${API_URL}/users/delete/${_id}`, {
    headers: {
      authorization: token,
    },
  });
  console.log(res.data);
  return res.data;
};

const authService = {
  register,
  login,
  logout,
  getAll,
  deleteUser,
};

export default authService;
