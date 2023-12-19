import React, { useEffect, useState } from "react";
import { VerticalDotsIcon } from "../../../assets/icons";
import { useNavigate } from "react-router-dom";
import { CustomModal , Spinner } from "../../../shared/components";
import {
  Card,
  CardBody,
  CardFooter,
  Avatar,
  Image,
  Button,
  useDisclosure,
  CardHeader,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Chip,
} from "@nextui-org/react";

import {
  useCreateApartmentMutation,
  useDeleteApartmentMutation,
  useGetAllApartmentsQuery,
} from "../redux/apartmentApiSlice";
import AddApartmentForm from "../components/AddApartmentForm";
import UpdateApartmentForm from "../components/UpdateApartmentForm";

export default function ApartmentsPage() {
  const [selectedApartment, setSelectedApartment] = useState(null);
  const [apartmentData, setApartmentData] = useState(null);

  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const {
    data: apartments,
    isSuccess,
    refetch,
  } = useGetAllApartmentsQuery();
  const [createApartment] = useCreateApartmentMutation();
  const [deleteApartment] = useDeleteApartmentMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      setApartmentData(apartments.apartments);
    }
  }, [isSuccess, apartments]);

  const handleAddApartment = async (values) => {
    try {
      await createApartment(values);
      onClose();
      refetch();
    } catch (error) {
      console.error("Error adding menu:", error);
    }
  };

  const handleDeleteApartment = (apartmentId) => {
    deleteApartment(apartmentId);
    refetch();
  };

  const openEditApartment = (apartment) => {
    setSelectedApartment(apartment);
    onOpen();
  };

  if (false) {
    return <Spinner />;
  }

  return (
    <>
     <div className="h-[80vh] p-4 m-4 border-2 border-gray-200 border-dashed rounded-lg  ">
      
      <div className="text-center p-10 ">
        <h1 className="font-bold text-4xl mb-4">
          Hi, you can create your own apartments
        </h1>
        <div className="text-3xl">
        <Button onPress={onOpen}>Add Apartment</Button>
            <CustomModal
              isOpen={isOpen && !selectedApartment}
              onOpenChange={onOpenChange}
              title="Insert an apartment"
              content={
                <AddApartmentForm onClose={onClose} onSubmit={handleAddApartment} />
              }
            />
            
            <CustomModal
              isOpen={isOpen && selectedApartment}
              onOpenChange={onOpenChange}
              title="Edit an apartment"
              content={
                <UpdateApartmentForm
                  onClose={onClose}
                  refetch={refetch}
                  selectedApartment={selectedApartment}
                />
              }
            />
        </div>
      </div>

      <div className="gap-5 grid grid-cols-2 sm:grid-cols-4 mx-5">
        {apartmentData &&
          apartmentData.map((apartment, index) => (
            
            <Card
              shadow="sm"
              key={index}
              isPressable
              onPress={() => navigate(`/apartments/${apartment._id}`)}
            >
              <CardHeader className="text-small justify-between">
                <h4 className="font-bold text-large">{apartment.name}</h4>
            <Dropdown  backdrop="blur">
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <VerticalDotsIcon className="text-default-300" />
                </Button>
              </DropdownTrigger>  
              <DropdownMenu aria-label="Client Actions">
              <DropdownItem onClick={() => openEditApartment(apartment)}>
                  Edit
                </DropdownItem>
                    <DropdownItem
                      color="danger"
                      onClick={() => handleDeleteApartment(apartment._id)}
                    >
                      Delete
                    </DropdownItem>
              </DropdownMenu>
            </Dropdown>
                
              </CardHeader>

              <CardBody className="overflow-visible py-2">
                <Image
                  shadow="sm"
                  radius="lg"
                  width="100%"
                  alt={apartment.name}
                  className="w-full object-cover h-[140px]"
                  src="https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg"
                />
              </CardBody>
              <CardFooter className="text-small justify-between">
                <div>{apartment.building}</div>
                <div className="text-default-500">
                  {apartment.isOccupied ? (
                    <Chip size="sm" color="success">
                      Occupied
                    </Chip>
                  ) : (
                    <Chip  color="danger">Vacant</Chip>
                  )}
                </div>
              </CardFooter>
              <div className="p-6">
                <div className="flex justify-between items-center">
                 {apartment?.clients && apartment?.clients[0] && <div className="flex items-center">
                    <Avatar
                      alt="Avatar"
                      name={
                        apartment.clients[0]?.firstName +
                        " " +
                        apartment.clients[0]?.lastName
                      }
                      className="w-8 h-8 rounded-full mr-2 object-cover"
                    />
                    <span className="text-gray-800 font-semibold">
                      {apartment.clients[0]?.firstName +
                        " " +
                        apartment.clients[0]?.lastName}
                    </span>
                  </div>}
                  <div className="flex justify-between"></div>
                </div>
              </div>
            </Card>
          ))}
      </div>
    </div>
    </>
  );
}
