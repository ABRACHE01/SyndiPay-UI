import { useFormik } from "formik";
import { updateApartmentSchema } from "../schemas";
import { useUpdateApartmentMutation } from "../redux/apartmentApiSlice";
import React, { useState, useEffect } from "react";
import { Input, ModalFooter, Button, Select, SelectItem } from "@nextui-org/react";
import { useGetAllClientsQuery } from "../../client/redux/clientApiSlice";


const UpdateApartmentForm = ({ onClose, selectedApartment, refetch }) => {
  const [UpdateApartment] = useUpdateApartmentMutation();
  const { data: clients, isSuccess } = useGetAllClientsQuery();
  const [clientData, setClientData] = useState([]);

  useEffect(() => {
    if (isSuccess) {
      const filteredClients = clients.clients?.filter(
        (client) => client.isActiveResident === false
      );
      setClientData(filteredClients);
    }
  }, [isSuccess, clients]);

  const formik = useFormik({
    initialValues: {
      name: selectedApartment.name,
      building: selectedApartment.building,
      floor: selectedApartment.floor,
      paymentAmount: selectedApartment.paymentAmount,
      paymentFrequency: selectedApartment.paymentFrequency,
      paymentDueDate: selectedApartment.paymentDueDate,
      clients:"",
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
        errorMessage={
          formik.touched.paymentAmount &&
          formik.errors.paymentAmount &&
          formik.errors.name
        }
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
        errorMessage={
          formik.touched.paymentAmount &&
          formik.errors.paymentAmount &&
          formik.errors.building
        }
      />

      <Select
        label="the resident"
        placeholder="Select a Client"
        className="px-2 p-2"
        value={formik.values.clients}
        onChange={(selectedClient) =>
          formik.setFieldValue("clients", selectedClient.target.value)
        }
      >
        {clientData.map((client) => (
          <SelectItem key={client._id} value={client._id}>
            {client.firstName}
          </SelectItem>
        ))}
      </Select>


      <Input
        type="number"
        name="floor"
        label="floor"
        variant="bordered"
        className="px-2 p-2"
        placeholder="Enter the floor number"
        onChange={formik.handleChange}
        value={formik.values.floor}
        errorMessage={
          formik.touched.paymentAmount &&
          formik.errors.paymentAmount &&
          formik.errors.floor
        }
      />

      <Input
        type="number"
        name="paymentAmount"
        label="payment amount"
        variant="bordered"
        className="px-2 p-2"
        placeholder="Enter the payment amount"
        onChange={formik.handleChange}
        value={formik.values.paymentAmount}
        errorMessage={
          formik.touched.paymentAmount && formik.errors.paymentAmount
        }
      />

      <Input
        type="text"
        name="paymentFrequency"
        label="payment frequency"
        variant="bordered"
        className="px-2 p-2"
        placeholder="Enter the payment frequency"
        onChange={formik.handleChange}
        value={formik.values.paymentFrequency}
        errorMessage={
          formik.touched.paymentFrequency &&
          formik.errors.paymentFrequency
        }
      />

      <Input
        type="text"
        name="paymentDueDate"
        label="payment due date"
        variant="bordered"
        className="px-2 p-2"
        placeholder="Enter the payment due date"
        onChange={formik.handleChange}
        value={formik.values.paymentDueDate}
        errorMessage={
          formik.touched.paymentDueDate && formik.errors.paymentDueDate
        }
      />

      <ModalFooter>
        <Button onClick={onClose} className="mr-2">
          Cancel
        </Button>
        <Button type="submit" color="primary">
          Update
        </Button>
      </ModalFooter>
    </form>
  );
};

export default UpdateApartmentForm;