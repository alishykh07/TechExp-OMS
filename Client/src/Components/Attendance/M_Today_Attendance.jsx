import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { dailyAttendanceData } from "../../Services/AttendanceService.js";
import Back_Button from "../BackButton/Back_Button.jsx";

function M_Attendance() {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await dailyAttendanceData();
        setAttendanceRecords(res || []);
        setFilteredRecords(res || []);
      } catch {
        toast.error("Failed to load attendance records");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const search = searchTerm.toLowerCase();

    const filtered = attendanceRecords.filter((r) => {
      const name = (r.fullName || r.username || "").toLowerCase();
      const date = new Date(r.date).toLocaleDateString().toLowerCase();
      return name.includes(search) || date.includes(search);
    });

    setFilteredRecords(filtered);
  }, [searchTerm, attendanceRecords]);

  const groupByDate = (data) =>
    data.reduce((acc, item) => {
      const date = new Date(item.date).toLocaleDateString();
      if (!acc[date]) acc[date] = [];
      acc[date].push(item);
      return acc;
    }, {});

  const grouped = groupByDate(filteredRecords);

  const sortedDates = Object.keys(grouped).sort(
    (a, b) => new Date(b) - new Date(a),
  );

  const getStatusClass = (status) => {
    if (status === "Checked In")
      return "bg-green-500/10 text-green-300 border border-green-500/20";
    if (status === "Checked Out")
      return "bg-red-500/10 text-red-300 border border-red-500/20";
    return "bg-gray-500/10 text-gray-300 border border-gray-500/20";
  };

  const formatDateWithDay = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(0,150,255,0.5)_0%,_#202251_70%)] px-4 sm:px-6 md:px-10 py-10 pt-20">
      <Back_Button />

      <div className="max-w-6xl mx-auto text-center pt-10 sm:pt-14 pb-6">
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white">
          Employee Attendance
        </h1>
        <p className="text-gray-300 mt-2 sm:mt-3 text-sm sm:text-base">
          Daily check-in & check-out records
        </p>
      </div>

      <div className="max-w-6xl mx-auto mb-6">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <input
            type="text"
            placeholder="Search by employee name or date..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 sm:px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:[#202251]"
          />
        </div>
      </div>

      <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8">
        {loading ? (
          <p className="text-center text-gray-300">Loading...</p>
        ) : sortedDates.length === 0 ? (
          <p className="text-center text-gray-300 bg-white/10 p-4 rounded-lg">
            No records found
          </p>
        ) : (
          sortedDates.map((date) => (
            <div
              key={date}
              className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg overflow-hidden"
            >
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 px-4 sm:px-5 py-3 border-b border-white/10">
                <h2 className="text-white font-semibold text-sm sm:text-base">
                  📅 {formatDateWithDay(date)}
                </h2>

                <span className="text-xs sm:text-sm text-gray-300">
                  {grouped[date].length} records
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs sm:text-sm">
                  <thead className="bg-[#202251] text-white text-xs uppercase">
                    <tr>
                      <th className="px-3 sm:px-4 py-3 text-left">Employee</th>
                      <th className="px-3 sm:px-4 py-3 text-center">
                        Check In
                      </th>
                      <th className="px-3 sm:px-4 py-3 text-center">
                        Check Out
                      </th>
                      <th className="px-3 sm:px-4 py-3 text-center">Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {grouped[date].map((r) => {
                      const status =
                        r.check_in && !r.check_out
                          ? "Checked In"
                          : r.check_in && r.check_out
                            ? "Checked Out"
                            : "Not Marked";

                      return (
                        <tr
                          key={r._id}
                          className="border-b border-white/5 hover:bg-white/10 transition"
                        >
                          <td className="px-3 sm:px-4 py-3 text-white">
                            {r.fullName || r.username}
                          </td>

                          <td className="px-3 sm:px-4 py-3 text-center text-gray-200">
                            {r.check_in
                              ? new Date(r.check_in).toLocaleTimeString()
                              : "N/A"}
                          </td>

                          <td className="px-3 sm:px-4 py-3 text-center text-gray-200">
                            {r.check_out
                              ? new Date(r.check_out).toLocaleTimeString()
                              : "N/A"}
                          </td>

                          <td className="px-3 sm:px-4 py-3 text-center">
                            <span
                              className={`px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs ${getStatusClass(
                                status,
                              )}`}
                            >
                              {status}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default M_Attendance;
