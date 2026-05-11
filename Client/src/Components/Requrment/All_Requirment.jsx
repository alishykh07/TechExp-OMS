import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  allRequrments,
  allRequrmentsByUsername,
  updteRequrments,
  updteRequrmentsEmp,
} from "../../Services/RequrmentService.js";
import { loggedUser } from "../../Services/AuthService.js";
import Back_Button from "../BackButton/Back_Button";
import toast from "react-hot-toast";
import DeleteConfirmationAlert from "../ConfirmetionAlerts/DeleteConfermetionAlert";
import ApproveConfirmationAlert from "../ConfirmetionAlerts/ApproveConfermetionAlert";
import Loader from "../Loader/Loader.jsx";

function AllRequirements() {
  const [requirements, setRequirements] = useState([]);
  const [allRequirements, setAllRequirements] = useState([]);
  const [loggedin, setLoggedin] = useState(null);
  const [editRequirement, setEditRequirement] = useState(null);
  const [editedData, setEditedData] = useState({ name: "", reason: "" });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showApproveConfirm, setShowApproveConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [approveId, setApproveId] = useState(null);
  const [closingDelete, setClosingDelete] = useState(false);
  const [closingApprove, setClosingApprove] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isUpdating, setIsUpdating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLoggedUser = async () => {
      try {
        setLoggedin(await loggedUser());
      } catch (e) {
        console.log(e.message);
        setLoggedin(null);
      }
    };
    fetchLoggedUser();
  }, []);

  useEffect(() => {
    const fetchRequirements = async () => {
      if (!loggedin) return;
      try {
        setIsLoading(true);

        let response;
        if (loggedin.role === "Manager") {
          response = await allRequrments();
        } else {
          response = await allRequrmentsByUsername(loggedin.username);
        }

        const fetched = response || [];
        setAllRequirements(fetched);
        setRequirements(fetched);
      } catch (e) {
        console.log(e);
        toast.error("Failed to fetch requirements");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRequirements();
  }, [loggedin]);

  useEffect(() => {
    let filtered = [...allRequirements];

    if (searchTerm.trim() !== "") {
      filtered = filtered.filter((req) =>
        req.name.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    if (filterStatus !== "all") {
      filtered = filtered.filter(
        (req) =>
          req.requrmentStatus.toLowerCase() === filterStatus.toLowerCase(),
      );
    }

    setRequirements(filtered);
  }, [searchTerm, filterStatus, allRequirements]);

  const navigate = useNavigate();

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowDeleteConfirm(true);
    setClosingDelete(false);
  };

  const handleDeleteConfirm = async () => {
    try {
      await updteRequrments(deleteId, "Cancelled");
      setRequirements((prev) =>
        prev.map((req) =>
          req._id === deleteId ? { ...req, requrmentStatus: "Cancelled" } : req,
        ),
      );
      toast.success("Requirement deleted successfully!");
    } catch (e) {
      console.log(e);
      toast.error("Failed to delete requirement.");
    }
  };

  const handleApproveClick = (id) => {
    setApproveId(id);
    setShowApproveConfirm(true);
    setClosingApprove(false);
  };

  const handleApproveConfirm = async () => {
    try {
      await updteRequrments(approveId, "Approved");
      setRequirements((prev) =>
        prev.map((req) =>
          req._id === approveId ? { ...req, requrmentStatus: "Approved" } : req,
        ),
      );
      toast.success("Requirement approved successfully!");
    } catch (e) {
      console.log(e);
      toast.error("Failed to approve requirement.");
    }
  };

  const handleUpdateConfirm = async (id) => {
    setIsUpdating(true);
    try {
      await updteRequrmentsEmp(id, editedData);
      setRequirements((prevRequirements) =>
        prevRequirements.map((req) =>
          req._id === id
            ? { ...req, ...editedData, requrmentStatus: "Pending" }
            : req,
        ),
      );
      toast.success("Requirement updated successfully.");
    } catch (e) {
      console.log(e);
      toast.error("Failed to update requirement. Please try again.");
      const oldData = await allRequrments();
      setRequirements(oldData);
    } finally {
      setIsUpdating(false);
      setEditRequirement(null);
      setEditedData({ name: "", reason: "" });
    }
  };

  const handleEdit = (requirement) => {
    setEditRequirement(requirement._id);
    setEditedData({ name: requirement.name, reason: requirement.reason });
  };

  const handleCancelEdit = () => {
    setEditRequirement(null);
    setEditedData({ name: "", reason: "" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (id) => {
    handleUpdateConfirm(id);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(0,150,255,0.5)_0%,_#202251_70%)] px-4 sm:px-6 lg:px-10 pt-20 pb-10">
      <Back_Button />

      <div className="max-w-3xl mx-auto text-center pt-10 sm:pt-16 pb-6">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white drop-shadow-lg animate-fade-in">
          All Requirements
        </h1>
      </div>

      <div className="max-w-5xl mx-auto mb-6 sm:mb-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-between items-center">
        <input
          type="text"
          placeholder="Search by name..."
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
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="cancelled">Cancelled</option>
        </select>
        {loggedin?.role === "Employee" && (
          <button
            onClick={() => navigate("/submit-requrment")}
            className="w-full sm:w-auto px-4 sm:px-3 py-2 sm:py-3 rounded-lg bg-[radial-gradient(circle_at_top,_rgba(139,191,77,0.5)_0%,_#4f7a2d_70%)] text-sm sm:text-base font-bold text-white shadow-sm hover:bg-[#73a240] transition-colors duration-300 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#73a240]"
          >
            Add Requirement
          </button>
        )}
      </div>
      <div className="max-w-5xl mx-auto">
        {requirements.length === 0 ? (
          <p className="text-center text-lg text-gray-200 font-semibold py-4 bg-white rounded-lg shadow-md">
            No requirements submitted yet.
          </p>
        ) : (
          <div className="space-y-6">
            {requirements.map((requirement, idx) => (
              <div
                key={idx}
                className="bg-white p-4 sm:p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transform hover:scale-105"
              >
                <div className="flex-1 space-y-2">
                  {editRequirement === requirement._id ? (
                    <>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-[#202251] mb-1">
                            Name
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={editedData.name}
                            onChange={handleChange}
                            className="w-full p-2.5 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:[#202251] transition"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-[#202251] mb-1">
                            Reason
                          </label>
                          <input
                            type="text"
                            name="reason"
                            value={editedData.reason}
                            onChange={handleChange}
                            className="w-full p-2.5 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:[#202251] transition"
                          />
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <h4 className="text-base sm:text-lg font-semibold text-[#202251]">
                        {requirement.name}
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        {requirement.reason}
                      </p>
                    </>
                  )}
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">
                    Username: {requirement.username}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">
                    Date: {new Date(requirement.date).toLocaleDateString()}
                  </p>
                  <p
                    className={`text-xs sm:text-smfont-medium mt-1 ${requirement.requrmentStatus === "Approved" ? "text-green-600" : requirement.requrmentStatus === "Cancelled" ? "text-red-600" : "text-gray-600"}`}
                  >
                    Status: {requirement.requrmentStatus}
                  </p>
                </div>

                <div className="flex gap-4 mt-4 sm:mt-0">
                  {loggedin?.role === "Manager" ? (
                    <>
                      {requirement.requrmentStatus === "Pending" ? (
                        <>
                          <button
                            onClick={() => handleApproveClick(requirement._id)}
                            className="px-4 py-2 rounded-lg bg-[radial-gradient(circle_at_top,_rgba(139,191,77,0.5)_0%,_#4f7a2d_70%)] text-sm sm:text-base font-bold text-white shadow-sm hover:bg-[#73a240] transition-colors duration-300 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#73a240]"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleDeleteClick(requirement._id)}
                            className="px-4 py-2 text-sm sm:text-base font-bold bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition-all duration-300"
                          >
                            Delete
                          </button>
                        </>
                      ) : null}
                    </>
                  ) : (
                    <>
                      {editRequirement === requirement._id ? (
                        <>
                          <button
                            onClick={() => handleSave(requirement._id)}
                            className="px-4 py-2 rounded-lg bg-[radial-gradient(circle_at_top,_rgba(0,150,255,0.5)_0%,_#202251_70%)] text-sm sm:text-base font-bold text-white shadow-sm hover:bg-blue-500 transition-colors duration-300 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            disabled={isUpdating}
                          >
                            {isUpdating ? "Saving..." : "Save"}
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            className="px-4 py-2 bg-gray-400 text-sm sm:text-base font-bold text-white rounded-lg shadow-md hover:bg-gray-500 transition-all duration-300"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => handleEdit(requirement)}
                          className="px-4 py-2 rounded-lg bg-[radial-gradient(circle_at_top,_rgba(139,191,77,0.5)_0%,_#4f7a2d_70%)] text-sm sm:text-base font-bold text-white shadow-sm hover:bg-[#73a240] transition-colors duration-300 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#73a240]"
                        >
                          Update
                        </button>
                      )}
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

      <ApproveConfirmationAlert
        showConfirm={showApproveConfirm}
        setShowConfirm={setShowApproveConfirm}
        approveId={approveId}
        setApproveId={setApproveId}
        closing={closingApprove}
        setClosing={setClosingApprove}
        onConfirm={handleApproveConfirm}
      />
    </div>
  );
}

export default AllRequirements;
