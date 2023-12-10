import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../redux/authSelectors";
import { Navigate } from "react-router-dom";

const GuestMiddleware = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  if (isLoggedIn) {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

GuestMiddleware.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GuestMiddleware;
