import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/auth/authSlice";
import {
  Container,
  Nav,
  Navbar,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./TheHeader.css";

const TheHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [text, setText] = useState("");
  const activeKey = location.pathname;

  const onLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    navigate("/login");
  };

  const handleChange = (e) => {
    setText(e.target.value);
    if (e.key === "Enter" && text.trim()) {
      navigate(`/search/${text}`);
    }
  };

  const isAdmin = user?.role === "admin";

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="light"
      variant="light"
      className="the-header-navigation"
    >
      <Container>
        <Nav.Link as={Link} to="/" eventKey="/">
          Home
        </Nav.Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto" activeKey={activeKey}>
            {user ? (
              <>
                <NavDropdown title="Account" id="collasible-nav-dropdown">
                  <NavDropdown.Item as={Link} to="/profile">
                    Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={onLogout}>Logout</NavDropdown.Item>
                  {isAdmin && (
                    <NavDropdown.Item as={Link} to="/admin">
                      Admin Panel
                    </NavDropdown.Item>
                  )}
                </NavDropdown>
                <Form
                  className="d-flex"
                  onKeyUp={(e) => e.key === "Enter" && handleChange(e)}
                >
                  <FormControl
                    type="search"
                    placeholder="Search posts"
                    className="me-2"
                    aria-label="Search"
                    onChange={(e) => setText(e.target.value)}
                  />
                  {/* <Button
                    variant="outline-success"
                    onClick={() => navigate(`/search/${text}`)}
                  >
                    Search
                  </Button> */}
                </Form>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login" eventKey="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/register" eventKey="/register">
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default TheHeader;
