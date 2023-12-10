import { Button } from "@nextui-org/react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="grid h-screen px-4 bg-white place-content-center">
      <div className="text-center">
        <h1 className="font-black text-gray-200 text-9xl">404</h1>

        <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Uh-oh!
        </p>

        <p className="mt-4 text-gray-500">We can&rsquo;t find that page.</p>
        <Button
          color="default"
          className="mt-3 px-8 py-5"
          variant="shadow"
          as={Link}
          to="/"
        >
          Go Back Home
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
