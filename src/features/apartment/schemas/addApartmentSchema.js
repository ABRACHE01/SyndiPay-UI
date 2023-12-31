import * as yup from "yup";

const addApartmentSchema = yup.object().shape({
    name: yup.string().required("Apartment name is required"),
    building: yup.string().required("Building name is required"),
    floor: yup.number().required("Floor number is required"),
    clients: yup.string().required("client is required"),
    paymentAmount: yup.number().required("Payment amount is required"),
  });
  
export default addApartmentSchema;



