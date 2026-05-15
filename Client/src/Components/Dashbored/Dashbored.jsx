import React, { useEffect, useState } from "react";
import {
  FaUsers,
  FaClipboardList,
  FaTasks,
  FaUserPlus,
  FaFileAlt,
  FaExclamationCircle,
  FaProjectDiagram,
} from "react-icons/fa";
import { allStaff, newAddedUsers } from "../../Services/AuthService.js";
import {
  allReports,
  newlyReports,
  pendingApprovalReports,
} from "../../Services/ReportService.js";
import {
  fetchallTasks,
  fetchComplatedProject,
} from "../../Services/WorkService.js";
import { formatDistanceToNow } from "date-fns";
import toast from "react-hot-toast";
import { pastAttendanceData } from "../../Services/AttendanceService.js";
import Loader from "../Loader/Loader.jsx";
import LOGO from "../../../../Storage/LOGO1.svg";

function AdminDashboard() {
  const username = localStorage.getItem("username");
  const [users, setUsers] = useState([]);
  const [reports, setReports] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [newUsers, setNewUsers] = useState([]);
  const [newReports, setNewReports] = useState([]);
  const [pendingApprovReports, setPendingApprovReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          usersRes,
          reportsRes,
          tasksRes,
          projectsRes,
          newUsersRes,
          newReportsRes,
          pendingReportsRes,
        ] = await Promise.all([
          allStaff(),
          allReports(),
          fetchallTasks(),
          fetchComplatedProject(),
          newAddedUsers(),
          newlyReports(),
          pendingApprovalReports(),
        ]);

        await new Promise((resolve) => setTimeout(resolve, 3000));

        setUsers(usersRes.employees);
        setReports(reportsRes.reports);
        setTasks(tasksRes.tasks);
        setProjects(projectsRes.projects);
        setNewUsers(newUsersRes.users);
        setNewReports(newReportsRes);
        setPendingApprovReports(pendingReportsRes);
      } catch (e) {
        console.log(e.message);
        toast.error(e.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();

  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6 px-4 sm:px-6 md:px-10 py-6">
      <div className="max-w-6xl mx-auto mb-6 sm:mb-8">
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#202251] text-center sm:text-left">
            Welcome, Manager {username || "Guest"}
          </h1>

          <a href="/">
            <img
              src={LOGO}
              className="w-24 sm:w-32 md:w-40 rounded-full transition-transform hover:scale-105"
              alt="Logo"
            />
          </a>
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <DashboardCard
          title="Total Users"
          value={users?.length || 0}
          icon={<FaUsers className="text-gray-200" />}
          gradient="from-blue-300 to-[#202251]"
        />
        <DashboardCard
          title="Total Reports"
          value={reports?.length || 0}
          icon={<FaClipboardList className="text-gray-200" />}
          gradient="from-blue-300 to-[#202251]"
        />
        <DashboardCard
          title="Total Tasks"
          value={tasks?.length || 0}
          icon={<FaTasks className="text-gray-200" />}
          gradient="from-blue-300 to-[#202251]"
        />
        <DashboardCard
          title="Successful Projects"
          value={projects?.length || 0}
          icon={<FaProjectDiagram className="text-gray-200" />}
          gradient="from-blue-300 to-[#202251]"
        />
      </div>
    <div className="max-w-6xl mx-auto mb-6 sm:mb-8">
      <div className="mmax-w-6xl mx-auto bg-white p-4 sm:p-6 rounded-xl shadow-lg mb-6 sm:mb-8">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[#202251] mb-4">
          Recent Activity
        </h2>
        {newReports?.length > 0 || newUsers?.length > 0 ? (
          <div className="space-y-2 sm:space-y-3">
            {newReports?.map((report, idx) => (
              <ActivityItem
                key={idx}
                text={`User ${report.submitedBy} added a new report: ${report.title}`}
                time={`${formatDistanceToNow(new Date(report.createdAt))} ago`}
              />
            ))}
            {newUsers?.map((user, idx) => (
              <ActivityItem
                key={idx}
                text={`New user registered: ${user.username}`}
                time={`${formatDistanceToNow(new Date(user.createdAt))} ago`}
              />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 py-4">
            No Recent Activity
          </div>
        )}
      </div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <DashboardCard
          title="New Users"
          value={newUsers?.length || 0}
          icon={<FaUserPlus className="text-gray-200" />}
          gradient="from-blue-300 to-[#202251]"
        />
        <DashboardCard
          title="New Reports"
          value={newReports?.length || 0}
          icon={<FaFileAlt className="text-gray-200" />}
          gradient="from-blue-300 to-[#202251]"
        />
        <DashboardCard
          title="Pending Approvals"
          value={pendingApprovReports?.length || 0}
          icon={<FaExclamationCircle className="text-gray-200" />}
          gradient="from-blue-300 to-[#202251]"
        />
      </div>
    </div>
  );
}

function DashboardCard({ title, value, icon, gradient }) {
  return (
    <div
      className={`bg-gradient-to-br ${gradient} p-4 sm:p-6 rounded-xl shadow-md flex items-center justify-between transition-transform duration-300 hover:scale-105 hover:shadow-lg`}
    >
      <div>
        <h3 className="text-sm sm:text-base font-semibold text-gray-800 mb-1">
          {title}
        </h3>
        <p className="text-2xl sm:text-3xl font-bold text-[#202251]">{value}</p>
      </div>
      <div className="text-2xl sm:text-3xl opacity-70">{icon}</div>
    </div>
  );
}

function ActivityItem({ text, time }) {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 p-3 border-b border-gray-100">
      <p className="text-gray-600 text-xs sm:text-sm break-words">{text}</p>
      <span className="text-gray-500 text-xs">{time}</span>
    </div>
  );
}

export default AdminDashboard;
