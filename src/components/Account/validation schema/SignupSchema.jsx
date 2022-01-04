import * as Yup from 'yup';

//Yup validation schema
const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .email("Invalid email address format")
    .required("Email required"),
  email: Yup.string()
    .email("Invalid email address format")
    .required("Email is required")
    .oneOf([Yup.ref('username'), null], 'Emails must match'),
  firstname: Yup.string()
    .min(2, 'First Name is too short')
    .max(150, 'First Name is too long')
    .required('First Name is required'),
  lastname: Yup.string()
    .min(2, 'Last Name is too short')
    .max(150, 'Last Name is too long')
    .required('Last Name is required'),
  password: Yup.string()
    .min(5, "Password must be 5 characters minimum")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .required('Password confirm is required')
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
})

export default SignupSchema;