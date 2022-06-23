import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Nav, Navbar } from "react-bootstrap";

const NavBar = ({ isLoggedIn, user, handleLogout, history, location }) => {
  const pathName = location.pathname;

  const isActiveLink = (url) => url === pathName;

  return (
    <Navbar bg="warning" expand="lg">
      <Navbar.Brand>BCMM</Navbar.Brand>
      <Navbar.Collapse>
        <Nav className="mr-auto">
          <Nav.Item className={isActiveLink("/home") && "active"}></Nav.Item>
        </Nav>
        {isLoggedIn ? (
          location.pathname === "/" ? (
            <a href="/" onClick={(e) => handleLogout(e)}>
              Logout
            </a>
          ) : (
            <Link to="/">Home</Link>
          )
        ) : location.pathname === "/login" ? (
          <Link to="/register">Register</Link>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn,
  user: state.auth.user,
});

export default connect(mapStateToProps)(NavBar);
