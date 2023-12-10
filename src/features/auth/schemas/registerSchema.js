import * as yup from "yup";

const registerSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  roleNames: yup
    .array()
    .min(1, ["Role is required"])
    .required("Role is required"),
  email: yup.string().email("Email is invalid").required("Email is required"),
  password: yup.string().min(6).required("Password is required"),
  passwordConfirmation: yup
    .string()
    .required("Password confirmation is required")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

export default registerSchema;
