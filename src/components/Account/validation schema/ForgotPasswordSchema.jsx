import * as Yup from 'yup';

//Yup validation schema
const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address format")
    .required("Email is required"),
})

export default SignupSchema;