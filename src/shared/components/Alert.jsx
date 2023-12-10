import PropTypes from "prop-types";
import {
  SuccessIcon,
  InfoIcon,
  WarningIcon,
  ErrorIcon,
  CloseIcon,
} from "../../assets/icons";

const Alert = ({ mode, message, onClose }) => {
  const alertModeClasses = {
    success: "bg-green-500",
    info: "bg-blue-500",
    warning: "bg-yellow-500",
    error: "bg-red-500",
  };

  const iconMap = {
    success: <SuccessIcon />,
    info: <InfoIcon />,
    warning: <WarningIcon />,
    error: <ErrorIcon />,
  };

  const modeClass = alertModeClasses[mode] || "";
  const icon = iconMap[mode] || null;

  return (
    <div className={`w-full text-white rounded-lg mt-4 ${modeClass}`}>
      <div className="container flex items-center justify-between px-6 py-4 mx-auto">
        <div className="flex">
          {icon}
          <p className="mx-3">{message}</p>
        </div>

        <button
          className="p-1 transition-colors duration-300 transform rounded-md hover:bg-opacity-25 hover:bg-gray-600 focus:outline-none"
          onClick={onClose}
        >
          <CloseIcon />
        </button>
      </div>
    </div>
  );
};

Alert.defaultProps = {
  mode: "success",
  message: "This is an alert",
};

Alert.propTypes = {
  mode: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func,
};

export default Alert;
