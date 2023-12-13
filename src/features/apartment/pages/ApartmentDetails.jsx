import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetApartmentByIdQuery } from "../redux/apartmentApiSlice";
import { formatDistanceToNow } from 'date-fns';

const ApartmentDetails = () => {
  const [apartmentData, setApartmentData] = useState(null);
  const { id } = useParams();
  const { data: apartment, isSuccess } = useGetApartmentByIdQuery(id);

  console.log(apartment)
  
  useEffect(() => {
    if (isSuccess && apartment) {
      setApartmentData(apartment.apartment);
    }
  }, [isSuccess, apartment]);

  if (!isSuccess) {
    return <div>Loading...</div>;
  }

  return (
    <div>
    {apartmentData && (
      <>
            <h1>Apartment Details</h1>
      <p>Name: {apartmentData.name}</p>
      <p>Building: {apartmentData.building}</p>
      <p>Client: {apartmentData.client.firstName} {apartmentData.client.lastName}</p>
      <p>Email: {apartmentData.client.email}</p>
      <p>Phone Number: {apartmentData.client.phoneNumber}</p>
      <p>Floor: {apartmentData.floor}</p>
      <p>Payment Amount: ${apartmentData.paymentAmount}</p>
      <p>Payment Frequency: {apartmentData.paymentFrequency}</p>
      <p>Payment Due Date: {apartmentData.paymentDueDate}</p>
      <p>Added By: {apartmentData.addedBy}</p>
      <p>Is Occupied: {apartmentData.isOccupied ? "Yes" : "No"}</p>
      <p>Is Deleted: {apartmentData.isDeleted ? "Yes" : "No"}</p>
      <p>Created At: {formatDistanceToNow(new Date(apartmentData.createdAt))} ago</p>
      <p>Updated At: {formatDistanceToNow(new Date(apartmentData.updatedAt))} ago</p>
      </>
    )}
  </div>
  );
};

export default ApartmentDetails;

