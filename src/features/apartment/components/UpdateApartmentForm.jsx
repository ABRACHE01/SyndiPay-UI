import React from "react";
import { useFormik } from "formik";
import { updateApartmentSchema } from "../schemas";
import { Input, ModalFooter, Button, Switch , cn } from "@nextui-org/react";
import { useUpdateApartmentMutation } from "../redux/apartmentApiSlice";

const UpdateApartmentForm = ({ onClose, selectedApartment, refetch }) => {
  const [UpdateApartment] = useUpdateApartmentMutation();

  const formik = useFormik({
    initialValues: {
      name: selectedApartment.name,
      building: selectedApartment.building,
      floor: selectedApartment.floor,
      paymentAmount: selectedApartment.paymentAmount,
      paymentFrequency: selectedApartment.paymentFrequency,
      paymentDueDate: selectedApartment.paymentDueDate,
    },
    validationSchema: updateApartmentSchema,
    onSubmit: async (values) => {
      const apartmentId = selectedApartment._id;
      const apartmentData = values;
      await UpdateApartment({ apartmentId, apartmentData });
      onClose();
      refetch();
    },
  });


  return (
    <form onSubmit={formik.handleSubmit}>
        <Input
          type="text"
          name="name"
          label="apartment name"
          variant="bordered"
          className="px-2 p-2"
          placeholder="Enter the name of the apartment"
          onChange={formik.handleChange}
          value={formik.values.name}
          errorMessage = {formik.touched.paymentAmount && formik.errors.paymentAmount && formik.errors.name }        
        />

        <Input
          type="text"
          name="building"
          label="building"
          variant="bordered"
          className="px-2 p-2"
          placeholder="Enter the building"
          onChange={formik.handleChange}
          value={formik.values.building}
          errorMessage = {formik.touched.paymentAmount && formik.errors.paymentAmount && formik.errors.building }        
        />


        <Input
          type="number"
          name="floor"
          label="floor"
          variant="bordered"
          className="px-2 p-2"
          placeholder="Enter the flore number"
          onChange={formik.handleChange}
          value={formik.values.floor}
          errorMessage = {formik.touched.paymentAmount && formik.errors.paymentAmount && formik.errors.floor }        
        />

        <Input
          type="number"
          name="paymentAmount"
          className="px-2 p-2"
          label="payment amount"
          variant="bordered"
          placeholder="Enter the payment amount"
          onChange={formik.handleChange}
          value={formik.values.paymentAmount}
          errorMessage = {formik.touched.paymentAmount && formik.errors.paymentAmount && formik.errors.paymentAmount }        
          />

        <Input
          type="text"
          name="paymentFrequency"
          className="px-2 p-2"
          label="payment Frequency"
          variant="bordered"
          placeholder="Enter the payment Frequency"
          onChange={formik.handleChange}
          value={formik.values.paymentFrequency}
          errorMessage = {formik.touched.paymentAmount && formik.errors.paymentAmount && formik.errors.paymentFrequency }        
          />

          <Input
          type="number"
          name="paymentDueDate"
          className="px-2 p-2"
          label="payment DueDate"
          variant="bordered"
          placeholder="Enter the payment DueDate"
          onChange={formik.handleChange}
          value={formik.values.paymentDueDate}
          errorMessage = {formik.touched.paymentAmount && formik.errors.paymentAmount && formik.errors.paymentDueDate }        
          />



      <ModalFooter>
        <Button color="danger" variant="light" onPress={onClose}>
          Close
        </Button>
        <Button color="primary" type="submit">
          Update apartment
        </Button>
      </ModalFooter>
    </form>
  );
};

export default UpdateApartmentForm;
