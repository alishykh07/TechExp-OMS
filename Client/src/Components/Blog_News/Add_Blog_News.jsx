import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addBlogNews } from "../../Services/BlogNewsService.js";
import toast from "react-hot-toast";
import Back_Button from "../BackButton/Back_Button.jsx";

function AddBlogNews() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.image && formData.image.size > 10 * 1024 * 1024) {
        toast.error(
          "File size is too large! Maximum 10MB limit for file size.",
        );
        return;
      }

      const form = new FormData();
      form.append("title", formData.title);
      form.append("description", formData.description);
      form.append("image", formData.image);
      await addBlogNews(form);
      toast.success("Blog/News successfully added!");
      navigate("/blognews");
    } catch (e) {
      console.log(e);
      toast.error("Failed to add blog & news");
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(0,150,255,0.5)_0%,_#202251_70%)] p-4 sm:p-6 md:p-10 pt-20">
      <Back_Button />

      <div className="max-w-3xl mx-auto text-center pt-10 sm:pt-14 md:pt-16 pb-6 sm:pb-8">
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white drop-shadow-lg">
          Add Blog & News
        </h1>
      </div>

      <div className="max-w-4xl mx-auto">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
        >
          <div className="mb-5 sm:mb-6">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-[#202251]"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full mt-1 p-2 sm:p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:[#202251]"
              placeholder="Enter the title"
              required
            />
          </div>

          <div className="mb-5 sm:mb-6">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-[#202251]"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full mt-1 p-2 sm:p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:[#202251]"
              placeholder="Enter the description"
              rows="4"
              required
            ></textarea>
          </div>

          <div className="mb-5 sm:mb-6">
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
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:[#202251]"
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full py-2 sm:py-3 rounded-lg bg-[radial-gradient(circle_at_top,_rgba(0,150,255,0.5)_0%,_#202251_70%)] text-md font-bold text-white shadow-sm hover:bg-blue-500 transition-colors duration-300 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Submit Blog/News
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddBlogNews;
