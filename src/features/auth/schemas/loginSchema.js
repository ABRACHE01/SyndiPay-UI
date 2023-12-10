import * as yup from "yup";

const loginSchema = yup.object().shape({
  email: yup.string().email("Email is invalid").required("Email is required"),
  password: yup.string().min(6).required("Password is required"),
});

export default loginSchema;
