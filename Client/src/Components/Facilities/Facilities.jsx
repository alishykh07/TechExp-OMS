import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { fetchFacilities } from "../../Services/FacilitiesService.js";
import { loggedUser } from "../../Services/AuthService.js";
import Back_Button from "../BackButton/Back_Button";
import toast from "react-hot-toast";
import Loader from "../Loader/Loader.jsx";

function Facilities() {
  const navigate = useNavigate();
  const [facilities, setFacilities] = useState([]);
  const [loggedin, setLoggedin] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const logged = async () => {
      try {
        setLoggedin(await loggedUser());
      } catch (e) {
        console.log(e.message);
        toast.error(e.message);
        setLoggedin(null);
      } finally {
        setIsLoading(false);
      }
    };
    logged();
  }, []);

  useEffect(() => {
    const fetchFacilitiesData = async () => {
      try {
        const response = await fetchFacilities();
        setFacilities(response);
      } catch (e) {
        console.log(e);
        toast.error("Failed to load facilities");
      }
    };
    fetchFacilitiesData();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(0,150,255,0.5)_0%,_#202251_70%)] p-10 px-3 sm:px-5 md:px-8 lg:px-10 pt-16 sm:pt-20">
      <Back_Button />

      <div className="max-w-3xl mx-auto text-center pt-10 sm:pt-14 pb-6">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white drop-shadow-lg animate-fade-in">
          Facilities
        </h1>
      </div>

      <div className="max-w-4xl mx-auto">
        {facilities.length === 0 ? (
          <p className="text-center text-sm sm:text-base text-gray-200 font-semibold py-4 bg-white rounded-lg shadow-md">
            No facilities found.
          </p>
        ) : (
          <div className="space-y-4 sm:space-y-6">
            {facilities.map((facility, idx) => (
              <div
                key={idx}
                className="bg-white p-4 sm:p-5 md:p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex flex-col sm:flex-row items-center text-center sm:text-left sm:items-center gap-4 sm:gap-6"
              >
                <img
                  src={
                    facility.image
                      ? `${facility.image}`
                      : "https://dummyimage.com/150x150/cccccc/ffffff&text=No+Image"
                  }
                  alt={facility.title || "Facility Image"}
                  className="sm:w-24 h-60 sm:h-24 rounded-lg object-cover"
                />

                <div className="flex-grow w-full">
                  <h2 className="text-lg sm:text-xl font-bold text-[#202251]">
                    {facility.title}
                  </h2>
                  <p className="text-gray-600 mt-1 text-sm sm:text-base break-words">
                    {facility.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {loggedin?.role === "Manager" && (
        <div className="flex justify-center mt-10">
          <button
            onClick={() => navigate("/add-facility")}
            className="sm:w-auto px-4 sm:px-6 py-2 rounded-lg bg-[radial-gradient(circle_at_top,_rgba(0,150,255,0.5)_0%,_#202251_70%)] text-sm sm:text-md font-bold text-white shadow-sm hover:bg-blue-500 transition-colors duration-300 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add New Facility
          </button>
        </div>
      )}
    </div>
  );
}

export default Facilities;
