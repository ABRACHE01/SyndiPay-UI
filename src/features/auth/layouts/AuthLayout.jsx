import { Outlet } from "react-router-dom";
import { Card, CardBody} from "@nextui-org/react";


const AuthLayout = () => {
 
  return (
    <section className="bg-white">
      <div className="container flex  justify-center px-6 mx-auto my-2">
        <div className="w-full max-w-md">
            <Card className="max-w-full">
              <CardBody className="overflow-hidden">
                <Outlet />
              </CardBody>
            </Card> 
          </div>
      </div>
    </section>
  );
};

export default AuthLayout;
