import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa"; // Importing the arrow icon

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/")} // Goes back one page in history
      className="flex items-center gap-3 px-3 py-1 bg-primary text-white font-semibold rounded-md shadow-lg transform transition-all duration-300 hover:bg-secondary hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
    >
      <FaArrowLeft className="text-xl" /> {/* Add the icon */}
      <span>Back</span>
    </button>
  );
};

export default BackButton;
