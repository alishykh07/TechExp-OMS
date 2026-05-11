import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

function Back_Button() {
  const navigate = useNavigate();

  return (
    <button
      className="fixed top-40 right-18 sm:top-45 sm:right-6 md:top-45 md:right-8 flex items-center gap-1 bg-gradient-to-r from-[#63c81c] to-[#73a420] text-[#202251] px-3 py-2 rounded-full shadow-lg hover:opacity-90 transition-all duration-300 z-10"
      onClick={() => navigate(-1)}
    >
      <ArrowBackIcon sx={{ fontSize: 20 }} />
      <span className="text-md font-semibold">Back</span>
    </button>
  );
}

export default Back_Button;
