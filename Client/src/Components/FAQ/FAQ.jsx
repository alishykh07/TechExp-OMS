import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchFaq } from "../../Services/FaqService.js";
import { loggedUser } from "../../Services/AuthService.js";
import Back_Button from "../BackButton/Back_Button";
import toast from "react-hot-toast";
import Loader from "../Loader/Loader.jsx";

function FAQ() {
  const navigate = useNavigate();
  const [faqs, setFaqs] = useState([]);
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
    const fetchFaqData = async () => {
      try {
        const response = await fetchFaq();
        setFaqs(response);
      } catch (e) {
        console.log(e);
        toast.error("Failed to load FAQs");
      }
    };
    fetchFaqData();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(0,150,255,0.5)_0%,_#202251_70%)] px-3 sm:px-5 md:px-8 lg:px-10 pt-16 sm:pt-20">
      <Back_Button />

      <div className="max-w-3xl mx-auto text-center pt-10 sm:pt-14 pb-6">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white drop-shadow-lg animate-fade-in">
          Frequently Asked Questions
        </h1>
      </div>

      <div className="max-w-6xl mx-auto">
        {faqs.length === 0 ? (
          <p className="text-center text-sm sm:text-base text-gray-200 font-semibold py-4 bg-white rounded-lg shadow-md">
            No FAQs found.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white p-4 sm:p-5 md:p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex flex-col"
              >
                <h2 className="text-base sm:text-lg md:text-xl font-bold text-[#202251]">
                  {faq.question}
                </h2>
                <p className="text-xs sm:text-sm  text-gray-600 mt-2 break-words line-clamp-4">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {loggedin?.role === "Manager" && (
        <div className="flex justify-center mt-10">
          <button
            onClick={() => navigate("/add-faq")}
            className="px-6 py-2 rounded-lg bg-[radial-gradient(circle_at_top,_rgba(0,150,255,0.5)_0%,_#202251_70%)] text-sm sm:text-base font-bold text-white shadow-sm hover:bg-blue-500 transition-colors duration-300 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add New FAQ
          </button>
        </div>
      )}
    </div>
  );
}

export default FAQ;
