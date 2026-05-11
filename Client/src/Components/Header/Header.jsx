import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LOGO from "../../../../Storage/LOGO1.svg";
import { loggedUser } from "../../Services/AuthService.js";
import Attendance from "../Attendance/Attendance.jsx";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function Header() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(null);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleLogin = () => {
    navigate("/login");
    setMenuOpen(false);
  };

  const handleProfile = () => {
    if (loggedIn) {
      navigate("/profile");
      setMenuOpen(false);
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
      } catch (e) {
        console.log(e.message);
        setLoggedIn(null);
      }
    };
    fetchLoggedUser();
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white shadow-md">
      <nav
        className="flex items-center justify-between p-4 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img
              className="w-[50%] rounded-full transition-transform hover:scale-105"
              src={LOGO}
              alt="Logo"
            />
          </a>
        </div>

        <div className="flex lg:hidden">
          <div
            className={`fixed top-8 z-50 transition-all duration-300 ease-in-out
  ${menuOpen ? "right-[16.2rem]" : "right-2"}
`}
          >
            <button
              type="button"
              onClick={toggleMenu}
              className="py-2 px-2.5 rounded-full text-gray-300 shadow-lg bg-[radial-gradient(circle_at_top,_rgba(0,150,255,0.5)_0%,_#202251_70%)] transition-transform duration-300"
            >
              {menuOpen ? (
                <ArrowBackIcon sx={{ fontSize: { xs: 16, sm: 22 } }} />
              ) : (
                <ArrowForwardIcon sx={{ fontSize: { xs: 16, sm: 22 } }} />
              )}
            </button>
          </div>
        </div>

        <div className="hidden lg:flex lg:gap-x-7">
          <a
            href="/"
            className="text-md font-semibold text-gray-900 hover:text-[#73a420] transition-colors"
          >
            Home
          </a>
          <a
            href="/show-group"
            className="text-md font-semibold text-gray-900 hover:text-[#73a420] transition-colors"
          >
            Group
          </a>
          {loggedIn && (
            <>
              <a
                href="/show-all-tasks"
                className="text-md font-semibold text-gray-900 hover:text-[#73a420] transition-colors"
              >
                Tasks
              </a>
              <a
                href="/all-reports"
                className="text-md font-semibold text-gray-900 hover:text-[#73a420] transition-colors"
              >
                Reports
              </a>
              <a
                href="/Show-all-project"
                className="text-md font-semibold text-gray-900 hover:text-[#73a420] transition-colors"
              >
                Projects
              </a>
              <a
                href="/attendance"
                className="text-md font-semibold text-gray-900 hover:text-[#73a420] transition-colors"
              >
                Attendance
              </a>
            </>
          )}
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center gap-4">
          {!loggedIn ? (
            <div className="relative p-[3px] rounded-xl group w-60 h-16">
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#696dce] to-[#73a420] blur-0 group-hover:blur-md group-active:blur-sm transition-all duration-500"></div>

              <button
                onClick={handleLogin}
                className="relative z-10 w-full h-full text-base font-bold rounded-lg bg-gray-950 text-white shadow-[2px_2px_3px_#000000b4] transition-all duration-300 active:scale-95"
              >
                Login
              </button>
            </div>
          ) : (
            <>
              <button onClick={handleProfile} className="relative h-15 w-15">
                <img
                  className="h-full w-full rounded-full object-cover border-2 border-[#73e42080] hover:border-[#a1e033] transition-all"
                  src={
                    loggedIn?.profilePhoto
                      ? `${loggedIn.profilePhoto}`
                      : "https://www.pngmart.com/files/23/Profile-PNG-Photo.png"
                  }
                  alt="Profile"
                />
              </button>

              <div className="relative p-[3px] rounded-xl group w-60 h-16">
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#696dce] to-[#73a420] blur-0 group-hover:blur-md group-active:blur-sm transition-all duration-500"></div>

                <button
                  onClick={handleLogout}
                  className="relative z-10 w-full h-full text-base font-bold rounded-lg bg-gray-950 text-white shadow-[2px_2px_3px_#000000b4] transition-all duration-300 active:scale-95"
                >
                  Logout
                </button>
              </div>
            </>
          )}
        </div>
      </nav>

      <div
        className={`fixed top-0 right-0 z-50 h-screen
  w-full sm:w-64 md:w-64
  bg-[radial-gradient(circle_at_top,_rgba(0,150,255,0.5)_0%,_#202251_40%)]
  bg-black/20 backdrop-blur-lg text-white shadow-lg
  transform transition-transform duration-300
  ${menuOpen ? "translate-x-0" : "translate-x-full"}
`}
      >
        <div className="flex items-center justify-between sm:justify-center p-4 border-b border-white/20">
          <a href="/">
            <img className="w-30 sm:w-30 rounded-full" src={LOGO} alt="logo" />
          </a>
          <button onClick={toggleMenu} className="block sm:hidden">
            ✕
          </button>
        </div>

        <div className="p-4 sm:p-5 md:p-6 space-y-2 sm:space-y-3 text-center sm:text-left">
          <a
            href="/"
            className="block p-2 sm:p-1 rounded-md hover:bg-gradient-to-r from-[#8cc63f] to-[#5f8f1a] hover:text-[#202251] transition-all duration-200 text-ellipsis overflow-hidden whitespace-nowrap"
          >
            Home
          </a>
          <a
            href="/show-group"
            className="block p-2 sm:p-1 rounded-md hover:bg-gradient-to-r from-[#8cc63f] to-[#5f8f1a] hover:text-[#202251] transition-all duration-200 text-ellipsis overflow-hidden whitespace-nowrap"
          >
            Group
          </a>

          {loggedIn && (
            <>
              <a
                href="/show-all-tasks"
                className="block p-2 sm:p-1 rounded-md hover:bg-gradient-to-r from-[#8cc63f] to-[#5f8f1a] hover:text-[#202251] transition-all duration-200 text-ellipsis overflow-hidden whitespace-nowrap"
              >
                Tasks
              </a>
              <a
                href="/all-reports"
                className="block p-2 sm:p-1 rounded-md hover:bg-gradient-to-r from-[#8cc63f] to-[#5f8f1a] hover:text-[#202251] transition-all duration-200 text-ellipsis overflow-hidden whitespace-nowrap"
              >
                Reports
              </a>
              <a
                href="/Show-all-project"
                className="block p-2 sm:p-1 rounded-md hover:bg-gradient-to-r from-[#8cc63f] to-[#5f8f1a] hover:text-[#202251] transition-all duration-200 text-ellipsis overflow-hidden whitespace-nowrap"
              >
                Projects
              </a>
              <a
                href="/attendance"
                className="block p-2 sm:p-1 rounded-md hover:bg-gradient-to-r from-[#8cc63f] to-[#5f8f1a] hover:text-[#202251] transition-all duration-200 text-ellipsis overflow-hidden whitespace-nowrap"
              >
                Attendance
              </a>
            </>
          )}
        </div>

        {loggedIn && (
          <div className="flex items-center gap-3 border-t border-white/20 p-2 sm:p-3 md:p-4 justify-center sm:justify-start">
            <img
              onClick={handleProfile}
              className="h-9 w-9 sm:h-10 sm:w-10 md:h-12 md:w-12 object-cover rounded-full cursor-pointer border-2 border-[#73e42080] hover:border-[#a1e033]"
              src={
                loggedIn?.profilePhoto
                  ? `${loggedIn.profilePhoto}`
                  : "https://www.pngmart.com/files/23/Profile-PNG-Photo.png"
              }
              alt="profile"
            />
            <div className="leading-tight">
              <p className="text-xs sm:text-sm md:text-base font-semibold">
                {loggedIn.fullName}
              </p>
              <p className="text-[10px] sm:text-xs md:text-sm break-all text-gray-300">
                {loggedIn.email}
              </p>
            </div>
          </div>
        )}

        <div className="relative p-[3px] rounded-xl group w-40 h-12 sm:w-44 sm:h-14 md:w-52 md:h-14 mx-auto sm:mx-0 sm:ml-4 md:ml-6">
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#696dce] to-[#73a420] blur-0 group-hover:blur-xs group-active:blur-sm transition-all duration-500"></div>

          <button
            onClick={loggedIn ? handleLogout : handleLogin}
            className="relative z-10 w-full h-full text-sm sm:text-base font-bold rounded-lg bg-gray-950 text-white shadow-[2px_2px_3px_#000000b4] transition-all duration-300 active:scale-95"
          >
            {loggedIn ? "Logout" : "Login"}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
