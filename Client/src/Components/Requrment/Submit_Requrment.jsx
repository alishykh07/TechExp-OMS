import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addRequrment } from "../../Services/RequrmentService.js";
import Back_Button from "../BackButton/Back_Button";
import toast from "react-hot-toast";

function AddRequirement() {
  const uname = localStorage.getItem("username");

  const [requirement, setRequirement] = useState({
    name: "",
    reason: "",
    username: uname,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRequirement((prevRequirement) => ({
      ...prevRequirement,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      await addRequrment(requirement);
      toast.success("Requirement added successfully");
      navigate("/show-requirement");
    } catch (e) {
      console.log(e);
      toast.error("Failed to add requirement");
    }
  };

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(0,150,255,0.5)_0%,_#202251_70%)] px-4 sm:px-6 lg:px-10 pt-20 pb-10">
      <Back_Button />

      <div className="max-w-3xl mx-auto text-center pt-10 sm:pt-16 pb-6">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white drop-shadow-lg animate-fade-in">
          Add Requirement
        </h1>
      </div>

      <div className="max-w-4xl mx-auto">
        <form className="bg-white p-4 sm:p-6 lg:p-8  rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
          <div className="space-y-5 sm:space-y-6">
            <div>
              <label className="block text-sm sm:text-base font-medium text-[#202251]">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={requirement.name}
                onChange={handleInputChange}
                className="w-full mt-2 px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:[#202251]"
                placeholder="Enter requirement name"
              />
            </div>

            <div>
              <label className="block text-sm sm:text-base font-medium text-[#202251]">
                Reason
              </label>
              <textarea
                name="reason"
                value={requirement.reason}
                onChange={handleInputChange}
                className="w-full mt-2 px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:[#202251]"
                placeholder="Enter reason"
                rows="4"
              />
            </div>

            <div>
              <label className="block text-sm sm:text-base font-medium text-[#202251]">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={requirement.username}
                onChange={handleInputChange}
                className="w-full mt-2 px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:[#202251] bg-gray-100"
                placeholder="Enter username"
                disabled
              />
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              className="w-full py-2.5 sm:py-3 rounded-lg bg-[radial-gradient(circle_at_top,_rgba(0,150,255,0.5)_0%,_#202251_70%)] text-sm sm:text-base font-bold text-white shadow-sm hover:bg-blue-500 transition-colors duration-300 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Submit Requirement
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddRequirement;
