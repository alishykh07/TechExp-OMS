import React from "react";
import Back_Button from "../BackButton/Back_Button";

function AboutUs() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(0,150,255,0.5)_0%,_#202251_70%)] p-4 sm:pt-25 md:p-10 pt-20 md:pt-35 ">
      <Back_Button />

      <div className="max-w-3xl mx-auto text-center mb-8 md:mb-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white drop-shadow-lg animate-fade-in">
          About Us
        </h1>
        <p className="text-base sm:text-lg text-gray-200 mt-3">
          Discover who we are and what drives us to empower your organization.
        </p>
      </div>

      <section className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl p-5 sm:p-6 md:p-8 transform transition-all duration-300 hover:shadow-xl">
        <div className="space-y-4 md:space-y-6 text-gray-500">
          <p className="text-base md:text-lg leading-relaxed">
            Welcome to{" "}
            <span className="font-semibold text-[#202251]">
              TechExp Agency Portal
            </span>
            , a centralized platform designed to streamline our office
            operations and improve team efficiency.
          </p>

          <p className="text-base md:text-lg leading-relaxed">
            This system helps manage employees, track attendance, handle tasks,
            and monitor daily workflows in a structured and organized way.
          </p>

          <p className="text-base md:text-lg leading-relaxed">
            At EechExp, we focus on delivering high-quality solutions with
            efficiency, transparency, and collaboration at the core. This portal
            ensures smooth communication between team members and better control
            over internal processes.
          </p>

          <p className="text-base md:text-lg leading-relaxed">
            Our goal is to make work simpler, faster, and more productive by
            using modern technology and smart management tools.
          </p>
        </div>
      </section>
    </div>
  );
}

export default AboutUs;
