import * as Yup from 'yup';

//Yup validation schema
const SignupConfirmSchema = Yup.object().shape({
    email: Yup.string()
        .email("Invalid email address format")
        .required("Email is required"),
    authCode: Yup.number()
        .required("Authentication code is required")
        .typeError("Confirmation code must be a number!"),
})

export default SignupConfirmSchema;