import { useEffect, useState } from "react";
import { loggedUser } from "../../Services/AuthService.js";
import toast from "react-hot-toast";
import {
  checkIn,
  checkOut,
  getAttendanceData,
} from "../../Services/AttendanceService.js";
import Back_Button from "../BackButton/Back_Button.jsx";

const Attendance = () => {
  const [status, setStatus] = useState("Not Marked");
  const [loggedIn, setLoggedIn] = useState({});
  const [attendanceData, setAttendanceData] = useState(null);

  useEffect(() => {
    const fetchLoggedInUser = async () => {
      try {
        const user = await loggedUser();
        setLoggedIn(user);
      } catch (e) {
        console.log(e.message);
        toast.error("Failed to load user profile.");
      }
    };

    fetchLoggedInUser();
  }, []);

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        const response = await getAttendanceData({
          username: loggedIn.username,
        });
        if (response) {
          setAttendanceData(response);

          if (response.check_in && !response.check_out) {
            setStatus("Checked In");
          } else if (response.check_in && response.check_out) {
            setStatus("Checked Out");
          } else {
            setStatus("Not Marked");
          }
        }
      } catch (e) {
        console.log(e.message);
      }
    };
    fetchAttendanceData();
  }, [loggedIn]);

  const handleCheckIn = async () => {
    try {
      const now = new Date();

      const response = await checkIn({ username: loggedIn.username });
      toast.success(response.message);
      setStatus("Checked In");
      setAttendanceData((prev) => ({ ...prev, check_in: new Date() }));
    } catch (e) {
      console.error("Check-in Error:", e.message);
      toast.error(e.message);
      return;
    }
  };

  const handleCheckOut = async () => {
    try {
      const now = new Date();

      const response = await checkOut({ username: loggedIn.username });
      toast.success(response.message);
      setStatus("Checked Out");
      setAttendanceData((prev) => ({ ...prev, check_out: new Date() }));
    } catch (e) {
      console.error("Check-out Error:", e.message);
      toast.error(e.message);
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(0,150,255,0.5)_0%,_#202251_70%)] flex items-center justify-center p-6 pt-35">
      <div className="bg-gradient-to-tr from-gray-200 via-gray-200 to-gray-500 rounded-xl shadow-xl p-4 sm:p-6 lg:p-8 w-full max-w-full sm:max-w-md lg:max-w-lg">
        <Back_Button />

        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#202251] mb-6 sm:mb-8 text-center">
          Attendance
        </h2>

        {loggedIn && (
          <div className="mb-6 sm:mb-8 ">
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 mb-3 sm:mb-4">
              <span className="text-gray-600 font-medium text-base sm:text-lg">
                Full Name:
              </span>
              <span className="text-gray-800 text-base sm:text-lg">
                {loggedIn.fullName}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 mb-3 sm:mb-4">
              <span className="text-gray-600 font-medium text-base sm:text-lg">
                Email:
              </span>
              <span className="text-gray-800 text-base sm:text-lg">
                {loggedIn.email}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
              <span className="text-gray-600 font-medium text-base sm:text-lg">
                Date:
              </span>
              <span className="text-gray-800 text-base sm:text-lg">
                {new Date().toLocaleDateString()}
              </span>
            </div>
          </div>
        )}

        <div className="mb-6 sm:mb-8">
          <p className="text-center text-gray-700 text-lg sm:text-xl">
            Status:
            <span
              className={`ml-2 sm:ml-3 font-semibold text-lg sm:text-xl ${
                status === "Checked In"
                  ? "text-green-600"
                  : status === "Checked Out"
                    ? "text-red-600"
                    : "text-gray-500"
              }`}
            >
              {status}
            </span>
          </p>

          {attendanceData && (
            <div className="mt-3 sm:mt-4 text-center text-base sm:text-lg">
              {attendanceData.check_in && (
                <p className="text-green-600">
                  Check-in: {new Date(attendanceData.check_in).toLocaleString()}
                </p>
              )}
              {attendanceData.check_out && (
                <p className="text-red-600">
                  Check-out:{" "}
                  {new Date(attendanceData.check_out).toLocaleString()}
                </p>
              )}
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 lg:space-x-6">
          <button
            onClick={handleCheckIn}
            disabled={status === "Checked In"}
            className={`w-full sm:w-auto px-6 sm:px-8 py-2 sm:py-3 rounded-xl text-base sm:text-lg transition duration-300 ease-in-out transform hover:-translate-y-1 ${
              status === "Checked In"
                ? "bg-gray-400 cursor-not-allowed"
                : "rounded-lg bg-[radial-gradient(circle_at_top,_rgba(0,150,255,0.5)_0%,_#202251_70%)] text-md font-bold text-white shadow-sm hover:bg-blue-500 transition-colors duration-300 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            }`}
          >
            Check In
          </button>
          <button
            onClick={handleCheckOut}
            disabled={status === "Checked Out" || status === "Not Marked"}
            className={`w-full sm:w-auto px-6 sm:px-8 py-2 sm:py-3 rounded-xl text-base sm:text-lg transition duration-300 ease-in-out transform hover:-translate-y-1 ${
              status === "Checked Out" || status === "Not Marked"
                ? "bg-gray-400 cursor-not-allowed"
                : "rounded-lg bg-[radial-gradient(circle_at_top,_rgba(139,191,77,0.5)_0%,_#4f7a2d_70%)] text-md font-bold text-white shadow-sm hover:bg-[#73a240] transition-colors duration-300 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#73a240]"
            }`}
          >
            Check Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
