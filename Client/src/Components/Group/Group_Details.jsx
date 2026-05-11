import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchGroupById,
  deleteGroup,
  updateGroup,
} from "../../Services/GroupService.js";
import { loggedUser } from "../../Services/AuthService.js";
import Back_Button from "../BackButton/Back_Button";
import toast from "react-hot-toast";
import DeleteConfirmationAlert from "../ConfirmetionAlerts/DeleteConfermetionAlert";

function GroupDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [group, setGroup] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedGroup, setUpdatedGroup] = useState({
    groupName: "",
    description: "",
    groupType: "",
    groupStatus: "",
  });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [closingDelete, setClosingDelete] = useState(false);

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
    const fetchGroup = async () => {
      try {
        const response = await fetchGroupById(id);
        setGroup(response.group);
        setUpdatedGroup({
          groupName: response.group.groupName,
          description: response.group.description,
          groupType: response.group.groupType,
          groupStatus: response.group.groupStatus,
        });
      } catch (err) {
        console.log(err);
        toast.error(err.message);
      }
    };
    fetchGroup();
  }, [id]);

  const handleDeleteClick = () => {
    setDeleteId(id);
    setShowDeleteConfirm(true);
    setClosingDelete(false);
  };

  const handleDeleteConfirm = async () => {
    setLoading(true);
    try {
      await deleteGroup(deleteId);
      toast.success("Group deleted successfully!");
      navigate("/show-group");
    } catch (err) {
      console.error("Error deleting group:", err);
      toast.error("Failed to delete group. Please try again.");
    } finally {
      setLoading(false);
      setShowDeleteConfirm(false);
      setClosingDelete(false);
      setDeleteId(null);
    }
  };

  const handleEdit = () => setIsEditing(true);

  const handleCancel = () => {
    setIsEditing(false);
    setUpdatedGroup({
      groupName: group.groupName,
      description: group.description,
      groupType: group.groupType,
      groupStatus: group.groupStatus,
    });
  };

  const handleSave = async () => {
    try {
      await updateGroup(id, updatedGroup);
      setGroup((prev) => ({ ...prev, ...updatedGroup }));
      setIsEditing(false);
      toast.success("Group updated successfully!");
    } catch (err) {
      console.error("Error updating group:", err);
      toast.error("Failed to update group. Please try again.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedGroup((prev) => ({ ...prev, [name]: value }));
  };

  if (!group) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-blue-600 to-indigo-500 p-6 flex justify-center items-center">
        <p className="text-white text-lg font-semibold">Group not found!</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(0,150,255,0.5)_0%,_#202251_70%)] px-4 sm:px-6 lg:px-10 pt-20 pb-10">
      <Back_Button />

      <div className="max-w-3xl mx-auto text-center pt-10 sm:pt-16 pb-6 sm:pb-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white drop-shadow-lg animate-fade-in">
          Group Details
        </h1>
      </div>

      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl p-4 sm:p-6 md:p-8">
        {isEditing ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#202251]">
                Group Name
              </label>
              <input
                type="text"
                name="groupName"
                value={updatedGroup.groupName}
                onChange={handleInputChange}
                className="w-full p-2 sm:p-3 text-sm sm:text-base border rounded-lg focus:ring-2 focus:[#202251] focus:outline-none border-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#202251]">
                Description
              </label>
              <textarea
                name="description"
                value={updatedGroup.description}
                onChange={handleInputChange}
                className="w-full p-2 sm:p-3 text-sm sm:text-base border rounded-lg focus:ring-2 focus:[#202251] focus:outline-none border-gray-300 h-24 resize-y"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#202251]">
                Group Type
              </label>
              <select
                name="groupType"
                value={updatedGroup.groupType}
                onChange={handleInputChange}
                className="w-full p-2 sm:p-3 text-sm sm:text-base border rounded-lg focus:ring-2 focus:[#202251] focus:outline-none border-gray-300"
              >
                <option value="public">Public</option>
                <option value="private">Private</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#202251]">
                Group Status
              </label>
              <select
                name="groupStatus"
                value={updatedGroup.groupStatus}
                onChange={handleInputChange}
                className="w-full p-2 sm:p-3 text-sm sm:text-base border rounded-lg focus:ring-2 focus:[#202251] focus:outline-none border-gray-300"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        ) : (
          <div className="space-y-3 sm:space-y-4 text-center sm:text-left">
            <div>
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-[#202251] break-words">
                <span className="font-bold">Group Name:</span> {group.groupName}
              </h2>
            </div>
            <p className="text-sm sm:text-base text-gray-600">
              <span className="font-bold">Description:</span>{" "}
              {group.description}
            </p>
            <p className="text-sm sm:text-base text-gray-600">
              <span className="font-bold">Group Type:</span>{" "}
              <span
                className={`px-2 py-1 rounded-md text-white text-xs sm:text-sm ${group.groupType === "public" ? "bg-blue-500" : "bg-green-500"}`}
              >
                {group.groupType}
              </span>
            </p>
            <p className="text-sm sm:text-base text-gray-600">
              <span className="font-bold">Group Status:</span>{" "}
              <span
                className={`px-2 py-1 rounded-md text-white text-xs sm:text-sm ${group.groupStatus === "active" ? "bg-green-500" : "bg-red-500"}`}
              >
                {group.groupStatus}
              </span>
            </p>
            <p className="text-sm sm:text-base text-gray-600 break-words">
              <span className="font-bold">Created By:</span> {group.createdBy}
            </p>
            <p className="text-sm sm:text-base text-gray-600">
              <span className="font-bold">Created At:</span>{" "}
              {new Date(group.createdAt).toLocaleString()}
            </p>
            {group.createdAt !== group.updatedAt && (
              <p className="text-sm sm:text-base text-gray-600">
                <span className="font-bold">Updated At:</span>{" "}
                {new Date(group.updatedAt).toLocaleString()}
              </p>
            )}
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-[#202251] mt-4">
                Members:
              </h3>
              <ul className="mt-2 space-y-1 text-sm sm:text-base text-gray-600">
                {group.members.map((member, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-2 justify-center sm:justify-start"
                  >
                    <span className="w-2 h-2 bg-[#202251] rounded-full"></span>
                    {member}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mt-6 sm:mt-8">
        {!isEditing && (
          <button
            onClick={() => navigate("/show-group")}
            className="w-full sm:w-auto px-6 py-2 rounded-lg bg-[radial-gradient(circle_at_top,_rgba(139,191,77,0.5)_0%,_#4f7a2d_70%)] text-sm sm:text-base font-bold text-white shadow-sm hover:bg-[#73a240] transition-colors duration-300 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#73a240]"
          >
            Back to Groups
          </button>
        )}
        {loggedIn?.role === "Manager" && (
          <>
            {!isEditing ? (
              <>
                <button
                  onClick={handleDeleteClick}
                  className="px-6 py-2 bg-red-600 text-white text-sm sm:text-base font-bold rounded-lg shadow-md hover:bg-red-700 transition-all duration-300 w-full sm:w-auto"
                  disabled={loading}
                >
                  {loading ? "Deleting..." : "Delete Group"}
                </button>
                <button
                  onClick={handleEdit}
                  className="w-full sm:w-auto px-6 py-2 bg-[radial-gradient(circle_at_top,_rgba(139,191,77,0.5)_0%,_#4f7a2d_70%)] text-sm sm:text-base font-bold text-white shadow-sm hover:bg-[#73a240] transition-colors duration-300 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#73a240] rounded-lg"
                >
                  Update Group
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleSave}
                  className="px-6 py-2 bg-[radial-gradient(circle_at_top,_rgba(139,191,77,0.5)_0%,_#4f7a2d_70%)] text-sm sm:text-base font-bold text-white shadow-sm hover:bg-[#73a240] transition-colors duration-300 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#73a240] rounded-lg text-white rounded-lg shadow-md hover:bg-green-700 transition-all duration-300 w-full sm:w-auto"
                >
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="px-6 py-2 bg-gray-600 text-white text-sm sm:text-base font-bold rounded-lg shadow-md hover:bg-gray-700 transition-all duration-300 w-full sm:w-auto"
                >
                  Cancel
                </button>
              </>
            )}
          </>
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
    </div>
  );
}

export default GroupDetails;
