import React, { Component, useState, useEffect } from "react";
import { Navbar, Nav, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../Stylesheets/Navbar.css";
import { Auth } from 'aws-amplify';
// class Navhead extends Component {
// state = {};
// render() {
function Navhead() {
  const [loggedIn, setLoggedIn] = useState(false);
  async function checkUser() {
    try {
      const user = await Auth.currentAuthenticatedUser();
      // console.log(user);
      setLoggedIn(true);
    } catch (e) {
      console.log('error: ', e)
    }
  }
  useEffect(() => {
    checkUser();
  }, [])
  return (
    <Navbar
      className="bar"
      // bg="dark"
      // variant="dark"
      expand="lg">
      <Navbar.Brand mb={0} href="/">
        {/* InnovFin */}
        <img id="brand-logo" src="/InnovEdu Logo Final.png"/>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto nav-fill w-100">
          <Nav.Item className="mt-2 mr-2 ">
          </Nav.Item>
          <Nav.Item className="mt-2 mr-2 ">
            <Link to="/">Home</Link>
          </Nav.Item>
          <Nav.Item className="mt-2 ml-2 mr-3">
            <Link to="/register">Register</Link>
          </Nav.Item>
          <Nav.Item className="mt-2 ml-2 mr-3">
            <Link to="/intro">How it works</Link>
          </Nav.Item>
          <Nav.Item className="mt-2 ml-2 mr-3">
            <Link to="/verify">Verify</Link>
          </Nav.Item>
          <Nav.Item className="mt-2 mr-3">
            <Link to="/view">View Certificate</Link>
          </Nav.Item>
          <Nav.Item className="mt-2 mr-2 ">
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
      {!loggedIn ? <Button href="/login" id="login-btn">Login</Button>
        : <Button href="/account" id="login-btn">Account</Button>}
    </Navbar>
  );
  // }
}

export default Navhead;
