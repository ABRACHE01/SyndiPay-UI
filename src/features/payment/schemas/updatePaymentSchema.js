import * as yup from "yup";

const updatePaymentSchema = yup.object().shape({
  amount: yup.number().required("Amount is required").positive("Amount must be a positive number"),
  paymentDate: yup.date().required("Payment Date is required"),
  paymentMethod: yup.string().required("Payment Method is required"),
  isPaid: yup.boolean(),
  receiptNumber: yup.string().nullable(),
  notes: yup.string().nullable(),
});

export default updatePaymentSchema;