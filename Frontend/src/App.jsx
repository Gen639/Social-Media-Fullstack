import Login from "./assets/components/Login/Login";
import Register from "./assets/components/Register/Register";
import TheHeader from "./assets/components/TheHeader/TheHeader";
import Home from "./assets/components/Home/Home";
import Profile from "./assets/components/Profile/Profile";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import PostDetail from "./assets/components/Posts/PostDetail/PostDetail";
import Search from "./assets/components/Search/Search";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <TheHeader />

        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/post/:id" element={<PostDetail />} />
          <Route path="/search/:postTitle" element={<Search />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
