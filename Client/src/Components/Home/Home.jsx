import Photo1 from "../../../../Storage/LOGO1.svg";
import Digree from "../../../../Storage/Digree.jpg";
import Internet from "../../../../Storage/Internet.jpg";
import HomeIcon from "../../../../Storage/Home.jpg";
import Code from "../../../../Storage/Code.jpg";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Loader from "../Loader/Loader";

function Home() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-40 md:-top-60"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 w-[22rem] sm:w-[36rem] md:w-[60rem] lg:w-[72rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          ></div>
        </div>
        <div className="mx-auto max-w-2xl px-4 py-20 sm:py-32 lg:py-40">
          <div className=" mb-6 flex justify-center sm:mb-8">
            <div
              onClick={() => navigate("/how-it-works")}
              className="relative cursor-pointer rounded-full px-3 py-1 text-xs sm:text-sm text-center text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20"
            >
              Explore Office Tools.{" "}
              <a href="#" className="font-bold text-[#202251]">
                <span className="absolute inset-0 " aria-hidden="true"></span>
                Read more <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-balance text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-gray-900">
              Efficient Solutions for Modern Offices
            </h1>
            <p className="mt-4 sm:mt-6 md:mt-8 text-pretty text-sm xs:text-base sm:text-lg md:text-xl font-medium text-gray-500">
              Boost productivity and make work easier with our office tools.
            </p>
            <div className="mt-6 sm:mt-8 md:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6">
              <a
                href="/photos"
                className="w-full sm:w-auto rounded-md px-4 py-2.5 bg-[radial-gradient(circle_at_top,_rgba(0,150,255,0.5)_0%,_#202251_70%)] text-sm sm:text-base font-bold text-white shadow-sm hover:bg-blue-500 transition-colors duration-300 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Get started
              </a>
              <a
                href="/aboutus"
                className="text-sm sm:text-base font-bold text-[#202251]"
              >
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
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

      <section className="text-white body-font bg-[radial-gradient(circle_at_top,_rgba(0,150,255,0.5)_0%,_#202251_70%)]">
        <div className="container mx-auto flex px-4 sm:px-6 lg:px-10 py-16 sm:py-20 md:py-24 flex-col lg:flex-row items-center">
          <div className="w-full lg:w-1/2 mb-10 md:mb-0">
            <img
              className="object-cover object-center w-full max-w-55 sm:max-w-70 md:max-w-80 lg:max-w-100 mx-auto rounded-lg"
              alt="hero"
              src={Photo1}
            />
          </div>
          <div className="w-full lg:w-1/2 lg:pl-24 md:pl-0 flex flex-col items-center md:items-start text-center md:text-center lg:text-left">
            <h1 className="text-2xl sm:text-3xl md:text-4xl mb-4 font-semibold text-white">
              Brief description of the out
              <br className="hidden lg:inline-block" />
              project goals and objectives.
            </h1>
            <p className="mb-8 text-sm sm:text-base md:text-lg leading-relaxed text-gray-200">
              This project aims to streamline office resource allocation,
              enhance task tracking, and improve communication within teams. The
              system integrates various tools to automate processes, ensuring
              efficiency and accuracy.
            </p>
            <div className="flex justify-center md:justify-center lg:justify-start w-full">
              <button
                onClick={() => navigate("/how-it-works")}
                className="overflow-hidden w-24 sm:w-28 md:w-32 p-2 h-9 sm:h-10 md:h-12 bg-white text-[#113823] border-none rounded-md text-sm sm:text-base md:text-lg font-bold cursor-pointer relative z-10 group flex items-center justify-center"
              >
                Prime Hub!
                <span className="absolute w-36 h-32 -top-8 -left-2 bg-[linear-gradient(to_right,#0096FF,#202251)] rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-700 duration-700 origin-left"></span>
                <span className="absolute w-36 h-32 -top-8 -left-2 bg-[linear-gradient(to_right,rgba(32,34,81,0.7),rgba(0,150,255,0.6))] backdrop-blur-md border border-white/20 rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-1000 duration-500 origin-left"></span>
                <span className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition duration-500 z-10">
                  Explore!
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="text-gray-600 body-font">
        <div className="container px-4 sm:px-6 lg:px-10 py-16 sm:py-20 lg:py-24 mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="rounded-lg p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:text-white hover:bg-[radial-gradient(circle_at_top,_rgba(0,150,255,0.5)_0%,_#202251_70%)]">
              <i className="fa-solid fa-user-graduate text-6xl sm:text-7xl text-black mb-6 mt-2"></i>
              <h2 className="font-bold text-[#202251] text-sm sm:text-base">
                Skilled Intern
              </h2>
              <span className="inline-block h-1 w-10 rounded bg-gradient-to-tr from-[#202251] via-blue-500 to-blue-300 mt-4 mb-3"></span>
              <p className="text-sm sm:text-base leading-relaxed">
                A skilled intern brings expertise and passion to the workplace,
                offering valuable support to teams.
              </p>
            </div>

            <div className="rounded-lg p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:text-white hover:bg-[radial-gradient(circle_at_top,_rgba(0,150,255,0.5)_0%,_#202251_70%)]">
              <i className="fa-solid fa-globe text-6xl sm:text-7xl text-black mb-6 mt-2"></i>
              <h2 className="font-bold text-[#202251] text-sm sm:text-base">
                Online Work
              </h2>
              <span className="inline-block h-1 w-10 rounded bg-gradient-to-tr from-[#202251] via-blue-500 to-blue-300 mt-4 mb-3"></span>
              <p className="text-sm sm:text-base leading-relaxed">
                Online work allows professionals to complete tasks remotely,
                often involving digital tools for communication and
                collaboration.
              </p>
            </div>

            <div className="rounded-lg p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:text-white hover:bg-[radial-gradient(circle_at_top,_rgba(0,150,255,0.5)_0%,_#202251_70%)]">
              <i className="fa-solid fa-house-chimney-window text-6xl sm:text-7xl text-black mb-6 mt-2"></i>
              <h2 className="font-bold text-[#202251] text-sm sm:text-base">
                Work From Home
              </h2>
              <span className="inline-block h-1 w-10 rounded bg-gradient-to-tr from-[#202251] via-blue-500 to-blue-300 mt-4 mb-3"></span>
              <p className="text-sm sm:text-base leading-relaxed">
                Work from home enables employees to complete tasks from home
                with flexibility.
              </p>
            </div>

            <div className="rounded-lg p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:text-white hover:bg-[radial-gradient(circle_at_top,_rgba(0,150,255,0.5)_0%,_#202251_70%)]">
              <i className="fa-solid fa-laptop-code text-6xl sm:text-7xl text-black mb-6 mt-2"></i>
              <h2 className="font-bold text-[#202251] text-sm sm:text-base">
                Problem Solving
              </h2>
              <span className="inline-block h-1 w-10 rounded bg-gradient-to-tr from-[#202251] via-blue-500 to-blue-300 mt-4 mb-3"></span>
              <p className="text-sm sm:text-base leading-relaxed">
                Problem-solving involves identifying issues, analyzing them, and
                developing solutions.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
