import * as Yup from "yup";

const SignUpSchema = Yup.object().shape({
  email: Yup.string()
    .email()
    .required(),
  password: Yup.string().required(),
  passwordConfirmation: Yup.string().required()
});

export default SignUpSchema;
