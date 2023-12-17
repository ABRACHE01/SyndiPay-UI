import * as yup from "yup";

const addPaymentSchema = yup.object().shape({
  apartment: yup.string().required("Apartment is required"),
  amount: yup
    .number()
    .required("Amount is required")
    .positive("Amount should be a positive number"),
  paymentDate: yup.date().required("Payment Date is required"),
  paymentMethod: yup.string().required("Payment Method is required"),
  isPaid: yup.boolean().required("Is Paid is required"),
  receiptNumber: yup.string().nullable(),
  notes: yup.string().nullable(),
});

export default addPaymentSchema;