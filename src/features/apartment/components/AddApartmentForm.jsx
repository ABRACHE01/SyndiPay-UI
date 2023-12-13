import React from "react";
import { useFormik } from "formik";
import { addApartmentSchema } from "../schemas";
import {Input , ModalFooter, Button ,Switch, cn} from "@nextui-org/react";

const AddApartmentForm = ({ onSubmit ,onClose  }) => {
  const formik = useFormik({
    initialValues: {
      name: "",
      building: "",
      floor: "",
      paymentAmount: "",
      paymentFrequency: '',
      paymentDueDate: '',
      isOccupied: false,
    },
    validationSchema: addApartmentSchema,
    onSubmit: (values) => {
      console.log(values);
      onSubmit(values);
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

      <Switch
      value={formik.values.isOccupied}
      onValueChange={(value) => formik.setFieldValue("isOccupied", value)}
      classNames={{
        base: cn(
          "inline-flex flex-row-reverse w-full max-w-md bg-content1 hover:bg-content2 items-center",
          "justify-between cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent",
          "data-[selected=true]:border-primary",
        ),
        wrapper: "p-0 h-4 overflow-visible",
        thumb: cn("w-6 h-6 border-2 shadow-lg",
          "group-data-[hover=true]:border-primary",
          //selected
          "group-data-[selected=true]:ml-6",
          // pressed
          "group-data-[pressed=true]:w-7",
          "group-data-[selected]:group-data-[pressed]:ml-4",
        ),
      }}
    >
      <div className="flex flex-col gap-1">
        <p className="text-medium">apartment occupition</p>
        <p className="text-tiny text-default-400">
          please click if the apartment reserved.
        </p>
      </div>
    </Switch>


      <ModalFooter>
          <Button color="danger" variant="light" onPress={onClose}>
          Close
          </Button>
          <Button color="primary" type="submit">
          Insert apartment
          </Button>
        </ModalFooter>
    </form>
  );
};

export default AddApartmentForm;