import React from "react";
import Back_Button from "../BackButton/Back_Button";

function Policies() {
  const policies = [
    {
      id: 1,
      title: "Workplace Conduct",
      description:
        "All employees are expected to maintain professionalism and respect in the workplace.",
    },
    {
      id: 2,
      title: "Leave Policy",
      description:
        "Employees must request leave in advance and adhere to the leave balance limits.",
    },
    {
      id: 3,
      title: "Security Policy",
      description:
        "Confidential information should not be shared outside the organization.",
    },
    {
      id: 4,
      title: "Health & Safety",
      description:
        "All employees must follow safety regulations and report hazards immediately.",
    },
  ];

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(0,150,255,0.5)_0%,_#202251_70%)] px-4 sm:px-6 md:px-10 py-10 pt-20">
      <Back_Button />

      <div className="max-w-3xl mx-auto text-center pt-10 sm:pt-12 md:pt-20 pb-6">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
          Company Policies
        </h1>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6">
          {policies.map((policy) => (
            <div
              key={policy.id}
              className="bg-white p-4 sm:p-5 md:p-6 rounded-lg shadow-md 
                            hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <h2 className="text-lg sm:text-xl font-bold text-[#202251]">
                {policy.title}
              </h2>

              <p className="text-xs sm:text-sm md:text-base text-gray-600 mt-2 leading-relaxed">
                {policy.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Policies;
