import { Button } from "@nextui-org/react";
import { verifiedImg, somethingWentWrongImg } from "../../../assets/images";
import { Link, useLocation } from "react-router-dom";
import { useVerifyEmailMutation } from "../redux/mailApiSlice";
import { useEffect, useState } from "react";

const VerifyEmailPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");

  const [verifyEmail] = useVerifyEmailMutation();
  const [errorStatus, setErrorStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const verify = async () => {
      try {
        await verifyEmail({ token }).unwrap();
      } catch (err) {
        setErrorStatus(err?.status || 500);
        setErrorMessage(err?.data?.message || "Something went wrong");
      }
    };
    verify();
  }, [verifyEmail, token]);

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="max-w-xs overflow-hidden bg-white rounded-lg shadow-lg">
        {errorStatus ? (
          <>
            <div
              style={{
                width: "100%",
                height: "280px",
                backgroundImage: `url(${somethingWentWrongImg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <div className="px-4 py-2 text-center">
              <h1 className="text-xl font-bold text-gray-800 uppercase">
                {errorStatus} Error
              </h1>
              <p className="mt-1 text-sm text-gray-600">
                {errorMessage}. Please try again
              </p>
            </div>
          </>
        ) : (
          <>
            <div
              style={{
                width: "100%",
                height: "280px",
                backgroundImage: `url(${verifiedImg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <div className="px-4 py-2 text-center">
              <h1 className="text-xl font-bold text-gray-800 uppercase">
                Awesome!
              </h1>
              <p className="mt-1 text-sm text-gray-600">
                Your account was successfully verified.
              </p>
            </div>

            <Button
              variant="shadow"
              color="primary"
              fullWidth
              className="mt-4 uppercase"
              as={Link}
              to="/"
            >
              Got it
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyEmailPage;
