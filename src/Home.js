import React, { Component } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import b1 from "./b3.jpg"
import "./Stylesheets/Home.css";

function Home() {
    return (
        <div className="home">
            <Row className="align-items-center">
                <Col md={5}>
                    <h1>Blockchain Verified Certification</h1>
                    <p>Auto-Retrieve or Auto-Verify Your Innov-Edu Course Certificate on the Blockchain!</p>
                    <Button id="access-btn">Access Certificate Now!</Button>
                </Col>
                <Col md={7}>
                    <Container>
                    <img style={{ width: "80%", display:"block", margin:"auto" }} src="/Home Blockchain.png" />
                    </Container>
                </Col>
            </Row>
        </div>
    )
}

export default Home;