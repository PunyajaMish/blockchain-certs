import { Formik } from "formik";
import React from "react";
import { Button, Container, Form, Row } from "react-bootstrap";
import { Auth } from "aws-amplify";
import ForgotPasswordSchema from "./validation schema/ForgotPasswordSchema";

function ForgotPassword(){
    async function forgotpassword(data){
        try {
            const { email } = data;
            // console.log(email)
            await Auth.forgotPassword(email);
            window.location.href = "/confirm-reset";
        } catch (e){
            alert("Something went wrong, please try again." + e)
        }
    }
    return (
        <div className="account">
            <Container
                className="w-50 container pt-3 pb-3 mx-auto account-form"
            >
                <h1>Reset Your Password</h1>
                <Formik
                    validationSchema={ForgotPasswordSchema}
                    onSubmit={(data, { setSubmitting }) => {
                        setSubmitting(true);
                        forgotpassword(data);
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
                            {/* <Form.Group className="auth-input">
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
                            </Form.Group> */}
                        </Row>
                        <Button
                            //   disabled={!isEnabled}
                            className="mt-3 btn-form"
                            variant="primary"
                            type="submit"
                        >
                            Send Email
                        </Button>
                    </Form>
                )}
                </Formik>
                <p>Already sent a code? Reset password <a href="/confirm-reset">here</a></p>
            </Container>
        </div>
    )
}

export default ForgotPassword;