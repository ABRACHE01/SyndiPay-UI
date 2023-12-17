import React, { useEffect, useState } from "react";
import { VerticalDotsIcon } from "../../../assets/icons";
import { CustomModal } from "../../../shared/components";
import { 
  useGetAllClientsQuery ,
  useDeleteClientMutation,
  useCreateClientMutation,
  useUpdateClientMutation
} from "../redux/clientApiSlice";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownTrigger,
  useDisclosure
} from "@nextui-org/react";
import { format, formatDistanceToNow } from 'date-fns';
import AddClientForm from "../components/AddClientForm";
import UpdateClientForm from "../components/UpdateClientForm";

export default function ClientsPage() {
  
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [clientData, setClientData] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [isAddingClient, setIsAddingClient] = useState(false);
  
  const { data: clients, isSuccess, refetch } = useGetAllClientsQuery();
  const [deleteClient]= useDeleteClientMutation();
  const [createClient] = useCreateClientMutation();
  const [updateClient] = useUpdateClientMutation();

  useEffect(() => {
    if (isSuccess) {
      setClientData(clients.clients);
    }
  }, [isSuccess, clients]);

  const handleAddClient = async (values) => {
    try {
      await createClient(values);
      onClose();
      refetch();
    } catch (error) {
      console.error("Error adding menu:", error);
    }
  };

  const handleDeleteClient = (clientId) => {
    deleteClient(clientId);
    refetch();
  };

  const openAddClient = () => {
    setSelectedClient(null);
    setIsAddingClient(true);
    onOpen();
  };

  const openEditClient = (client) => {
    setSelectedClient(client);
    setIsAddingClient(false);
    onOpen();
  };
  
  const handleSubmitClientForm = async (values) => {
    try {
      if (isAddingClient) {
        await handleAddClient(values);
      } else {
        await updateClient({
          clientId: selectedClient._id,
          clientData: values
        });
        refetch();
      }
      onClose();
    } catch (error) {
      console.error("Error submitting client form:", error);
    }
  };

  return (
    <div className="text-center p-10">
      <h1 className="font-bold text-4xl ">
        Hi, you can create your own Client
      </h1>
      <div className="m-4">
        <Button onPress={openAddClient}>Add a Client</Button>

        <CustomModal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          title={isAddingClient ? "Insert a Client" : "Edit a Client"}
          content={
            isAddingClient ? (
              <AddClientForm
                onClose={onClose}
                onSubmit={handleSubmitClientForm}
                refetch={refetch} 
              />
            ) : (
              <UpdateClientForm
                onClose={onClose}
                onSubmit={handleSubmitClientForm}
                userData={selectedClient}
                refetch={refetch} 
              />
            )
          }
        />

        <Table isStriped aria-label="Client Data Table" className="m-4">
          <TableHeader>
            <TableColumn>CIN</TableColumn>
            <TableColumn>First Name</TableColumn>
            <TableColumn>Last Name</TableColumn>
            <TableColumn>Email</TableColumn>
            <TableColumn>Phone Number</TableColumn>
            <TableColumn>Created At</TableColumn>
            <TableColumn>Is Active Resident</TableColumn>
            <TableColumn>Actions</TableColumn>
          </TableHeader>
          <TableBody>
            {clientData.map((client) => (
              <TableRow key={client._id}>
                <TableCell>{client.CIN}</TableCell>
                <TableCell>{client.firstName}</TableCell>
                <TableCell>{client.lastName}</TableCell>
                <TableCell>{client.email}</TableCell>
                <TableCell>{client.phoneNumber}</TableCell>
                <TableCell>
                  {formatDistanceToNow(new Date(client.createdAt))}
                </TableCell>
                <TableCell>{client.isActiveResident ? "Yes" : "No"}</TableCell>
                <TableCell>
                  <div className="relative flex justify-end items-center gap-2">
                    <Dropdown>
                      <DropdownTrigger>
                        <Button isIconOnly size="sm" variant="light">
                          <VerticalDotsIcon/>
                          </Button>
                      </DropdownTrigger>
                      <DropdownMenu aria-label="Client Actions">
                        <DropdownItem onClick={() => openEditClient(client)}>Edit</DropdownItem>
                        <DropdownItem
                          color="danger"
                          onClick={() => handleDeleteClient(client._id)}
                        >Delete</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
