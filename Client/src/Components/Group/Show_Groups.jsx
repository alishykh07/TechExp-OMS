import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { allGroups } from "../../Services/GroupService.js";
import { loggedUser } from "../../Services/AuthService.js";
import Back_Button from "../BackButton/Back_Button";
import toast from "react-hot-toast";
import Loader from "../Loader/Loader.jsx";

function ShowAllGroups() {
  const navigate = useNavigate();
  const [groups, setGroups] = useState([]);
  const [loggedIn, setLoggedIn] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLoggedInUser = async () => {
      try {
        const user = await loggedUser();
        setLoggedIn(user);
      } catch (e) {
        console.log(e.message);
        setLoggedIn(null);
      }
    };
    fetchLoggedInUser();
  }, []);

  useEffect(() => {
    const fetchGroups = async () => {
      setIsLoading(true);
      try {
        const response = await allGroups();
        let filteredGroups = response.groups;

        if (loggedIn?.role === "Manager") {
          setGroups(filteredGroups);
        } else if (!loggedIn) {
          filteredGroups = filteredGroups.filter(
            (group) => group.groupType === "public",
          );
        } else {
          filteredGroups = filteredGroups.filter(
            (group) =>
              group.groupType === "public" ||
              group.members.includes(loggedIn.username),
          );
        }
        // await new Promise(resolve => setTimeout(resolve, 1000));
        setGroups(filteredGroups);
      } catch (e) {
        console.log(e);
        toast.error(e.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (loggedIn !== null) fetchGroups();
  }, [loggedIn]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(0,150,255,0.5)_0%,_#202251_70%)] px-4 sm:px-6 lg:px-10 pt-20 pb-10">
      <Back_Button />

      <div className="max-w-3xl mx-auto text-center pt-16 pb-8 sm:pb-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white drop-shadow-lg animate-fade-in">
          All Groups
        </h1>
        <p className="mt-2 sm:mt-4 text-sm sm:text-lg text-gray-200">
          Browse the list of available groups below.
        </p>
      </div>

      {loggedIn?.role === "Manager" && (
        <div className="flex justify-center mb-6 sm:mb-8">
          <button
            onClick={() => navigate("/add-group")}
            className="w-full sm:w-auto px-6 py-2 bg-[radial-gradient(circle_at_top,_rgba(139,191,77,0.5)_0%,_#4f7a2d_70%)] text-sm sm:text-base font-bold text-white shadow-sm hover:bg-[#73a240] transition-colors duration-300 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#73a240] rounded-lg"
          >
            Add New Group
          </button>
        </div>
      )}

      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl p-4 sm:p-6">
        {groups.length === 0 ? (
          <p className="text-center text-gray-600 font-semibold py-4">
            No Groups Available
          </p>
        ) : (
          <div className="space-y-4">
            {groups.map((group, idx) => (
              <div
                key={idx}
                className="p-4 bg-gray-50 rounded-lg shadow-md hover:bg-gray-100 transition-all duration-300 flex flex-col sm:flex-row items-center sm:items-center justify-between gap-3 sm:gap-0 text-center sm:text-left"
              >
                <div className="w-full">
                  <h2 className="text-lg sm:text-xl font-bold text-[#202251] break-words">
                    {group.groupName}
                  </h2>
                  <p className="text-gray-600 text-sm mt-1">
                    {group.description}
                  </p>
                </div>
                <button
                  onClick={() => navigate(`/group-details/${group._id}`)}
                  className="w-full sm:w-auto px-4 py-2 bg-[radial-gradient(circle_at_top,_rgba(0,150,255,0.5)_0%,_#202251_70%)] text-sm sm:text-base font-bold text-white shadow-sm hover:bg-blue-500 transition-colors duration-300 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 rounded-lg"
                >
                  Details
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ShowAllGroups;
