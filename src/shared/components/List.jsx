import React from "react";
import {Listbox, ListboxItem} from "@nextui-org/react";
import { Link } from "react-router-dom";


 const ListboxWrapper = ({children}) => (
    <div className="w-full max-w-[260px] border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
      {children}
    </div>
  );

export default function List() {

  return (
    <ListboxWrapper>
      <Listbox variant="flat" aria-label="Listbox menu with sections">
          <ListboxItem
            key="new"
            description="Client SEction"
            startContent=""
          >
            <Link to="/clients">
            Clients
            </Link>
            
          </ListboxItem>
          <ListboxItem
            key="copy"
            description="Apartment section"
            startContent=""
          >
            <Link to="/apartments">
            Appartments
            </Link>
          </ListboxItem>
   
      </Listbox>
    </ListboxWrapper>
  );
}
