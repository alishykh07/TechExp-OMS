import React from "react";
import Back_Button from "../BackButton/Back_Button";

function HowItWorks() {
  return (
    <div
      className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(0,150,255,0.5)_0%,_#202251_70%)]
        p-10 px-4 sm:px-6 md:px-10 pt-16 sm:pt-20"
    >
      <Back_Button />

      <div className="max-w-3xl mx-auto text-center pt-10 sm:pt-16 pb-6">
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white drop-shadow-lg">
          How This Website Works
        </h1>
      </div>

      <div className="max-w-4xl mx-auto bg-white p-4 sm:p-6 rounded-lg shadow-md">
        <section className="mb-6">
          <h2 className="text-base sm:text-lg md:text-2xl font-semibold text-[#202251] mb-1">
            1. User Registration By Manager & Login
          </h2>
          <p className="text-sm sm:text-base text-gray-500 leading-relaxed">
            New users can sign up with their details through the Manager. Once
            registered, their login credentials are automatically sent to their
            email. After that, they can log in securely to access personalized
            features.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-base sm:text-lg md:text-2xl font-semibold text-[#202251] mb-1">
            2. Dashboard Overview
          </h2>
          <p className="text-sm sm:text-base text-gray-500 leading-relaxed">
            After logging in, users land on their dashboard, where they can
            manage tasks, view statistics, and interact with different modules.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-base sm:text-lg md:text-2xl font-semibold text-[#202251] mb-1">
            3. Features & Functionalities
          </h2>
          <ul className="list-disc pl-5 text-sm sm:text-base text-gray-500 space-y-1">
            <li>Manage bookings, staff, and reports easily.</li>
            <li>Upload and manage project details.</li>
            <li>Interactive dashboard for real-time updates.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-base sm:text-lg md:text-2xl font-semibold text-[#202251] mb-1">
            4. Secure Transactions
          </h2>
          <p className="text-sm sm:text-base text-gray-500 leading-relaxed">
            The website ensures secure transactions for payments, data
            management, and user authentication using encryption techniques.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-base sm:text-lg md:text-2xl font-semibold text-[#202251] mb-1">
            5. Logout & Security
          </h2>
          <p className="text-sm sm:text-base text-gray-500 leading-relaxed">
            Users can log out anytime, and inactive sessions are automatically
            logged out for security purposes.
          </p>
        </section>

        <div className="text-center mt-6">
          <p className="text-sm sm:text-base md:text-lg font-semibold text-[#202251]">
            Start exploring the features and enhance your experience today!
          </p>
        </div>
      </div>
    </div>
  );
}

export default HowItWorks;
