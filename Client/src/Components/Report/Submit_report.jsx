import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addReport } from "../../Services/ReportService.js";
import Back_Button from "../BackButton/Back_Button";
import toast from "react-hot-toast";
function SubmitReport() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reportDocument, setReportDocument] = useState(null);
  const username = localStorage.getItem("username");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (reportDocument?.size > 100 * 1024 * 1024) {
        toast.error("File size too large! Maximum 10MB limit.");
        return;
      }
      const report = new FormData();
      report.append("reportdocument", reportDocument);
      report.append("title", title);
      report.append("description", description);
      report.append("startDate", startDate);
      report.append("endDate", endDate);
      report.append("submitedBy", username);
      await addReport(report);
      toast.success("New report submitted!");
      navigate("/all-reports");
    } catch (e) {
      console.log(e);
      toast.error("Failed to submit report.");
    }
  };
  return (
    <div className="min-h-screen body-font bg-[radial-gradient(circle_at_top,_rgba(0,150,255,0.5)_0%,_#202251_70%)] px-4 sm:px-6 lg:px-10 pt-20 pb-10">
      {" "}
      <Back_Button />{" "}
      <div className="max-w-3xl mx-auto text-center pt-10 sm:pt-16 pb-6">
        {" "}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white drop-shadow-lg animate-fade-in">
          {" "}
          Submit Report{" "}
        </h1>{" "}
      </div>{" "}
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl p-4 sm:p-6 lg:p-8">
        {" "}
        <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
          {" "}
          <div>
            {" "}
            <label className="block text-sm sm:text-base font-medium text-[#202251]">
              Title
            </label>{" "}
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2.5 sm:p-3 border rounded-lg focus:ring-2 focus:[#202251] focus:outline-none border-gray-300 mt-1"
              required
            />{" "}
          </div>{" "}
          <div>
            {" "}
            <label className="block text-sm sm:text-base font-medium text-[#202251]">
              Description
            </label>{" "}
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2.5 sm:p-3 border rounded-lg focus:ring-2 focus:[#202251] focus:outline-none border-gray-300 mt-1 h-24 resize-y"
              required
            />{" "}
          </div>{" "}
          <div>
            {" "}
            <label className="block text-sm sm:text-base font-medium text-[#202251]">
              Document
            </label>{" "}
            <input
              type="file"
              name="reportdocument"
              onChange={(e) => setReportDocument(e.target.files[0])}
              className="w-full p-2.5 sm:p-3 border rounded-lg focus:ring-2 focus:[#202251] focus:outline-none border-gray-300 mt-1 text-[#202251]"
            />{" "}
          </div>{" "}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              {" "}
              <label className="block text-sm sm:text-base font-medium text-[#202251]">
                Start Date
              </label>{" "}
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full p-2.5 sm:p-3 border rounded-lg focus:ring-2 focus:[#202251] focus:outline-none border-gray-300 mt-1"
                max={new Date().toISOString().split("T")[0]}
                required
              />{" "}
            </div>{" "}
            <div>
              {" "}
              <label className="block text-sm sm:text-base font-medium text-[#202251]">
                End Date
              </label>{" "}
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full p-2.5 sm:p-3 border rounded-lg focus:ring-2 focus:[#202251] focus:outline-none border-gray-300 mt-1"
                min={new Date().toISOString().split("T")[0]}
                required
              />{" "}
            </div>{" "}
          </div>
          <div className="flex flex-col sm:flex-row justify-end gap-3 pt-2">
            {" "}
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-2.5 rounded-md bg-[radial-gradient(circle_at_top,_rgba(0,150,255,0.5)_0%,_#202251_70%)] text-sm sm:text-base font-bold text-white shadow-sm hover:bg-blue-500 transition-colors duration-300 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {" "}
              Submit Report{" "}
            </button>{" "}
            <button
              type="button"
              onClick={() => navigate("/all-reports")}
              className="w-full sm:w-auto px-6 py-2.5 bg-gray-600 text-white rounded-lg text-sm sm:text-base font-bold shadow-md hover:bg-gray-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              {" "}
              Cancel{" "}
            </button>{" "}
          </div>{" "}
        </form>{" "}
      </div>{" "}
    </div>
  );
}
export default SubmitReport;
