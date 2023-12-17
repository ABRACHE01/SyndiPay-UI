import * as yup from "yup";

const addClientSchema = yup.object().shape({
  CIN: yup.string().required("CIN is required"),
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phoneNumber: yup.string().required("Phone number is required"),
});

export default addClientSchema;