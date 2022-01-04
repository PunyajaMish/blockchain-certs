import * as Yup from 'yup';

//Yup validation schema
const SignupSchema = Yup.object().shape({
    email: Yup.string()
        .email("Invalid email address format")
        .required("Email is required"),
    password: Yup.string()
        .min(5, "Must be longer than 5 characters.")
        .required("New password is required"),
    authCode: Yup.string()
        .required("The authcode that was sent to your email is required."),
})

export default SignupSchema;