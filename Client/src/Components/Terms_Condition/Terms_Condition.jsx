import React from "react";
import Back_Button from "../BackButton/Back_Button";

function TermsConditions() {
  const terms = [
    {
      id: 1,
      title: "Acceptance of Terms",
      description:
        "By using our services, you agree to abide by our terms and conditions.",
    },
    {
      id: 2,
      title: "User Responsibilities",
      description:
        "Users must provide accurate information and comply with our policies.",
    },
    {
      id: 3,
      title: "Intellectual Property",
      description:
        "All content and materials are owned by the company and cannot be copied without permission.",
    },
    {
      id: 4,
      title: "Limitation of Liability",
      description:
        "We are not responsible for any losses or damages incurred while using our services.",
    },
  ];

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(0,150,255,0.5)_0%,_#202251_70%)] px-4 sm:px-6 lg:px-10 pt-20 pb-10">
      <Back_Button />

      <div className="max-w-3xl mx-auto text-center pt-12 sm:pt-16 pb-6 sm:pb-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white drop-shadow-lg animate-fade-in">
          Terms & Conditions
        </h1>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {terms.map((term) => (
            <div
              key={term.id}
              className="bg-white p-4 sm:p-5 md:p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            >
              <h2 className="text-lg sm:text-xl font-bold text-[#202251]">
                {term.title}
              </h2>
              <p className="text-xs sm:text-sm md:text-base text-gray-600 mt-2">
                {term.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TermsConditions;
