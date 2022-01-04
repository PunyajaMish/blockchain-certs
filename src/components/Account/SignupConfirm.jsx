import { Formik } from "formik";
import React, { useState } from "react";
import { Button, Container, Form, Row } from "react-bootstrap";
import SignupConfirmSchema from "./validation schema/SignupConfirmSchema";
import { Auth } from 'aws-amplify';

function SignupConfirm() {
    async function confirmSignUp(data) {
        try{
            const { email, authCode } = data;
            await Auth.confirmSignUp(email, authCode);
            window.location.href = "/login";
        } catch (e) {
            console.log("error ", e);
            alert("An error has occured please try again.")
        }
    }
    return (
        <div className="account">
            <Container
                className="w-50 container pt-3 pb-3 mx-auto account-form"
            >
                <h1>Confirm your Account</h1>
                <Formik
                    validationSchema={SignupConfirmSchema}
                    onSubmit={(data, { setSubmitting }) => {
                        setSubmitting(true);
                        confirmSignUp(data);
                        // console.log("Submit: ", data);
                        setSubmitting(false);
                    }}
                    initialValues={{
                        email: '',
                        authCode: '',
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
                                    <Form.Label>Email address</Form.Label>
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
                                    <Form.Label>Confirmation Code</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="authCode"
                                        value={values.authCode}
                                        onChange={handleChange}
                                        placeholder="Confirmation Code"
                                        isValid={touched.authCode && !errors.authCode}
                                        isInvalid={!!errors.authCode}
                                        id="authCode"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.authCode}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Button
                                disabled={isSubmitting}
                                className="mt-3 btn-form"
                                variant="primary"
                                type="submit"
                            >
                                Confirm
                            </Button>
                        </Form>
                    )}
                </Formik>
                <p>Already confirmed your account? Login <a href="/login">here</a></p>
            </Container>
        </div>
    )
}

export default SignupConfirm;