import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetApartmentByIdQuery } from "../redux/apartmentApiSlice";

import {
  useGetPaymentByApartmentIdQuery,
  useCreatePaymentMutation,
  useDeletePaymentMutation,
} from "../../payment/redux/paymentApiSlice";
import { format, formatDistanceToNow } from "date-fns";
import { CustomModal } from "../../../shared/components";
import {
  AddPaymentForm,
  PaymentPrinter,
  UpdatePaymentForm,
} from "../../payment/components";
import { VerticalDotsIcon } from "../../../assets/icons";
import {
  Dropdown,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  DropdownTrigger,
  DropdownItem,
  DropdownMenu,
  Chip,
  ScrollShadow,
  Avatar,
  Button,
  useDisclosure,
} from "@nextui-org/react";

const ApartmentDetails = () => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const [apartmentData, setApartmentData] = useState(null);
  const [paymentsData, setPaymentsData] = useState();
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [isAddingPayment, setIsAddingPayment] = useState(false);

  const { id } = useParams();
  const { data: apartment, isSuccess } = useGetApartmentByIdQuery(id);
  const { data: payments, refetch } = useGetPaymentByApartmentIdQuery(id);
  const [createPayment] = useCreatePaymentMutation();
  const [deletePayment] = useDeletePaymentMutation();

  useEffect(() => {
    if (isSuccess && apartment) {
      setApartmentData(apartment?.apartment);
      setPaymentsData(payments?.payments);
    }
  }, [payments, apartment]);

  const handleAddPayment = async (values) => {
    try {
      await createPayment(values);
      onClose();
      refetch();
    } catch (error) {
      console.error("Error adding menu:", error);
    }
  };
  const openAddPayment = () => {
    setSelectedPayment(null);
    setIsAddingPayment(true);
    onOpen();
  };

  const openEditPayment = (payment) => {
    setSelectedPayment(payment);
    setIsAddingPayment(false);
    onOpen();
  };

  const handleSubmitPaymentForm = async (values) => {
    try {
      if (isAddingPayment) {
        await handleAddPayment(values);
      }

      onClose();
    } catch (error) {
      console.error("Error submitting client form:", error);
    }
  };

  const handleDeletePayment = (paymentId) => {
    deletePayment(paymentId);
    refetch();
  };

  if (!isSuccess) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {apartmentData && (
        <div>
          <section className="grid grid-cols-2 gap-4">
            <div className="p-4 m-4 border-2 border-gray-200 border-dashed rounded-lg ">
              <div className="bg-white max-w-2xl shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Apartment Details
                  </h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    Details and information about the apartment.
                  </p>
                </div>
                <div className="border-t border-gray-200">
                  <dl>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Name
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {apartmentData.name}
                      </dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Building
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {apartmentData.building}
                      </dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Floor
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {apartmentData.floor}
                      </dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Payment Amount
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        ${apartmentData.paymentAmount}
                      </dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Payment Frequency
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {apartmentData.paymentFrequency}
                      </dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Payment Due Date
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {apartmentData.paymentDueDate}
                      </dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Is Occupied
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {apartmentData.isOccupied ? "Yes" : "No"}
                      </dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Created At
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {formatDistanceToNow(new Date(apartmentData.createdAt))}
                        ago
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
            <div className="p-4 m-4 border-2 border-gray-200 border-dashed rounded-lg flex justify-center ">
              <Card className="max-w-[500px]">
                <CardHeader className="flex gap-3">
                  <div className="flex flex-col">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Cliens
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                      The apartment clients and Old clients
                    </p>
                  </div>
                </CardHeader>
                <Divider />
                <CardBody>
                  <ul>
                    {apartmentData.clients?.map((client) => (
                      <div key={client._id} className="flex gap-5">
                        <Avatar
                          alt="Avatar"
                          name={client.firstName}
                          className="w-8 h-8 rounded-full mr-2 object-cover"
                          isBordered
                          radius="full"
                          size="md"
                        />{" "}
                        <div className="flex flex-col gap-1 items-start justify-center">
                          <h4 className="text-small font-semibold leading-none text-default-600">
                            {client.firstName} {client.lastName}
                          </h4>
                          <h5 className="text-small tracking-tight text-default-400">
                            {client.email} {client.phoneNumber}
                          </h5>
                        </div>
                        <Chip
                          color={client.isActiveResident ? "success" : "danger"}
                          size="md"
                          className="text-teal-50"
                          variant="solid"
                        >
                          {client.isActiveResident
                            ? "Is resendent"
                            : " No longer resendent "}
                        </Chip>
                      </div>
                    ))}
                  </ul>
                </CardBody>
                <Divider />
                <CardFooter>
                  <Link isExternal showAnchorIcon href="">
                    see all clients
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </section>

          <section className="p-4 m-4 border-2 border-gray-200 border-dashed rounded-lg ">
            <div className="px-4 py-5 sm:px-6 flex justify-between">
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Payments Details
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Details and information about the payment.
                </p>
              </div>
              <Button
                className="m-1"
                variant="bordered"
                onPress={openAddPayment}
              >
                Add a Payment
              </Button>
            </div>

            <CustomModal
              isOpen={isOpen}
              onOpenChange={onOpenChange}
              title={isAddingPayment ? "Insert a Payment" : "Edit a Payment"}
              content={
                isAddingPayment ? (
                  <AddPaymentForm
                    onClose={onClose}
                    onSubmit={handleSubmitPaymentForm}
                    refetch={refetch}
                    apartmentId={id}
                  />
                ) : (
                  <UpdatePaymentForm
                    onClose={onClose}
                    onSubmit={handleSubmitPaymentForm}
                    selectedPayment={selectedPayment}
                    refetch={refetch}
                    apartmentId={id}
                  />
                )
              }
            />
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 m-4 border-2 border-gray-200 border-dashed rounded-lg ">
                <ScrollShadow hideScrollBar className="w-[100] h-[500px]">
                  {paymentsData &&
                    paymentsData.map((payment) => (
                      <div key={payment._id}>
                        <Card key={payment._id} className="py-2 m-20 ">
                          <CardHeader className="pb-0 pt-2 px-4">
                            <div className=" flex justify-between items-center gap-32">
                              <Dropdown>
                                <DropdownTrigger>
                                  <Button isIconOnly size="sm" variant="light">
                                    <VerticalDotsIcon />
                                  </Button>
                                </DropdownTrigger>
                                <DropdownMenu aria-label="Client Actions">
                                  <DropdownItem
                                    onClick={() => openEditPayment(payment)}
                                  >
                                    Edit
                                  </DropdownItem>
                                  <DropdownItem
                                    color="success"
                                    onClick={() => setSelectedPayment(payment)}
                                  >
                                    Print
                                  </DropdownItem>
                                  <DropdownItem
                                    color="danger"
                                    onClick={() =>
                                      handleDeletePayment(payment._id)
                                    }
                                  >
                                    Delete
                                  </DropdownItem>
                                </DropdownMenu>
                              </Dropdown>
                            </div>
                          </CardHeader>
                          <CardBody className="overflow-visible px-6 py-4">
                            <div className="border border-gray-300 rounded p-4">
                              <div className="flex justify-between items-center mb-6">
                                <div>
                                  <h2 className="text-2xl font-bold">
                                    Invoice
                                  </h2>
                                  <p className="text-gray-600">
                                    Payment Details
                                  </p>
                                </div>
                                <div className="text-right">
                                  <p className="text-sm text-gray-600">
                                    Invoice Number:
                                  </p>
                                  <p className="text-lg font-semibold">
                                    INV-20230001
                                  </p>
                                </div>
                              </div>
                              <div className="flex flex-col mb-6">
                                <div className="flex justify-between mb-2">
                                  <span className="font-bold">Is Paid:</span>
                                  <span className="ml-2">
                                    {payment.isPaid ? "Yes" : "No"}
                                  </span>
                                </div>
                                <div className="flex justify-between mb-2">
                                  <span className="font-bold">Notes:</span>
                                  <span className="ml-2">{payment.notes}</span>
                                </div>
                                <div className="flex justify-between mb-2">
                                  <span className="font-bold">
                                    Payment Date:
                                  </span>
                                  <span className="ml-2">
                                    {format(
                                      new Date(payment.paymentDate),
                                      "'on' MMMM do"
                                    )}
                                  </span>
                                </div>
                                <div className="flex justify-between mb-2">
                                  <span className="font-bold">
                                    Payment Method:
                                  </span>
                                  <span className="ml-2">
                                    {payment.paymentMethod}
                                  </span>
                                </div>
                                <div className="flex justify-between mb-2">
                                  <span className="font-bold">Created At:</span>
                                  <span className="ml-2">
                                    {formatDistanceToNow(
                                      new Date(payment.createdAt)
                                    )}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="font-bold">Amount:</span>
                                  <span className="ml-2">
                                    ${payment.amount}
                                  </span>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-sm text-gray-600">
                                  Total Amount:
                                </p>
                                <p className="text-lg font-semibold">
                                  ${payment.amount}
                                </p>
                              </div>
                            </div>
                          </CardBody>
                        </Card>
                      </div>
                    ))}
                </ScrollShadow>
              </div>
              <div className="p-4 m-4 border-2 border-gray-200 border-dashed rounded-lg flex justify-center items-center  ">
                {selectedPayment ? (
                  <PaymentPrinter dataPayment={selectedPayment} />
                ) : (
                  <p className="text-xl font-semibold text-gray-500">
                    Printing area content goes here
                  </p>
                )}
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default ApartmentDetails;
