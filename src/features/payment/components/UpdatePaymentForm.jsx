import React from "react";
import { useFormik } from "formik";
import { Input, ModalFooter, Button } from "@nextui-org/react";
import { useUpdatePaymentMutation } from "../redux/paymentApiSlice";
import {updatePaymentSchema } from "../schemas"

const UpdatePaymentForm = ({ onClose, selectedPayment, refetch , apartmentId }) => {
  const [updatePayment] = useUpdatePaymentMutation();

  const formik = useFormik({
    initialValues: {
      apartment: apartmentId ,
      amount: selectedPayment.amount,
      paymentDate: selectedPayment.paymentDate,
      paymentMethod: selectedPayment.paymentMethod,
      isPaid: selectedPayment.isPaid,
      receiptNumber: selectedPayment.receiptNumber,
      notes: selectedPayment.notes,
    },
    validationSchema: updatePaymentSchema,
    onSubmit: async (values) => {
      const paymentData = values;
      const paymentId = selectedPayment._id;

      await updatePayment({  paymentId, paymentData });
      onClose();
      refetch();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>

      <Input
        type="number"
        name="amount"
        label="Amount"
        variant="bordered"
        className="px-2 p-2"
        placeholder="Enter Amount"
        onChange={formik.handleChange}
        value={formik.values.amount || ""}
        errorMessage={
          formik.touched.amount && formik.errors.amount && formik.errors.amount
        }
      />

<Input
  type="date"
  name="paymentDate"
  label="Payment Date"
  variant="bordered"
  className="px-2 p-2"
  onChange={formik.handleChange}
  value={formik.values.paymentDate ? formik.values.paymentDate.slice(0, 10) : ""}
  errorMessage={
    formik.touched.paymentDate &&
    formik.errors.paymentDate &&
    formik.errors.paymentDate
  }
/>

      <Input
        type="text"
        name="paymentMethod"
        label="Payment Method"
        variant="bordered"
        className="px-2 p-2"
        placeholder="Enter Payment Method"
        onChange={formik.handleChange}
        value={formik.values.paymentMethod || ""}
        errorMessage={
          formik.touched.paymentMethod &&
          formik.errors.paymentMethod &&
          formik.errors.paymentMethod
        }
      />

      <Input
        type="checkbox"
        name="isPaid"
        label="Is Paid"
        variant="bordered"
        className="px-2 p-2"
        onChange={formik.handleChange}
        checked={formik.values.isPaid || ""}
      />

      <Input
        type="text"
        name="receiptNumber"
        label="Receipt Number"
        variant="bordered"
        className="px-2 p-2"
        placeholder="Enter Receipt Number"
        onChange={formik.handleChange}
        value={formik.values.receiptNumber || ""}
        errorMessage={
          formik.touched.receiptNumber &&
          formik.errors.receiptNumber &&
          formik.errors.receiptNumber
        }
      />

      <Input
        type="text"
        name="notes"
        label="Notes"
        variant="bordered"
        className="px-2 p-2"
        placeholder="Enter Notes"
        onChange={formik.handleChange}
        value={formik.values.notes || ""}
        errorMessage={
          formik.touched.notes && formik.errors.notes && formik.errors.notes
        }
      />

      <ModalFooter>
        <Button color="danger" variant="light" onPress={onClose}>
          Close
        </Button>
        <Button color="primary" type="submit">
          Submit
        </Button>
      </ModalFooter>
    </form>
  );
};

export default UpdatePaymentForm;