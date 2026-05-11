import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserById } from "../../Services/AuthService.js";
import toast from "react-hot-toast";
import Back_Button from "../BackButton/Back_Button.jsx";

const UserDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});

  useEffect(() => {
    const userDetails = async () => {
      try {
        const response = await UserById(id);
        setUser(response);
      } catch (e) {
        console.log(e.message);
        toast.error(e.message);
      }
    };
    userDetails();
  }, [id]);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(0,150,255,0.5)_0%,_#202251_70%)] px-4 sm:px-6 md:px-10 py-10 pt-20">
      <Back_Button />

      <div className="max-w-3xl mx-auto text-center pt-10 sm:pt-14 pb-6 sm:pb-8">
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white drop-shadow-lg animate-fade-in">
          User Details
        </h1>
      </div>

      <div className="max-w-4xl mx-auto bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
        <div className="flex flex-col items-center mb-6">
          <img
            src={
              user.profilePhoto
                ? `${user.profilePhoto}`
                : "https://www.pngmart.com/files/23/Profile-PNG-Photo.png"
            }
            alt="Profile Photo"
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full"
          />
        </div>

        <div className="space-y-3 sm:space-y-4">
          {Object.keys(user).map(
            (key) =>
              key !== "_id" &&
              key !== "password" &&
              key !== "profilePhoto" &&
              key !== "__v" &&
              key !== "updatedAt" &&
              key !== "createdAt" &&
              key !== "last_payemnt_date" && (
                <div
                  key={key}
                  className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-4 border-b pb-2"
                >
                  <span className="font-semibold text-[#202251] capitalize text-sm sm:text-base">
                    {key
                      .replace(/([A-Z])|_/g, (match, p1) =>
                        p1 ? ` ${p1}` : " ",
                      )
                      .trim()}
                    :
                  </span>
                  {key === "resume" && user[key] ? (
                    <a
                      href={`${user[key]}`}
                      className="text-[#72e420] hover:text-[#73a420] text-sm sm:text-base break-all"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Click to show resume
                    </a>
                  ) : (
                    <span className="text-gray-600 text-sm sm:text-base break-all">
                      {user[key]}
                    </span>
                  )}
                </div>
              ),
          )}

          {user.createdAt && (
            <div className="flex flex-col sm:flex-row sm:justify-between gap-1 border-b pb-2">
              <span className="font-semibold text-gray-700 text-sm sm:text-base">
                Account Created:
              </span>
              <span className="text-gray-600 text-sm sm:text-base">
                {new Date(user.createdAt).toLocaleDateString()}
              </span>
            </div>
          )}

          {user.updatedAt !== user.createdAt && (
            <div className="flex flex-col sm:flex-row sm:justify-between gap-1 border-b pb-2">
              <span className="font-semibold text-gray-700 text-sm sm:text-base">
                Last Updated:
              </span>
              <span className="text-gray-600 text-sm sm:text-base">
                {new Date(user.updatedAt).toLocaleDateString()}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
