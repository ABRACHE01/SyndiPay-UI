import React from "react";
import { Sidebar } from "../components";
import { Button } from "@nextui-org/react";

function Dashboard() {
  return (
    <>
      <Sidebar
        Children={
          <>
           <div className="p-4 m-4 border-2 border-gray-200 border-dashed rounded-lg flex flex-col justify-center items-center">
            <p className="text-xl font-semibold text-gray-500 ">
              Apartment area content goes here
            </p>
          </div>
          <div className="p-4 m-4 border-2 border-gray-200 border-dashed rounded-lg flex flex-col justify-center items-center">
              <p className="text-xl font-semibold text-gray-500">
                Client area content goes here
              </p>
            </div>
            <div className="p-4 m-4 border-2 border-gray-200 border-dashed rounded-lg flex flex-col justify-center items-center">
              <div className="text-xl font-semibold text-gray-500">
                Payment area content goes here
              </div>
            </div>
          </>
        }
      />
    </>
  );
}

export default Dashboard;
