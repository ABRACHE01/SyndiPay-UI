import React from "react";
import { useFormik } from "formik";
import { updateClientSchema } from "../schemas"
import { Input, ModalFooter, Button, Switch, cn } from "@nextui-org/react";
import { useUpdateClientMutation } from "../redux/clientApiSlice";

const UpdateClientForm = ({ onClose , userData , refetch }) => {

    const [UpdateClient] = useUpdateClientMutation();

    const formik = useFormik({
        initialValues: {
          CIN: userData.CIN,
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          phoneNumber: userData.phoneNumber,
        },
    validationSchema: updateClientSchema,
    onSubmit: async (values) => {
        const clientId = userData._id;
        const clientData = values;
        await UpdateClient({ clientId, clientData });
        onClose();
        refetch();
      },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Input
        type="text"
        name="CIN"
        label="CIN"
        variant="bordered"
        className="px-2 p-2"
        placeholder="Enter CIN"
        onChange={formik.handleChange}
        value={formik.values.CIN}
        errorMessage={
          formik.touched.CIN && formik.errors.CIN && formik.errors.CIN
        }
      />

      <Input
        type="text"
        name="firstName"
        label="First Name"
        variant="bordered"
        className="px-2 p-2"
        placeholder="Enter First Name"
        onChange={formik.handleChange}
        value={formik.values.firstName}
        errorMessage={
          formik.touched.firstName && formik.errors.firstName && formik.errors.firstName
        }
      />

      <Input
        type="text"
        name="lastName"
        label="Last Name"
        variant="bordered"
        className="px-2 p-2"
        placeholder="Enter Last Name"
        onChange={formik.handleChange}
        value={formik.values.lastName}
        errorMessage={
          formik.touched.lastName && formik.errors.lastName && formik.errors.lastName
        }
      />

      <Input
        type="email"
        name="email"
        label="Email"
        variant="bordered"
        className="px-2 p-2"
        placeholder="Enter Email"
        onChange={formik.handleChange}
        value={formik.values.email}
        errorMessage={
          formik.touched.email && formik.errors.email && formik.errors.email
        }
      />

     

      <Input
        type="tel"
        name="phoneNumber"
        label="Phone Number"
        variant="bordered"
        className="px-2 p-2"
        placeholder="Enter Phone Number"
        onChange={formik.handleChange}
        value={formik.values.phoneNumber}
        errorMessage={
          formik.touched.phoneNumber &&
          formik.errors.phoneNumber &&
          formik.errors.phoneNumber
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

export default UpdateClientForm;