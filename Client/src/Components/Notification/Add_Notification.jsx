import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addNotification } from "../../Services/NotificationService.js";
import Back_Button from "../BackButton/Back_Button";
import toast from "react-hot-toast";

function AddNotification() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addNotification({ title, message });
      toast.success("Notification added successfully!");
      navigate("/notification");
    } catch (e) {
      console.log(e);
      toast.error("Failed to add Notification");
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(0,150,255,0.5)_0%,_#202251_70%)] p-4 sm:p-6 md:p-10 pt-16 sm:pt-20">
      <Back_Button />

      <div className="max-w-3xl mx-auto text-center pt-10 sm:pt-14 md:pt-20 pb-6 sm:pb-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl  font-bold text-white drop-shadow-lg animate-fade-in">
          Add Notification
        </h1>
      </div>

      <div className="max-w-2xl lg:max-w-3xl mx-auto">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
        >
          <div className="space-y-5 sm:space-y-6">
            <div>
              <label className="block text-sm sm:text-base font-medium text-[#202251]">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full mt-2 px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:[#202251]"
                placeholder="Enter title"
                required
              />
            </div>

            <div>
              <label className="block text-sm sm:text-base font-medium text-[#202251]">
                Message
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full mt-2 px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:[#202251]"
                placeholder="Enter message"
                rows="4"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 sm:py-3 rounded-lg bg-[radial-gradient(circle_at_top,_rgba(0,150,255,0.5)_0%,_#202251_70%)] text-sm sm:text-base font-bold text-white shadow-sm hover:bg-blue-500 transition-colors duration-300 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add Notification
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddNotification;
