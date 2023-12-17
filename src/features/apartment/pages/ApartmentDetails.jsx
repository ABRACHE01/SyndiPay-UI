import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetApartmentByIdQuery } from "../redux/apartmentApiSlice";
import { useGetPaymentByApartmentIdQuery , useCreatePaymentMutation, useDeletePaymentMutation, useUpdatePaymentMutation } from "../../payment/redux/paymentApiSlice";
import { formatDistanceToNow } from "date-fns";
import  {CustomModal} from "../../../shared/components"
import { AddPaymentForm  , UpdatePaymentForm} from "../../payment/components"
import {VerticalDotsIcon} from "../../../assets/icons"
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
  const { data: payments , refetch } = useGetPaymentByApartmentIdQuery(id);
  const [createPayment] = useCreatePaymentMutation();
  const [deletePayment] = useDeletePaymentMutation();

  useEffect(() => {
    if (isSuccess && apartment) {
      setApartmentData(apartment.apartment);
      setPaymentsData(payments.payments);
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
                      <dt className="text-sm font-medium text-gray-500">Name</dt>
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
                      <dt className="text-sm font-medium text-gray-500">Floor</dt>
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
                    {apartmentData.clients.map((client) => (
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
                          color="success"
                          size="md"
                          className="text-teal-50"
                          variant="solid"
                        >
                          {" "}
                          Is resendent{" "}
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
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Payments Details
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Details and information about the payment.
              </p>
            </div>
            <Button onPress={openAddPayment}>Add a Payment</Button>

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
                    apartmentId = {id}
                  />
                ) : (
                  <UpdatePaymentForm
                    onClose={onClose}
                    onSubmit={handleSubmitPaymentForm}
                    selectedPayment={selectedPayment}
                    refetch={refetch} 
                    apartmentId = {id}
                  />
                )
              }
            />
            {paymentsData &&
              paymentsData.map((payment) => (
                <div key={payment._id} className="gap-2 grid grid-cols-2 sm:grid-cols-4">
                  <Card className="py-4">
                    <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                      <h4 className="font-bold text-large">Payment Details</h4>
                      <div className="relative flex justify-end items-center gap-2">

                    <Dropdown>
                      <DropdownTrigger>
                        <Button isIconOnly size="sm" variant="light">
                          <VerticalDotsIcon/>
                          </Button>
                      </DropdownTrigger>
                      <DropdownMenu aria-label="Client Actions">
                        <DropdownItem onClick={() => openEditPayment(payment)}>Edit</DropdownItem>
                        <DropdownItem
                          color="danger"
                          onClick={() => handleDeletePayment(payment._id)}
                        >Delete</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                    
                    
                    </CardHeader>
                    <CardBody className="overflow-visible py-2">
                      <div className="flex flex-col">
                        <div className="mb-2">
                          <span className="font-bold">Is Paid:</span>
                          <span>{payment.isPaid ? "Yes" : "No"}</span>
                        </div>
                        <div className="mb-2">
                          <span className="font-bold">Notes:</span>
                          <span>{payment.notes}</span>
                        </div>
                        <div className="mb-2">
                          <span className="font-bold">Payment Date:</span>
                          <span>{payment.paymentDate}</span>
                        </div>
                        <div className="mb-2">
                          <span className="font-bold">Payment Method:</span>
                          <span>{payment.paymentMethod}</span>
                        </div>
                        <div className="mb-2">
                          <span className="font-bold">Created At:</span>
                          <span>{payment.createdAt}</span>
                        </div>
                        <p className="text-tiny uppercase font-bold">
                        Amount: ${payment.amount}
                      </p>
                      </div>
                    </CardBody>
                  </Card>
                </div>
              ))}
          </section>
        </div>
      )}
    </>
  );
};

export default ApartmentDetails;
