import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { loggedUser } from "../../Services/AuthService.js";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function Sidebar() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const handleProfile = () => {
    if (loggedIn) {
      navigate("/profile");
      setIsSidebarOpen(false);
    } else {
      alert("Your session has expired. Please log in first.");
      navigate("/login");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
    window.location.reload();
  };

  useEffect(() => {
    const fetchLoggedUser = async () => {
      try {
        const user = await loggedUser();
        setLoggedIn(user);
        if (!user || !localStorage.getItem("token")) {
          navigate("/login");
        }
      } catch (e) {
        console.log(e.message);
        navigate("/login");
      }
    };
    fetchLoggedUser();
  }, [navigate]);

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        className={`fixed top-8 z-50 py-2 px-2.5 rounded-full text-gray-300 shadow-lg transition-all duration-300 ease-in-out bg-[radial-gradient(circle_at_top,_rgba(0,150,255,0.5)_0%,_#202251_70%)] ${
          isSidebarOpen
            ? "left-[calc(100vw-4rem)] sm:left-57 md:left-65"
            : "left-2"
        }`}
      >
        {isSidebarOpen ? (
          <ArrowBackIcon sx={{ fontSize: { xs: 16, sm: 22 } }} />
        ) : (
          <ArrowForwardIcon sx={{ fontSize: { xs: 16, sm: 22 } }} />
        )}
      </button>

      <div
        className={`fixed top-0 left-0 h-screen w-full sm:w-56 md:w-64 bg-[radial-gradient(circle_at_top,_rgba(0,150,255,0.5)_0%,_#202251_40%)] bg-black/20 backdrop-blur-lg text-white p-4 sm:p-3  z-40 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0 " : "-translate-x-full"
        }`}
      >
        <div className="h-full flex flex-col overflow-y-auto scrollbar-thin scrollbar-thumb-blue-700 scrollbar-track-blue-300">
          <div className="flex flex-col text-center items-center gap-2 sm:gap-3 mb-6 sm:mb-8 flex-shrink-0">
            <div className="w-full">
              <button
                onClick={handleProfile}
                className="relative h-12 w-12 sm:h-15 sm:w-15"
              >
                <img
                  className="h-full w-full rounded-full object-cover border-2 border-[#73e42080] shadow-sm hover:border-[#a1e033] transition-all"
                  src={
                    loggedIn?.profilePhoto
                      ? `${loggedIn.profilePhoto}`
                      : "https://www.pngmart.com/files/23/Profile-PNG-Photo.png"
                  }
                  alt="Profile"
                />
              </button>
            </div>
            <div className="w-full">
              <h2 className="text-base sm:text-lg md:text-xl text-gray-200 font-bold">
                Manager Dashboard
              </h2>
              <p className="text-[12px] md:text-sm m-auto text-gray-200 truncate max-w-[150px] sm:max-w-[180px]">
                {loggedIn?.fullName || "Guest"}
              </p>
            </div>
          </div>

          <ul className="space-y-1 sm:space-y-2 md:space-y-3 text-xs sm:text-sm md:text-base flex-grow">
            {[
              { path: "/dashboard", label: "Dashboard" },
              { path: "/attendance", label: "Attendance" },
              { path: "/all-staff", label: "My Staff" },
              { path: "/add-work", label: "Add Work" },
              { path: "/all-reports", label: "Reports" },
              { path: "/show-all-tasks", label: "Task" },
              { path: "/show-all-project", label: "Project" },
              { path: "/show-group", label: "Group" },
              { path: "/show-requirement", label: "Requirement" },
              { path: "/daily-attendance", label: "Daily Attendance" },
            ].map(({ path, label }) => (
              <li key={path}>
                <Link
                  to={path}
                  className="flex items-center gap-2 justify-center sm:justify-start text-center sm:text-left truncate max-w-full p-2 rounded-md hover:bg-gradient-to-r from-[#8cc63f] to-[#5f8f1a] hover:text-[#202251] transition-all duration-200 text-ellipsis overflow-hidden whitespace-nowrap"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <span className="truncate w-full">{label}</span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex-grow" />

          <div className="mt-4 sm:mt-6 px-2 flex-shrink-0 pb-4">
            

            <div className="relative p-[3px] rounded-xl group w-40 h-12 sm:w-44 sm:h-14 md:w-52 md:h-14 mx-auto">
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#696dce] to-[#73a420] blur-0 group-hover:blur-xs group-active:blur-sm transition-all duration-500"></div>

              <button
                onClick={handleLogout}
                className="relative z-10 w-full h-full text-sm sm:text-base font-bold rounded-lg bg-gray-950 text-white shadow-[2px_2px_3px_#000000b4] transition-all duration-300 active:scale-95"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
