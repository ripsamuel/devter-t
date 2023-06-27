import PropTypes from "prop-types";
import "./index.css"
export default function Button({ children, disabled, onClick }) {
  return (
    <button
      className="flex bg-black rounded-full font-bold text-white px-5 mt-3 text-sm py-2 cursor-pointer hover:opacity-70"
      disabled={disabled}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired
};
