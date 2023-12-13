import * as yup from "yup";

const updateApartmentSchema = yup.object().shape({
  name: yup.string().required("Apartment name is required"),
  building: yup.string().required("Building name is required"),
  floor: yup.number().required("Floor number is required"),
  paymentAmount: yup.number().required("Payment amount is required"),
});

export default updateApartmentSchema;