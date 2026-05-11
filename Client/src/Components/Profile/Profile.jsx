import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loggedUser, updateUserProfile } from "../../Services/AuthService.js";
import Back_Button from "../BackButton/Back_Button";
import toast from "react-hot-toast";
import Loader from "../Loader/Loader.jsx";

function UserProfile() {
  const qualificationOptions = [
    { value: "", label: "Select Qualification" },
    { value: "High School", label: "High School" },
    { value: "Diploma", label: "Diploma" },
    { value: "Bachelor's Degree", label: "Bachelor's Degree" },
    { value: "Master's Degree", label: "Master's Degree" },
    { value: "PhD", label: "PhD" },
    { value: "Other", label: "Other" },
  ];

  const departmentOptions = [
    { value: "", label: "Select Department" },
    { value: "Human Resources", label: "Human Resources" },
    { value: "Finance", label: "Finance" },
    { value: "Information Technology", label: "Information Technology" },
    { value: "Marketing", label: "Marketing" },
    { value: "Sales", label: "Sales" },
    { value: "Operations", label: "Operations" },
    { value: "Customer Support", label: "Customer Support" },
    { value: "Research and Development", label: "Research and Development" },
    { value: "Legal", label: "Legal" },
    { value: "Administration", label: "Administration" },
  ];

  const workLocationOptions = [
    { value: "", label: "Select Work Location" },
    { value: "Office", label: "Office" },
    { value: "Remote", label: "Remote" },
    { value: "Hybrid", label: "Hybrid" },
    { value: "On-Site", label: "On-Site" },
    { value: "Client Location", label: "Client Location" },
  ];

  const [loggedIn, setLoggedIn] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLoggedInUser = async () => {
      try {
        const user = await loggedUser();
        setLoggedIn(user);
      } catch (e) {
        console.log(e.message);
        toast.error("Failed to load user profile.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchLoggedInUser();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setLoggedIn((prevUser) => ({
      ...prevUser,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      for (const key in loggedIn) {
        if (loggedIn[key] !== null && loggedIn[key] !== undefined) {
          formData.append(key, loggedIn[key]);
        }
      }
      const response = await updateUserProfile(loggedIn._id, formData);
      setLoggedIn(response);
      setIsEditing(false);
      toast.success("Profile updated successfully!");
      navigate(0);
    } catch (error) {
      console.error("Error updating profile:", error.message);
      toast.error("Failed to update profile. Please try again.");
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
          {isEditing ? "Edit Profile" : "User Profile"}
        </h1>
      </div>

      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-2xl p-4 sm:p-6 md:p-8">
        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[#202251]">
                  Profile Photo
                </label>
                <input
                  type="file"
                  name="profilePhoto"
                  onChange={handleInputChange}
                  className="w-full p-2 sm:p-3 border rounded-lg focus:ring-2 focus:[#202251] focus:outline-none border-gray-300 mt-1 text-[#202251]"
                  accept="image/*"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#202251]">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={loggedIn.fullName || ""}
                  onChange={handleInputChange}
                  className="w-full p-2 sm:p-3 border rounded-lg focus:ring-2 focus:[#202251] focus:outline-none border-gray-300 mt-1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#202251]">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={loggedIn.email || ""}
                  onChange={handleInputChange}
                  className="w-full p-2 sm:p-3 border rounded-lg focus:ring-2 focus:[#202251] focus:outline-none border-gray-300 mt-1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#202251]">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={loggedIn.address || ""}
                  onChange={handleInputChange}
                  className="w-full p-2 sm:p-3 border rounded-lg focus:ring-2 focus:[#202251] focus:outline-none border-gray-300 mt-1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#202251]">
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dob"
                  value={
                    loggedIn.dob
                      ? new Date(loggedIn.dob).toISOString().split("T")[0]
                      : ""
                  }
                  onChange={handleInputChange}
                  className="w-full p-2 sm:p-3 border rounded-lg focus:ring-2 focus:[#202251] focus:outline-none border-gray-300 mt-1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#202251]">
                  Gender
                </label>
                <select
                  name="gender"
                  value={loggedIn.gender || ""}
                  onChange={handleInputChange}
                  className="w-full p-2 sm:p-3 border rounded-lg focus:ring-2 focus:[#202251] focus:outline-none border-gray-300 mt-1"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#202251]">
                  Mobile Number
                </label>
                <input
                  type="text"
                  name="mobNo"
                  value={loggedIn.mobNo || ""}
                  onChange={handleInputChange}
                  className="w-full p-2 sm:p-3 border rounded-lg focus:ring-2 focus:[#202251] focus:outline-none border-gray-300 mt-1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#202251]">
                  Qualification
                </label>
                <select
                  name="qualification"
                  value={loggedIn.qualification || ""}
                  onChange={handleInputChange}
                  className="w-full p-2 sm:p-3 border rounded-lg focus:ring-2 focus:[#202251] focus:outline-none border-gray-300 mt-1"
                >
                  {qualificationOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#202251]">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={loggedIn.username || ""}
                  onChange={handleInputChange}
                  className="w-full p-2 sm:p-3 border rounded-lg focus:ring-2 focus:[#202251] focus:outline-none border-gray-300 mt-1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#202251]">
                  Department
                </label>
                <select
                  name="department"
                  value={loggedIn.department || ""}
                  onChange={handleInputChange}
                  className="w-full p-2 sm:p-3 border rounded-lg focus:ring-2 focus:[#202251] focus:outline-none border-gray-300 mt-1"
                >
                  {departmentOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#202251]">
                  Work Location
                </label>
                <select
                  name="workLocation"
                  value={loggedIn.workLocation || ""}
                  onChange={handleInputChange}
                  className="w-full p-2 sm:p-3 border rounded-lg focus:ring-2 focus:[#202251] focus:outline-none border-gray-300 mt-1"
                >
                  {workLocationOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[#202251]">
                  Resume
                </label>
                <input
                  type="file"
                  name="resume"
                  onChange={handleInputChange}
                  className="w-full p-2 sm:p-3 border rounded-lg focus:ring-2 focus:[#202251] focus:outline-none border-gray-300 mt-1 text-[#202251]"
                  accept=".pdf,.doc,.docx"
                />
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
                <button
                  type="submit"
                  className="px-6 py-2 rounded-lg bg-[radial-gradient(circle_at_top,_rgba(139,191,77,0.5)_0%,_#4f7a2d_70%)] text-sm sm:text-base font-bold text-white shadow-sm hover:bg-[#73a240] transition-colors duration-300 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#73a240]"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-6 py-2 bg-gray-600 text-sm sm:text-base font-bold text-white rounded-lg shadow-md hover:bg-[#202251] transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-center">
              <img
                src={
                  loggedIn.profilePhoto
                    ? `${loggedIn.profilePhoto}`
                    : "https://www.pngmart.com/files/23/Profile-PNG-Photo.png"
                }
                alt="Profile Photo"
                className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-[#73e42080] hover:border-[#a1e033] shadow-md transition-transform hover:scale-105 duration-300"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm sm:text-base">
              {Object.keys(loggedIn).map(
                (key) =>
                  key !== "_id" &&
                  key !== "password" &&
                  key !== "profilePhoto" &&
                  key !== "__v" && (
                    <div key={key} className="flex justify-between">
                      <span className="font-semibold text-[#202251] capitalize">
                        {key
                          .replace(/([A-Z])|_/g, (match, p1) =>
                            p1 ? ` ${p1}` : " ",
                          )
                          .trim()}
                        :
                      </span>
                      {key === "resume" ? (
                        <a
                          href={`${loggedIn[key]}`}
                          className="text-[#72e420] hover:text-[#73a420]"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View Resume
                        </a>
                      ) : (
                        <span className="text-gray-600">
                          {key === "createdAt" ||
                          key === "updatedAt" ||
                          key === "last_payemnt_date"
                            ? new Date(loggedIn[key]).toLocaleDateString()
                            : loggedIn[key]}
                        </span>
                      )}
                    </div>
                  ),
              )}
            </div>

            <div className="flex justify-center">
              <button
                onClick={() => setIsEditing(true)}
                className="px-6 py-2 rounded-lg bg-[radial-gradient(circle_at_top,_rgba(0,150,255,0.5)_0%,_#202251_70%)] text-sm sm:text-base font-bold text-white shadow-sm hover:bg-blue-500 transition-colors duration-300 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Edit Profile
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserProfile;
