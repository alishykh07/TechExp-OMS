import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  completeById,
  deleteWorkById,
  fetchallProjects,
  fetchemployeeProjects,
} from "../../Services/WorkService.js";
import { loggedUser } from "../../Services/AuthService.js";
import Back_Button from "../BackButton/Back_Button";
import toast from "react-hot-toast";
import DeleteConfirmationAlert from "../ConfirmetionAlerts/DeleteConfermetionAlert";
import CompleteConfirmationAlert from "../ConfirmetionAlerts/ComlateConfermetionAlert.jsx";
import Loader from "../Loader/Loader.jsx";

function AllProjects() {
  const [projects, setProjects] = useState([]);
  const [allProjects, setAllProjects] = useState([]);
  const [loggedIn, setLoggedIn] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showCompleteConfirm, setShowCompleteConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [completeId, setCompleteId] = useState(null);
  const [closingDelete, setClosingDelete] = useState(false);
  const [closingComplete, setClosingComplete] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

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
    const fetchProjects = async () => {
      if (!loggedIn) return;
      try {
        setIsLoading(true);

        let response;
        if (loggedIn.role === "Manager") {
          response = await fetchallProjects();
        } else {
          response = await fetchemployeeProjects(username);
        }

        const fetched = response.projects || [];
        setAllProjects(fetched);
        setProjects(fetched);
      } catch (e) {
        console.log(e);
        toast.error("Failed to fetch projects.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, [loggedIn, username]);

  useEffect(() => {
    let filtered = [...allProjects];

    if (searchTerm.trim() !== "") {
      filtered = filtered.filter((project) =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    if (filterStatus !== "all") {
      filtered = filtered.filter((project) =>
        filterStatus === "complete"
          ? project.workStatus === "complete"
          : project.workStatus !== "complete",
      );
    }

    setProjects(filtered);
  }, [searchTerm, filterStatus, allProjects]);

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowDeleteConfirm(true);
    setClosingDelete(false);
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteWorkById(deleteId);
      setProjects((prevProjects) =>
        prevProjects.filter((project) => project._id !== deleteId),
      );
      toast.success("Project deleted successfully!");
    } catch (e) {
      console.log(e);
      toast.error("Failed to delete project!");
    }
  };

  const handleCompleteClick = (id) => {
    setCompleteId(id);
    setShowCompleteConfirm(true);
    setClosingComplete(false);
  };

  const handleCompleteConfirm = async () => {
    try {
      await completeById(completeId);
      setProjects((prevProjects) =>
        prevProjects.map((project) =>
          project._id === completeId
            ? { ...project, workStatus: "complete" }
            : project,
        ),
      );
      toast.success("Project marked as complete!");
    } catch (e) {
      console.log(e);
      toast.error("Failed to complete project!");
    }
  };

  const viewProjectDetails = (id) => {
    navigate(`/view-details/${id}`);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(0,150,255,0.5)_0%,_#202251_70%)] px-4 sm:px-6 lg:px-10 pt-20 pb-10">
      <Back_Button />

      <div className="max-w-3xl mx-auto text-center pt-10 sm:pt-16 pb-6">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white drop-shadow-lg animate-fade-in">
          All Projects
        </h1>
      </div>

      <div className="max-w-4xl mx-auto mb-6 sm:mb-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-between items-center">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-1/2 p-3 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:[#202251] text-gray-700 bg-white/90 backdrop-blur-sm"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="w-full sm:w-1/4 p-3 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:[#202251] text-gray-700 bg-white/90 backdrop-blur-sm"
        >
          <option value="all">All Status</option>
          <option value="complete">Complete</option>
          <option value="not-complete">Not Complete</option>
        </select>

        {loggedIn?.role === "Manager" && (
          <button
            onClick={() => navigate("/add-work")}
            className="w-full sm:w-auto px-6 sm:px-3 py-2 sm:py-3 rounded-lg bg-[radial-gradient(circle_at_top,_rgba(139,191,77,0.5)_0%,_#4f7a2d_70%)] text-sm sm:text-base font-bold text-white shadow-sm hover:bg-[#73a240] transition-colors duration-300 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#73a240]"
          >
            Add Project
          </button>
        )}
      </div>

      <div className="max-w-4xl mx-auto">
        {projects.length === 0 ? (
          <p className="text-center text-sm sm:text-lg text-gray-200 font-semibold py-4 bg-white rounded-lg shadow-md">
            No projects available yet. Enjoy your day!
          </p>
        ) : (
          <div className="space-y-4 sm:space-y-6">
            {projects.map((project, idx) => (
              <div
                key={idx}
                className="bg-white p-4 sm:p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transform hover:scale-105"
              >
                <div className="flex-1">
                  <h4 className="text-lg sm:text-xl font-semibold text-[#202251] break-words">
                    {project.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600 mt-1">
                    <span className="font-medium">Completion Date:</span>{" "}
                    {new Date(project.completionDate).toLocaleDateString()}
                  </p>
                  <p
                    className={`text-xs sm:text-sm font-medium mt-1 ${
                      project.workStatus === "complete"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    <span className="font-medium">Status:</span>{" "}
                    {project.workStatus}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 sm:gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => viewProjectDetails(project._id)}
                    className="flex-1 sm:flex-none px-3 sm:px-4 py-2 rounded-lg bg-[radial-gradient(circle_at_top,_rgba(0,150,255,0.5)_0%,_#202251_70%)] text-sm sm:text-base font-bold text-white shadow-sm hover:bg-blue-500 transition-colors duration-300 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    View
                  </button>
                  {loggedIn?.role === "Manager" && (
                    <>
                      {project.workStatus !== "complete" && (
                        <button
                          onClick={() => handleCompleteClick(project._id)}
                          className="flex-1 sm:flex-none px-3 sm:px-4 py-2 rounded-lg bg-[radial-gradient(circle_at_top,_rgba(139,191,77,0.5)_0%,_#4f7a2d_70%)] text-sm sm:text-base font-bold text-white shadow-sm hover:bg-[#73a240] transition-colors duration-300 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#73a240]"
                        >
                          Complete
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteClick(project._id)}
                        className="flex-1 sm:flex-none px-3 sm:px-4 py-2 bg-red-600 text-white rounded-lg text-sm sm:text-base font-bold shadow-md hover:bg-red-700 transition-all duration-300"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <DeleteConfirmationAlert
        showConfirm={showDeleteConfirm}
        setShowConfirm={setShowDeleteConfirm}
        deleteId={deleteId}
        setDeleteId={setDeleteId}
        closing={closingDelete}
        setClosing={setClosingDelete}
        onConfirm={handleDeleteConfirm}
      />

      <CompleteConfirmationAlert
        showConfirm={showCompleteConfirm}
        setShowConfirm={setShowCompleteConfirm}
        completeId={completeId}
        setCompleteId={setCompleteId}
        closing={closingComplete}
        setClosing={setClosingComplete}
        onConfirm={handleCompleteConfirm}
      />
    </div>
  );
}

export default AllProjects;
