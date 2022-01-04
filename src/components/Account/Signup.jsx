import { Formik } from "formik";
import React, { useState } from "react";
import { Button, Container, Form, Row } from "react-bootstrap";
import SignupSchema from "./validation schema/SignupSchema";
import { Auth } from "aws-amplify";

function Signup() {
    async function signUp(data) {
        try {
            const { username, email, password, firstname, lastname } = data;
            // const username = email;
            await Auth.signUp({ username, password, attributes: { email, "custom:firstname": firstname, "custom:lastname": lastname } })
            window.location.href = "/signup-confirm";
        } catch (e){
            alert("Something went wrong, please try again." + e)
        }
    }
    return (
        <div className="account">
            <Container
                className="w-50 container pt-3 pb-3 mx-auto account-form"
            >
                <h1>Signup for a Certificate Account</h1>
                <Formik
                    validationSchema={SignupSchema}
                    onSubmit={(data, { setSubmitting }) => {
                        setSubmitting(true);
                        signUp(data);
                        // console.log("Submit: ", data);
                        setSubmitting(false);
                    }}
                    initialValues={{
                        username: '',
                        email: '',
                        password: '',
                        firstname: '',
                        lastname: '',
                    }}
                >
                    {({
                        handleSubmit,
                        handleChange,
                        isSubmitting,
                        values,
                        touched,
                        errors,
                        isValid
                    }) => (
                        <Form onSubmit={handleSubmit}>
                            <Row md={2}>
                                <Form.Group className="auth-input">
                                    <Form.Label>First name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="firstname"
                                        value={values.firstname}
                                        onChange={handleChange}
                                        isValid={touched.firstname && !errors.firstname}
                                        isInvalid={!!errors.firstname}
                                        id="firstname"
                                        placeholder="First Name" />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.firstname}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="auth-input">
                                    <Form.Label>Last name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="lastname"
                                        value={values.lastname}
                                        onChange={handleChange}
                                        isValid={touched.lastname && !errors.lastname}
                                        isInvalid={!!errors.lastname}
                                        id="lastname"
                                        placeholder="Last Name" />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.lastname}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="auth-input">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="username"
                                        value={values.username}
                                        onChange={handleChange}
                                        placeholder="Email"
                                        isValid={touched.username && !errors.username}
                                        isInvalid={!!errors.username}
                                        id="username"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.username}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="auth-input">
                                    <Form.Label>Confirm Email address</Form.Label>
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
                                <Form.Group className="auth-input">
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        value={values.confirmPassword}
                                        onChange={handleChange}
                                        placeholder="Confirm Password"
                                        isValid={touched.confirmPassword && !errors.confirmPassword}
                                        isInvalid={!!errors.confirmPassword}
                                        id="confirmPassword"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.confirmPassword}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Button
                                disabled={isSubmitting}
                                className="mt-3 btn-form"
                                variant="primary"
                                type="submit"
                            >
                                Signup
                            </Button>
                        </Form>
                    )}
                </Formik>
                <p>Already have an account? Login <a href="/login">here</a></p>
                <p>Need to confirm your account with your authentication code? Click <a href="/signup-confirm">here</a></p>
            </Container>
        </div>
    )
}

export default Signup;