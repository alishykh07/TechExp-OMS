import { useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { fetchTaskById, updateWorkById } from "../../Services/WorkService.js";
import { loggedUser } from "../../Services/AuthService.js";
import Back_Button from "../BackButton/Back_Button";
import toast from "react-hot-toast";

function ViewTask() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [updatedTask, setUpdatedTask] = useState({
    title: "",
    description: "",
    completionDate: "",
  });
  const [loggedIn, setLoggedIn] = useState(null);

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
    const getTask = async () => {
      try {
        const response = await fetchTaskById(id);
        setTask(response.tasks);
        setUpdatedTask({
          title: response.tasks.title,
          description: response.tasks.description,
          completionDate: new Date(response.tasks.completionDate)
            .toISOString()
            .split("T")[0],
        });
      } catch (e) {
        console.log(e);
        toast.error("Failed to fetch task details.");
      }
    };
    getTask();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      await updateWorkById(id, updatedTask);
      setTask((prev) => ({ ...prev, ...updatedTask }));
      setEditMode(false);
      toast.success("Work updated successfully!");
    } catch (e) {
      console.log("Update failed:", e);
      toast.error("Failed to update work.");
    }
  };

  if (!task) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-blue-600 to-indigo-500 p-6 flex justify-center items-center">
        <p className="text-white text-lg font-semibold">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(0,150,255,0.5)_0%,_#202251_70%)] px-4 sm:px-6 lg:px-10 pt-20 pb-10">
      <Back_Button />

      <div className="max-w-3xl mx-auto text-center pt-10 sm:pt-16 pb-6 sm:pb-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white drop-shadow-lg animate-fade-in">
          Work Details
        </h1>
      </div>

      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl p-4 sm:p-6 md:p-8 space-y-5 sm:space-y-6">
        <div>
          <label className="block text-xs sm:text-sm font-medium text-[#202251]">
            Title
          </label>
          {editMode ? (
            <input
              type="text"
              name="title"
              value={updatedTask.title}
              onChange={handleChange}
              className="w-full p-2 text-xs sm:text-sm sm:p-3 border rounded-lg focus:ring-2 focus:[#202251] focus:outline-none border-gray-300 mt-1"
            />
          ) : (
            <h2 className="text-lg sm:text-2xl font-semibold text-gray-800 mt-1">
              {task.title}
            </h2>
          )}
        </div>

        <div>
          <label className="block text-xs sm:text-sm font-medium text-[#202251]">
            Description
          </label>
          {editMode ? (
            <textarea
              name="description"
              value={updatedTask.description}
              onChange={handleChange}
              className="w-full text-xs sm:text-sm p-2 sm:p-3 border rounded-lg focus:ring-2 focus:[#202251] focus:outline-none border-gray-300 mt-1 h-24 resize-y"
            />
          ) : (
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              {task.description}
            </p>
          )}
        </div>

        <div>
          <label className="block text-xs sm:text-sm font-medium text-[#202251]">
            Completion Date
          </label>
          {editMode ? (
            <input
              type="date"
              name="completionDate"
              value={updatedTask.completionDate}
              onChange={handleChange}
              className="w-full text-sm sm:text-base p-2 sm:p-3 border rounded-lg focus:ring-2 focus:[#202251] focus:outline-none border-gray-300 mt-1"
            />
          ) : (
            <p className="text-sm sm:text-base text-gray-600 mt-1">
              {new Date(task.completionDate).toLocaleDateString()}
            </p>
          )}
        </div>

        <div>
          <label className="block text-xs sm:text-sm font-medium text-[#202251]">
            Assigned To
          </label>
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 mt-2">
            {task.groupName.length > 0 && (
              <div className="w-full">
                <p className="text-sm sm:text-base text-[#202251] font-semibold">
                  Group Name:
                </p>
                <ul className="mt-2 space-y-1 text-gray-600">
                  {task.groupName.map((group, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-2 text-sm sm:text-base break-words"
                    >
                      <span className="w-2 h-2 bg-[#202251] rounded-full"></span>
                      {group}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {task.empoyeeName.length > 0 && (
              <div className="w-full">
                <p className="text-sm sm:text-base text-[#202251] font-semibold">
                  Employee:
                </p>
                <ul className="mt-2 space-y-1 text-gray-600">
                  {task.empoyeeName.map((employee, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-2 text-sm sm:text-basebreak-words"
                    >
                      <span className="w-2 h-2 bg-[#202251] rounded-full"></span>
                      {employee}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div>
          <label className="block text-xs sm:text-sm font-medium text-[#202251]">
            Creation Date
          </label>
          <p className="text-sm sm:text-base text-gray-600 mt-1">
            {new Date(task.createdAt).toLocaleDateString()}
          </p>
        </div>

        {task.createdAt !== task.updatedAt && (
          <div>
            <label className="block text-xs sm:text-sm font-medium text-[#202251]">
              Updated Date
            </label>
            <p className="text-sm sm:text-base text-gray-600 mt-1">
              {new Date(task.updatedAt).toLocaleDateString()}
            </p>
          </div>
        )}

        <div>
          <label className="block text-xs sm:text-sm font-medium text-gray-700">
            Status
          </label>
          <p
            className={`mt-1 text-sm sm:text-base font-medium ${
              task.workStatus === "complete" ? "text-green-600" : "text-red-600"
            }`}
          >
            {task.workStatus}
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mt-6 sm:mt-8">
        {loggedIn?.role === "Manager" && (
          <>
            {editMode ? (
              <>
                <button
                  onClick={handleSave}
                  className="px-6 py-2 rounded-lg bg-[radial-gradient(circle_at_top,_rgba(139,191,77,0.5)_0%,_#4f7a2d_70%)] text-sm sm:text-base font-bold text-white shadow-sm hover:bg-[#73a240] transition-colors duration-300 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#73a240] w-full sm:w-auto"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditMode(false)}
                  className="px-6 py-2 bg-gray-600 text-white font-bold text-sm sm:text-base rounded-lg shadow-md hover:bg-gray-700 transition-all duration-300 w-full sm:w-auto"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setEditMode(true)}
                  className="w-full sm:w-auto px-6 py-2 rounded-lg bg-[radial-gradient(circle_at_top,_rgba(139,191,77,0.5)_0%,_#4f7a2d_70%)] text-sm sm:text-base font-bold text-white shadow-sm hover:bg-[#73a240] transition-colors duration-300 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#73a240]"
                >
                  Edit
                </button>
                <button
                  onClick={() => navigate(-1)}
                  className="w-full sm:w-auto px-6 py-2 rounded-lg bg-[radial-gradient(circle_at_top,_rgba(139,191,77,0.5)_0%,_#4f7a2d_70%)] text-sm sm:text-base font-bold text-white shadow-sm hover:bg-[#73a240] transition-colors duration-300 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#73a240]"
                >
                  Back
                </button>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default ViewTask;
