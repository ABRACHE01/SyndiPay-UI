import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Checkbox, Input } from "@nextui-org/react";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { EyeFilledIcon, EyeSlashFilledIcon } from "../../../assets/icons";
import { loginSchema } from "../schemas";
import { useLoginMutation } from "../redux/authApiSlice";
import { setCredentials } from "../redux/authSlice";
import { Alert } from "../../../shared/components";
import { encryptData } from "../../../utils/helpers";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isVisible, setIsVisible] = useState(false);
  const [error, setError] = useState(null);
  
  const toggleVisibility = () => setIsVisible(!isVisible);

  const [login, { isLoading }] = useLoginMutation();

  const { values, errors, touched, handleChange, handleSubmit, handleBlur } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: loginSchema,
      onSubmit: async ({ email, password }) => {
        try {
          const { user } = await login({ email, password }).unwrap();

          dispatch(setCredentials({ ...user }));

          const encryptedUser = encryptData(user);
          localStorage.setItem("user", encryptedUser);

          navigate("/dashboard");
        } catch (error) {
          if (!error?.data) setError("No response");
          else if (error?.status === 400) setError("Invalid credentials");
          else if (error?.status === 404) setError("User not found");
          else if (error?.status === 401) setError("Incorrect password");
          else setError("Login failed");
        }
      },
    });

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <Alert mode="error" message={error} onClose={() => setError(null)} />
      )}

      <div className="mt-4">
        <Input
          type="email"
          variant="bordered"
          label="Email"
          name="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          isInvalid={touched.email && errors.email ? true : false}
          errorMessage={errors.email && touched.email ? errors.email : null}
        />
      </div>

      <div className="mt-4">
        <Input
          label="Password"
          name="password"
          variant="bordered"
          type={isVisible ? "text" : "password"}
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          isInvalid={touched.password && errors.password ? true : false}
          errorMessage={
            errors.password && touched.password ? errors.password : null
          }
          endContent={
            <button
              className="focus:outline-none"
              type="button"
              onClick={toggleVisibility}
            >
              {isVisible ? (
                <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
        />

        <div className="flex justify-between w-full mt-4">
          <Checkbox size="md">Remember me</Checkbox>
          <Link
            to="/forget-password"
            className="text-xs text-gray-500 hover:underline"
          >
            Forget Password?
          </Link>
        </div>
      </div>

      <div className="mt-6">
        <Button fullWidth  className=" text-white" color="success" type="submit" isLoading={isLoading}>
          Sign In
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
