import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { addApartmentSchema } from "../schemas";
import {
  Input,
  ModalFooter,
  Button,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useGetAllClientsQuery } from "../../client/redux/clientApiSlice";

const AddApartmentForm = ({ onSubmit, onClose }) => {
  const { data: clients, isSuccess } = useGetAllClientsQuery();
  const [clientData, setClientData] = useState([]);


  useEffect(() => {
    if (isSuccess) {
      const filteredClients = clients.clients.filter(
        (client) => client.isActiveResident === false
      );
      setClientData(filteredClients);
    }
  }, [isSuccess, clients]);


  const formik = useFormik({
    initialValues: {
      name: "",
      building: "",
      floor: "",
      paymentAmount: "",
      paymentFrequency: "",
      paymentDueDate: "",
      clients: "",
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
        label="the resedent"
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
        placeholder="Enter the flore number"
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
        className="px-2 p-2"
        label="payment amount"
        variant="bordered"
        placeholder="Enter the payment amount"
        onChange={formik.handleChange}
        value={formik.values.paymentAmount}
        errorMessage={
          formik.touched.paymentAmount &&
          formik.errors.paymentAmount &&
          formik.errors.paymentAmount
        }
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
        errorMessage={
          formik.touched.paymentAmount &&
          formik.errors.paymentAmount &&
          formik.errors.paymentFrequency
        }
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
        errorMessage={
          formik.touched.paymentAmount &&
          formik.errors.paymentAmount &&
          formik.errors.paymentDueDate
        }
      />


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
