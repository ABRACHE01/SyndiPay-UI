import React from "react";
import {Listbox, ListboxItem, ListboxSection, cn} from "@nextui-org/react";


 const ListboxWrapper = ({children}) => (
    <div className="w-full max-w-[260px] border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
      {children}
    </div>
  );

export default function List() {

  return (
    <ListboxWrapper>
      <Listbox variant="flat" aria-label="Listbox menu with sections">
        <ListboxSection title="Actions" showDivider>  
          <ListboxItem
            key="new"
            description="Create a new file"
            startContent=""
          >
            Clients
          </ListboxItem>
          <ListboxItem
            key="copy"
            description="Copy the file link"
            startContent=""
          >
            Appartments
          </ListboxItem>
          <ListboxItem
            key="edit"
            description="Allows you to edit the file"
            startContent=""
          >
            Payments
          </ListboxItem>
        </ListboxSection> 
        <ListboxSection title="Danger zone">  
          <ListboxItem
            key="delete"
            className="text-danger"
            color="danger"
            description="Permanently delete the file"
            startContent=""
          >
            Delete file
          </ListboxItem>
        </ListboxSection> 
      </Listbox>
    </ListboxWrapper>
  );
}
