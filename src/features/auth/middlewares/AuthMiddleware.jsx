import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../redux/authSelectors";
import { Navigate } from "react-router-dom";

const AuthMiddleware = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  if (!isLoggedIn) {
    return <Navigate to="/auth/login" />;
  }

  return children;
};

AuthMiddleware.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthMiddleware;
