import axios from "axios";

const API_URL = "http://localhost:8080";

const register = async (userData) => {
  const res = await axios.post(`${API_URL}/users/`, userData);
  return res.data;
};

const login = async (userData) => {
  const res = await axios.post(`${API_URL}/users/login`, userData);

  if (res.data) {
    console.log(res.data);
    const lastToken = res.data.tokens[res.data.tokens.length - 1];
    localStorage.setItem("user", JSON.stringify(res.data.user));
    localStorage.setItem("token", JSON.stringify(lastToken));
  }
  return res.data;
};

const logout = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  const logoutURL = API_URL + `/users/logout`;

  console.log("Logout URL:", logoutURL);

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
  const res = await axios.get(`${API_URL}/users/getAll`);
  console.log(res.data);
  return res.data.users;
};

const authService = {
  register,
  login,
  logout,
  getAll,
};

export default authService;
