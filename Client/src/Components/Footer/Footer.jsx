import LOGO from "../../../../Storage/LOGO1.svg";
import { useEffect, useState } from "react";
import { loggedUser } from "../../Services/AuthService.js";

function Footer() {
  const [loggedIn, setLoggedIn] = useState(null);

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
    <footer className="bg-gray-50 text-gray-600 py-8 shadow-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <a href="/" className="flex justify-center items-center">
            <img
              className="w-32 sm:w-40 rounded-full transition-transform hover:scale-105"
              src={LOGO}
              alt="TechExp Logo"
            />
          </a>
          <p className=" text-sm sm:text-base mt-1 text-gray-600 ">
            Discover how we&#39;re transforming workplaces globally.
          </p>
        </div>

        <div
          className="grid 
      grid-cols-2 
      sm:grid-cols-2 
      md:grid-cols-3 
      lg:grid-cols-4 
      gap-8
      text-center sm:text-left flex justify-between"
        >
          <div>
            <h2 className="text-sm font-bold text-[#202251] uppercase mb-3">
              Authentication
            </h2>
            <ul className="space-y-2 text-sm">
              {loggedIn?.role === "Manager" ? (
                <li>
                  <a
                    href="/dashboard"
                    className="text-gray-600 hover:text-[#73a420] transition-colors"
                  >
                    Dashboard
                  </a>
                </li>
              ) : (
                <li>
                  <a
                    href="/"
                    className="text-gray-600 hover:text-[#73a420] transition-colors"
                  >
                    Home
                  </a>
                </li>
              )}
              {!loggedIn ? (
                <li>
                  <a
                    href="/login"
                    className="text-gray-600 hover:text-[#73a420] transition-colors"
                  >
                    Login
                  </a>
                </li>
              ) : (
                <>
                  <li>
                    <a
                      href="/profile"
                      className="text-gray-600 hover:text-[#73a420] transition-colors"
                    >
                      Profile
                    </a>
                  </li>
                  <li>
                    <a
                      href="/show-requirement"
                      className="text-gray-600 hover:text-[#73a420] transition-colors"
                    >
                      Requirements
                    </a>
                  </li>
                  {loggedIn && (
                    <li>
                      <a
                        href="/notification"
                        className="text-gray-600 hover:text-[#73a420] transition-colors"
                      >
                        Notification
                      </a>
                    </li>
                  )}
                </>
              )}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-bold text-[#202251] uppercase mb-3">
              Office
            </h2>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="/show-group"
                  className="text-gray-600 hover:text-[#73a420] transition-colors"
                >
                  Group
                </a>
              </li>
              {loggedIn && (
                <>
                  <li>
                    <a
                      href="/show-all-tasks"
                      className="text-gray-600 hover:text-[#73a420] transition-colors"
                    >
                      Task
                    </a>
                  </li>
                  <li>
                    <a
                      href="/Show-all-project"
                      className="text-gray-600 hover:text-[#73a420] transition-colors"
                    >
                      Projects
                    </a>
                  </li>
                  <li>
                    <a
                      href="/all-reports"
                      className="text-gray-600 hover:text-[#73a420] transition-colors"
                    >
                      Report
                    </a>
                  </li>
                </>
              )}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-bold text-[#202251] uppercase mb-3">
              Your Satisfaction
            </h2>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="/facilities"
                  className="text-gray-600 hover:text-[#73a420] transition-colors"
                >
                  Facilities
                </a>
              </li>
              <li>
                <a
                  href="/blognews"
                  className="text-gray-600 hover:text-[#73a420] transition-colors"
                >
                  Blog / News
                </a>
              </li>
              <li>
                <a
                  href="/contactus"
                  className="text-gray-600 hover:text-[#73a420] transition-colors"
                >
                  Contact Us
                </a>
              </li>
              {loggedIn && (
                <>
                  <li>
                    <a
                      href="/aboutus"
                      className="text-gray-600 hover:text-[#73a420] transition-colors"
                    >
                      About Us
                    </a>
                  </li>
                  <li>
                    <a
                      href="/faq"
                      className="text-gray-600 hover:text-[#73a420] transition-colors"
                    >
                      FAQs
                    </a>
                  </li>
                </>
              )}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-bold text-[#202251] uppercase mb-3">
              Beauty
            </h2>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="/photos"
                  className="text-gray-600 hover:text-[#73a420] transition-colors"
                >
                  Photos
                </a>
              </li>
              {loggedIn && (
                <>
                  <li>
                    <a
                      href="/polices"
                      className="text-gray-600 hover:text-[#73a420] transition-colors"
                    >
                      Policies
                    </a>
                  </li>
                  <li>
                    <a
                      href="/privacy-polices"
                      className="text-gray-600 hover:text-[#73a420] transition-colors"
                    >
                      Privacy Policies
                    </a>
                  </li>
                </>
              )}
              <li>
                <a
                  href="/terms-condition"
                  className="text-gray-600 hover:text-[#73a420] transition-colors"
                >
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-10 pt-6 border-t border-gray-200 flex flex-col sm:flex-row justify-between px-2 items-center gap-4">
        <p className="text-sm text-gray-500 text-center sm:text-left">
          © 2026 By —
          <a
            href="https://www.linkedin.com/in/ali-shykh-589802340/"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-[#73a420] ml-1"
            target="_blank"
          >
            @AliShykh
          </a>
        </p>
        <div className="flex space-x-4">
          <a
            href="https://www.facebook.com/profile.php?id=61585328537536"
            target="_blank"
            className="text-gray-500 hover:text-[#73a420] transition-all duration-300"
          >
            <i className="fa-brands fa-facebook-f text-xl"></i>
          </a>

          <a
            href="https://www.behance.net/gallery/243340977/TechExp-portfolio"
            target="_blank"
            className="text-gray-500 hover:text-[#73a420] transition-all duration-300"
          >
            <i className="fa-brands fa-behance text-xl"></i>
          </a>

          <a
            href="https://www.instagram.com/techexp_agency/"
            target="_blank"
            className="text-gray-500 hover:text-[#73a420] transition-all duration-300"
          >
            <i className="fa-brands fa-instagram text-xl"></i>
          </a>

          <a
            href="https://www.linkedin.com/in/techexpagency/"
            target="_blank"
            className="text-gray-500 hover:text-[#73a420] transition-all duration-300"
          >
            <i className="fa-brands fa-linkedin-in text-xl"></i>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
