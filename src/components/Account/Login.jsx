import { Formik } from "formik";
import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import LoginSchema from "./validation schema/LoginSchema";
import { Auth } from "aws-amplify";
import "../../Stylesheets/Account.css"

function Login() {
    async function login(data) {
        try {
            const { email, password } = data;
            await Auth.signIn(email, password)
            window.location.href = "/";
        } catch (e) {
            alert("Something went wrong, please try again.")
        }
    }
    return (
        <div className="account">
            {/* <Container
                className="w-50 container pt-3 pb-3 mx-auto account-form"
            > */}
            <Row style={{width:"100%", margin:"0"}} className="align-items-center">
                <Col>
                    <Container id="login-container">
                        <h1>Log in to Your Account</h1>
                        <h4>Log in to your account so you can continue using our platform.</h4>
                        <Formik
                            validationSchema={LoginSchema}
                            onSubmit={(data, { setSubmitting }) => {
                                setSubmitting(true);
                                login(data);
                                // console.log("Submit: ", data);
                                setSubmitting(false);
                            }}
                            initialValues={{
                                email: '',
                                password: '',
                            }}
                        >{({
                            handleSubmit,
                            handleChange,
                            isSubmitting,
                            values,
                            touched,
                            errors,
                            isValid
                        }) => (
                            <Form onSubmit={handleSubmit}>
                                <Row md={1}>
                                    <Form.Group className="auth-input">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            type="email"
                                            name="email"
                                            value={values.email}
                                            onChange={handleChange}
                                            placeholder="Email"
                                            isValid={touched.email && !errors.email}
                                            isInvalid={!!errors.email}
                                            id="email"
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.email}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group className="auth-input">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            name="password"
                                            value={values.password}
                                            onChange={handleChange}
                                            placeholder="Password"
                                            isValid={touched.password && !errors.password}
                                            isInvalid={!!errors.password}
                                            id="password"
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.password}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Row>
                                <Button
                                    //   disabled={!isEnabled}
                                    className="mt-3 btn-form btn-login"
                                    variant="primary"
                                    type="submit"
                                >
                                    LOG IN
                                </Button>
                                <Row md={2} style={{ padding: "0em 1em" }}>
                                    <Form.Group className="mb-3" >
                                        <Form.Check style={{ float: "left" }} type="checkbox" label="Remember Me" />
                                    </Form.Group>
                                    <div>
                                        <a style={{ float: "right" }} href="/reset">Forgot Password?</a>
                                    </div>
                                </Row>
                            </Form>
                        )}
                        </Formik>
                    </Container>
                </Col>
                <Col id="reg-img" className="align-items-center">
                    <div id="register-container">
                        <h1>Don't Have an Account Yet?</h1>
                        <h4>Register in a few easy steps for a quick set up!</h4>
                        <Button
                            //   disabled={!isEnabled}
                            className="mt-3 btn-reg"
                            // variant="primary"
                            href="/signup"
                        >
                            REGISTER NOW
                        </Button>
                    </div>
                    {/* <img src="/loginBG.jpg"/> */}
                </Col>
            </Row>
            {/* </Container> */}
        </div>
    )
}

export default Login;