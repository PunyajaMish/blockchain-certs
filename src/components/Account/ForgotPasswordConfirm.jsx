import { Formik } from "formik";
import React from "react";
import { Button, Container, Form, Row } from "react-bootstrap";
import { Auth } from "aws-amplify";
import ForgotPasswordSchema from "./validation schema/ForgotPasswordSchema";

function ForgotPasswordConfirm() {
    async function resetPassword(data) {
        try {
            const { email, authCode, password } = data;
            // console.log(email)
            await Auth.forgotPasswordSubmit(email, authCode, password)
            window.location.href = "/login";
        } catch (e) {
            alert("Something went wrong, please try again." + e)
        }
    }
    return (
        <div className="account">
            <Container
                className="w-50 container pt-3 pb-3 mx-auto account-form"
            >
                <h1>Set New Password</h1>
                <Formik
                    validationSchema={ForgotPasswordSchema}
                    onSubmit={(data, { setSubmitting }) => {
                        setSubmitting(true);
                        resetPassword(data);
                        // console.log("Submit: ", data);
                        setSubmitting(false);
                    }}
                    initialValues={{
                        email: '',
                        password: '',
                        authCode: '',
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
                                <Form.Label>New Password</Form.Label>
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
                                <Form.Label>Authentication Code</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="authCode"
                                    value={values.authCode}
                                    onChange={handleChange}
                                    placeholder="Authentication Code"
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
                            //   disabled={!isEnabled}
                            className="mt-3 btn-form"
                            variant="primary"
                            type="submit"
                        >
                            Reset
                        </Button>
                    </Form>
                )}
                </Formik>
                <p>Already reset? Go to login <a href="/login">here</a></p>
            </Container>
        </div>
    )
}

export default ForgotPasswordConfirm;