import React from "react"
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../Stylesheets/Footer.css"

function Footer() {
    return (
        <div className="footer">
            <Nav className="mr-auto nav-fill w-100">
                <Nav.Item className="mt-2 mr-3">
                </Nav.Item>
                <Nav.Item className="mt-2 mr-2 ">
                    <Link to="/">Home</Link>
                </Nav.Item>
                <Nav.Item className="mt-2 ml-2 mr-3">
                    <Link to="/register">Register for Courses</Link>
                </Nav.Item>
                <Nav.Item className="mt-2 ml-2 mr-3">
                    <Link to="">Earn Points/Tokens</Link>
                </Nav.Item>
                <Nav.Item className="mt-2 ml-2 mr-3">
                    <Link to="">Terms &amp; Conditions</Link>
                </Nav.Item>
                <Nav.Item className="mt-2 mr-3">
                    <Link to="">Contact Us</Link>
                </Nav.Item>
                <Nav.Item className="mt-2 mr-3">
                </Nav.Item>
            </Nav>
            <p>Copyright©2021 InnovFin Consulting Inc. All rights reserved</p>
        </div>
    )
}

export default Footer;