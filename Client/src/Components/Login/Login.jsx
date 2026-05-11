import React, { useState } from "react";
import { useEffect } from "react";
import { loggedUser } from "../../Services/AuthService";
import { login } from "../../Services/AuthService";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";


function Login() {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  
  useEffect(() => {
  const checkUser = async () => {
    try {
      const user = await loggedUser();

      if (user) {
        if (user.role === "Manager") {
          navigate("/dashboard");
        } else {
          navigate("/");
        }
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  checkUser();
}, []);

  const [Error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { token, user } = await login(form);
      localStorage.setItem("token", token);
      localStorage.setItem("username", user.username);
      if (user.role === "Manager") {
        navigate("/dashboard");
      } else {
        navigate("/");
      }
      location.reload();
    } catch (e) {
      setError(e.message);
      toast.error(e.message);
    }
  };

  return (
    <>
      <div className="relative isolate px-4 sm:px-6 lg:px-8">
        <div
          className="absolute inset-x-0 -top-40 sm:-top-60 md:-top-80 -z-10 transform-gpu overflow-hidden blur-3xl"
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
        <div className="mx-auto max-w-md px-2 sm:px-4 py-20 sm:py-28 md:py-36 lg:py-40">
          <div className="text-center">
            <h1 className="text-balance text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tight text-[#202251] ">
              Welcome!
            </h1>
            <p className="mt-3 text-base sm:text-lg font-medium text-gray-500 ">
              Please log in to continue.
            </p>
          </div>
          {Error ? (
            <p className="text-red-600 font-bold text-center mt-3 text-sm sm:text-base">
              {Error}
            </p>
          ) : null}
          <form
            onSubmit={handleSubmit}
            className="mt-8 sm:mt-10 space-y-5"
            action="#"
            method="POST"
          >
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-bold text-[#202251]"
              >
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="username"
                  autoComplete="username"
                  required
                  className="block w-full rounded-md border-gray-300 px-3 sm:px-4 py-2 sm:py-2 shadow-sm focus:border-[#202251] focus:[#202251] text-sm sm:text-base"
                  placeholder="you@123"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-bold text-[#202251]"
              >
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-gray-300 px-3 sm:px-4 py-2 sm:py-2 shadow-sm focus:border-[#202251] focus:[#202251] text-sm sm:text-base"
                  placeholder="••••••••"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex justify-start">
              <a
                href="/forgot-password"
                className="text-xs sm:text-sm font-medium text-[#72e420] hover:text-[#73a420]"
              >
                Forgot your password?
              </a>
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center px-4 py-2 sm:py-3 rounded-lg bg-[radial-gradient(circle_at_top,_rgba(0,150,255,0.5)_0%,_#202251_70%)] text-sm sm:text-base font-bold text-white shadow-sm hover:bg-blue-500 transition-colors duration-300 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Log In
              </button>
            </div>
          </form>
          <p className="mt-8 text-center text-xs sm:text-sm text-gray-500">
            Don’t have an account?{" "}
            <a
              href="/contactus"
              className="font-medium text-[#72e420] hover:text-[#73a420]"
            >
              Talk to Your Manager
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

export default Login;
