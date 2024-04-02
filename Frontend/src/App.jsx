import Login from "./assets/components/Login/Login";
import Register from "./assets/components/Register/Register";
import TheHeader from "./assets/components/TheHeader/TheHeader";
import Home from "./assets/components/Home/Home";
import Profile from "./assets/components/Profile/Profile";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PostDetail from "./assets/components/Posts/PostDetail/PostDetail";
import Search from "./assets/components/Search/Search";
import PrivateZone from "./guards/PrivateZone";
import NotFound from "./assets/components/NotFound/NotFound";
import Admin from "./assets/components/Admin/Admin";
import AdminZone from "./guards/AdminZone";
import CreatePost from "./assets/components/CreatePost/CreatePost";
import Footer from "./assets/components/Footer/Footer";
// import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <div className="app">
      <div className="content">
        <BrowserRouter>
          <div className="main-content">
            <TheHeader />
            <Routes>
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />

              <Route
                path="/"
                element={
                  <PrivateZone>
                    <Home />
                  </PrivateZone>
                }
              />
              <Route path="/post/:id" element={<PostDetail />} />
              <Route path="/search/:postTitle" element={<Search />} />
              <Route
                path="/profile"
                element={
                  <PrivateZone>
                    <Profile />
                  </PrivateZone>
                }
              />
              <Route
                path="/create"
                element={
                  <PrivateZone>
                    <CreatePost />
                  </PrivateZone>
                }
              />
              <Route path="*" element={<NotFound />} />
              <Route
                path="/admin"
                element={
                  <AdminZone>
                    <Admin />
                  </AdminZone>
                }
              />
            </Routes>
          </div>
          <div className="app-footer">
            <Footer />
          </div>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
