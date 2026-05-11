import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addFacilities } from "../../Services/FacilitiesService.js";
import toast from "react-hot-toast";
import Back_Button from "../BackButton/Back_Button";

function AddFacility() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const form = new FormData();
      form.append("title", title);
      form.append("description", description);
      form.append("image", image);

      await addFacilities(form);
      toast.success("Facility added successfully!");
      navigate("/facilities");
    } catch (e) {
      console.log(e);
      toast.error("Failed to add facility");
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(0,150,255,0.5)_0%,_#202251_70%)] p-10 px-4 sm:px-6 md:px-10 pt-16 sm:pt-20">
      <Back_Button />

      <div className="max-w-3xl mx-auto text-center pt-10 sm:pt-16 pb-6">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white drop-shadow-lg animate-fade-in">
          Add Facility
        </h1>
      </div>

      <div className="max-w-4xl mx-auto">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-4 sm:p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
        >
          {/* Title Field */}
          <div className="mb-5">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-[#202251]"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              placeholder="Enter facility title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full mt-1 p-2 border text-sm sm:text-base border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:[#202251]"
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-[#202251]"
            >
              Description
            </label>
            <textarea
              id="description"
              placeholder="Enter facility description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full mt-1 p-2 border text-sm sm:text-base border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:[#202251]"
              rows="4"
            ></textarea>
          </div>

          <div className="mb-5">
            <label
              htmlFor="image"
              className="block text-sm font-medium text-[#202251]"
            >
              Upload Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="w-full mt-1 p-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:[#202251]"
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full py-2 rounded-lg bg-[radial-gradient(circle_at_top,_rgba(0,150,255,0.5)_0%,_#202251_70%)] text-sm sm:text-base font-bold text-white shadow-sm hover:bg-blue-500 transition-colors duration-300 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add Facility
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddFacility;
