import React from "react";
import { Card, CardBody } from "@nextui-org/react";

export default function CustomCard({ children }) {
  return (
    <Card>
      <CardBody>
        {children}
      </CardBody>
    </Card>
  );
}