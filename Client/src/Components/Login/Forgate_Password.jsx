import React, { useState } from "react";
import { forgotPassword } from "../../Services/AuthService.js";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function ForgotPassword() {
  const [formData, setFormData] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [Error, setError] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (formData.newPassword === formData.confirmPassword) {
        await forgotPassword(formData);
        toast.success("Password reset successful!");
        navigate("/login");
      } else {
        setError("Passwords do not match!");
        toast.error("Passwords do not match!");
      }
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <>
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          ></div>
        </div>
        <div className="mx-auto w-full max-w-md px-4 py-20 sm:py-28 md:py-36 lg:py-40">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[#202251]">
              Reset Password
            </h1>
            <p className="mt-3 text-base sm:text-lg text-gray-500">
              Enter your new password below.
            </p>
          </div>
          {Error ? (
            <p className="text-red-600 font-bold flex justify-center">
              {Error}
            </p>
          ) : null}
          <form className="mt-10 space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-bold text-[#202251]"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-gray-300 px-3 sm:px-4 py-2 sm:py-2 shadow-sm focus:border-[#202251] focus:[#202251] text-sm sm:text-base"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="newPassword"
                className="block text-sm font-bold text-[#202251]"
              >
                New Password
              </label>
              <div className="mt-2">
                <input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="block w-full rounded-md border-gray-300 px-3 sm:px-4 py-2 sm:py-2 shadow-sm focus:border-[#202251] focus:[#202251] text-sm sm:text-base"
                  placeholder="Enter new password"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-bold text-[#202251]"
              >
                Confirm Password
              </label>
              <div className="mt-2">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="block w-full rounded-md border-gray-300 px-3 sm:px-4 py-2 sm:py-2 shadow-sm focus:border-[#202251] focus:[#202251] text-sm sm:text-base"
                  placeholder="Confirm new password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center px-4 py-2 sm:py-3 rounded-lg bg-[radial-gradient(circle_at_top,_rgba(0,150,255,0.5)_0%,_#202251_70%)] text-sm sm:text-base font-bold text-white shadow-sm hover:bg-blue-500 transition-colors duration-300 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Reset Password
              </button>
            </div>
          </form>
          <p className="mt-10 text-center text-sm text-gray-500">
            Remember your password?{" "}
            <a
              href="/login"
              className="font-medium text-[#72e420] hover:text-[#73a420]"
            >
              Log in
            </a>
          </p>
        </div>
        <div
          className="-mt-20 absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          ></div>
        </div>
      </div>
    </>
  );
}

export default ForgotPassword;
