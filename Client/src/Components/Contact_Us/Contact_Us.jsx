import React from "react";
import Back_Button from "../BackButton/Back_Button";
import Photo1 from "../../../../Storage/Pak.png";

function ContactUs() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(0,150,255,0.5)_0%,_#202251_70%)] px-4 pb-5 sm:px-6 md:px-10 pt-16 sm:pt-20">
      <Back_Button />

      <div className="max-w-3xl mx-auto text-center pt-10 sm:pt-16 pb-6">
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white drop-shadow-lg">
          Contact Us
        </h1>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
          <div className="mb-5">
            <h2 className="text-base sm:text-lg md:text-xl font-semibold text-[#202251] mb-1">
              Our Office Address
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              House No. 100, Pinjra Pol, Gulshah Bukhari, Hyderabad, Sindh,
              Pakistan
            </p>
          </div>

          <div className="mb-5">
            <h2 className="text-base sm:text-lg md:text-xl font-semibold text-[#202251] mb-1">
              Phone Number
            </h2>
            <p className="flex items-center gap-2 text-sm sm:text-base text-gray-600">
              <img src={Photo1} alt="Pak" className="w-6 h-4" />
              +92 337 831 9442
            </p>
          </div>

          <div className="mb-5">
            <h2 className="text-base sm:text-lg md:text-xl font-semibold text-[#202251] mb-1">
              Email Address
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              techexpagency@gmail.com
            </p>
          </div>

          <div className="mb-5">
            <h2 className="text-base sm:text-lg md:text-xl font-semibold text-[#202251] mb-1">
              Business Hours
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              Monday – Saturday: 12:00 PM – 10:00 PM
            </p>
          </div>

          <div className="mb-5">
            <h2 className="text-base sm:text-lg md:text-xl font-semibold text-[#202251] mb-1">
              Location
            </h2>
            <div className="bg-gray-300 rounded-lg overflow-hidden">
              <iframe
                width="100%"
                height="300"
                title="map"
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d185.37963801867522!2d68.37905194543609!3d25.393315319346215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2s!4v1776104726141!5m2!1sen!2s"
                className="border-0 w-full"
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </div>

          <div className="flex justify-center">
            <button className="w-full py-2 rounded-lg bg-[radial-gradient(circle_at_top,_rgba(0,150,255,0.5)_0%,_#202251_70%)] text-md font-bold text-white shadow-sm hover:bg-blue-500 transition-colors duration-300 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Get in Touch
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
