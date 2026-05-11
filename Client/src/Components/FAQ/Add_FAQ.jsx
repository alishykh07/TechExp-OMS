import React, { useState } from "react";
import { addFaq } from "../../Services/FaqService.js";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Back_Button from "../BackButton/Back_Button";

function Add_FAQ() {
  const [newFaq, setNewFaq] = useState({ question: "", answer: "" });
  const navigate = useNavigate();

  const handleAddFaq = async () => {
    try {
      await addFaq(newFaq);
      toast.success("FAQ added successfully!");
      navigate("/faq");
    } catch (e) {
      console.log(e);
      toast.error("Error adding FAQ");
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(0,150,255,0.5)_0%,_#202251_70%)] p-10 px-4 sm:px-6 md:px-10 pt-16 sm:pt-20">
      <Back_Button />

      <div className="max-w-3xl mx-auto text-center pt-10 sm:pt-16 pb-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white drop-shadow-lg animate-fade-in">
          Add FAQ
        </h1>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="bg-white  p-4 sm:p-6 md:p-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
          <h2 className="text-lg sm:text-xl font-bold text-[#202251] mb-4 sm:mb-6 text-center sm:text-left">
            Add a New FAQ
          </h2>
          <div className="space-y-4 sm:space-y-6">
            <div>
              <label
                htmlFor="question"
                className="block text-xs sm:text-sm font-medium text-[#202251]"
              >
                Question
              </label>
              <input
                type="text"
                id="question"
                placeholder="Enter question"
                value={newFaq.question}
                onChange={(e) =>
                  setNewFaq({ ...newFaq, question: e.target.value })
                }
                className="w-full mt-1 p-2 sm:p-3 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:[#202251]"
                required
              />
            </div>

            <div>
              <label
                htmlFor="answer"
                className="block text-xs sm:text-sm font-medium text-gray-700"
              >
                Answer
              </label>
              <textarea
                id="answer"
                placeholder="Enter answer"
                value={newFaq.answer}
                onChange={(e) =>
                  setNewFaq({ ...newFaq, answer: e.target.value })
                }
                className="w-full mt-1 p-2 sm:p-3 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:[#202251]"
                rows="4"
                required
              ></textarea>
            </div>

            <div className="flex justify-center">
              <button
                onClick={handleAddFaq}
                className="w-full py-2 rounded-lg bg-[radial-gradient(circle_at_top,_rgba(0,150,255,0.5)_0%,_#202251_70%)] text-sm sm:text-base font-bold text-white shadow-sm hover:bg-blue-500 transition-colors duration-300 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Add FAQ
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Add_FAQ;
