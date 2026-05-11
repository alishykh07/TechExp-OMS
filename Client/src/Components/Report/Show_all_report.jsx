import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {
  allReports,
  allReportsByUsername,
  approveReports,
  deleteReports,
} from "../../Services/ReportService.js";
import { loggedUser } from "../../Services/AuthService.js";
import Back_Button from "../BackButton/Back_Button";
import toast from "react-hot-toast";
import DeleteConfirmationAlert from "../ConfirmetionAlerts/DeleteConfermetionAlert.jsx";
import ApproveConfirmationAlert from "../ConfirmetionAlerts/ApproveConfermetionAlert.jsx";
import Loader from "../Loader/Loader.jsx";

function ShowAllReports() {
  const [reports, setReports] = useState([]);
  const [allReport, setAllReports] = useState([]);
  const [loggedIn, setLoggedIn] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showApproveConfirm, setShowApproveConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [approveId, setApproveId] = useState(null);
  const [closingDelete, setClosingDelete] = useState(false);
  const [closingApprove, setClosingApprove] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

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
    const fetchReports = async () => {
      if (!loggedIn) return;
      try {
        setIsLoading(true);

        let response;
        if (loggedIn.role === "Manager") {
          response = await allReports();
        } else {
          response = await allReportsByUsername(loggedIn.username);
        }

        const fetchedReports = response.reports || [];
        setAllReports(fetchedReports);
        setReports(fetchedReports);
      } catch (e) {
        console.log(e);
        toast.error("Failed to load reports.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchReports();
  }, [loggedIn]);

  useEffect(() => {
    let filtered = [...allReport];

    if (searchTerm.trim() !== "") {
      const term = searchTerm.trim().toLowerCase();
      filtered = filtered.filter((report) =>
        report.title.toLowerCase().includes(term),
      );
    }

    if (filterStatus !== "all") {
      filtered = filtered.filter((report) =>
        filterStatus === "approved" ? report.approve : !report.approve,
      );
    }

    setReports(filtered);
  }, [searchTerm, filterStatus, allReports]);

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowDeleteConfirm(true);
    setClosingDelete(false);
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteReports(deleteId);
      setReports((prev) => prev.filter((report) => report._id !== deleteId));
      toast.success("Report deleted successfully!");
    } catch (e) {
      console.log(e);
      toast.error("Failed to delete report.");
    }
  };

  const handleApproveClick = (id) => {
    setApproveId(id);
    setShowApproveConfirm(true);
    setClosingApprove(false);
  };

  const handleApproveConfirm = async () => {
    try {
      await approveReports(approveId);
      setReports((prev) =>
        prev.map((report) =>
          report._id === approveId ? { ...report, approve: true } : report,
        ),
      );
      toast.success("Report approved successfully!");
    } catch (e) {
      console.log(e);
      toast.error("Failed to approve report.");
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(0,150,255,0.5)_0%,_#202251_70%)] px-4 sm:px-6 lg:px-10 pt-20 pb-10">
      <Back_Button />

      <div className="max-w-3xl mx-auto text-center pt-10 sm:pt-16 pb-6">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white drop-shadow-lg animate-fade-in">
          All Reports
        </h1>
      </div>

      <div className="max-w-5xl mx-auto mb-6 sm:mb-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-between items-center">
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
          <option value="approved">Approved</option>
          <option value="not-approved">Not Approved</option>
        </select>

        {loggedIn?.role === "Employee" && (
          <button
            onClick={() => navigate("/submit-report")}
            className="w-full sm:w-auto px-4 sm:px-3 py-2 sm:py-3 rounded-lg bg-[radial-gradient(circle_at_top,_rgba(139,191,77,0.5)_0%,_#4f7a2d_70%)] text-sm sm:text-base font-bold text-white shadow-sm hover:bg-[#73a240] transition-colors duration-300 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#73a240]"
          >
            {" "}
            Add Report{" "}
          </button>
        )}
      </div>

      <div className="max-w-5xl mx-auto">
        {reports.length === 0 ? (
          <p className="text-center text-lg text-gray-200 font-semibold py-4 bg-white rounded-lg shadow-md">
            No reports submitted yet.
          </p>
        ) : (
          <div className="space-y-6">
            {reports.map((report, idx) => (
              <div
                key={idx}
                className="bg-white p-4 sm:p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transform hover:scale-105"
              >
                <div className="flex-1 space-y-2">
                  <h2 className="text-base sm:text-lg font-semibold text-[#202251]">
                    <span className=" font-bold">Submited By: </span>
                    {report.submitedBy}
                  </h2>
                  <h4 className="text-base sm:text-lg font-semibold text-[#202251]">
                    <span className=" font-bold">Title: </span>
                    {report.title}
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">
                    <span className=" font-bold">Description: </span>{" "}
                    {report.description}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">
                    <span className="font-bold">Start Date:</span>{" "}
                    {new Date(report.startDate).toLocaleDateString()} |{" "}
                    <span className="font-bold">End Date:</span>{" "}
                    {new Date(report.endDate).toLocaleDateString()}
                  </p>
                  <p
                    className={`text-sm mt-1 font-medium ${
                      report.approve ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    <span className="font-bold">Status: </span>
                    {report.approve ? "Approved" : "Not Approved"}
                  </p>
                  {console.log(report)}
                </div>

                <div className="flex gap-4 mt-4 sm:mt-0">
                  <a
                    href={report.reportDocument}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-lg bg-[radial-gradient(circle_at_top,_rgba(0,150,255,0.5)_0%,_#202251_70%)] text-sm sm:text-base font-bold text-white shadow-sm hover:bg-blue-500 transition-colors duration-300 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    View
                  </a>
                  {loggedIn?.role === "Manager" && (
                    <>
                      {!report.approve ? (
                        <button
                          onClick={() => handleApproveClick(report._id)}
                          className="px-4 py-2 rounded-lg bg-[radial-gradient(circle_at_top,_rgba(139,191,77,0.5)_0%,_#4f7a2d_70%)] text-sm sm:text-base font-bold text-white shadow-sm hover:bg-[#73a240] transition-colors duration-300 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#73a240]"
                        >
                          Approve
                        </button>
                      ) : (
                        <button
                          onClick={() => handleDeleteClick(report._id)}
                          className="px-4 py-2 bg-red-600 text-white rounded-lg shadow-md text-sm sm:text-base font-bold hover:bg-red-700 transition-all duration-300"
                        >
                          Delete
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

export default ShowAllReports;
