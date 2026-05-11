import React, { useState } from "react";
import UserIcon from "../../../../Storage/Add_User.jpg";
import { addUser } from "../../Services/AuthService";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Back_Button from "../BackButton/Back_Button";

function Add_User() {
  // const qualificationOptions = [
  //   { value: "", label: "Select Qualification" },
  //   { value: "High School", label: "High School" },
  //   { value: "Diploma", label: "Diploma" },
  //   { value: "Bachelor's Degree", label: "Bachelor's Degree" },
  //   { value: "Master's Degree", label: "Master's Degree" },
  //   { value: "PhD", label: "PhD" },
  //   { value: "Other", label: "Other" },
  // ];

  const departmentOptions = [
    { value: "", label: "Select Department" },
    { value: "Web Developer", label: "Web Developer" },
    { value: "Graphic Designer", label: "Graphic Designer" },
    { value: "Video Editor", label: "Video Editor" },
    { value: "Animator", label: "Animator" },
    { value: "UI/UX Designer", label: "UI/UX Designer" },
    { value: "Sales", label: "Sales" },
    { value: "Marketing", label: "Marketing" },
    { value: "Customer Support", label: "Customer Support" },
    { value: "Project Management", label: "Project Management" },
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

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    dob: "",
    gender: "",
    mobNo: "",
    // qualification: "",
    username: "",
    password: "",
    confirmPassword: "",
    workLocation: "",
    department: "",
    role: "",
    profilePhoto: null,
    resume: null,
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const today = new Date();
  const minDate18 = new Date(
    today.getFullYear() - 18,
    today.getMonth(),
    today.getDate(),
  )
    .toISOString()
    .split("T")[0];

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "dob") {
      const today = new Date();
      const selectedDate = new Date(value);
      const age = today.getFullYear() - selectedDate.getFullYear();

      if (
        age < 18 ||
        (age === 18 &&
          today <
            new Date(selectedDate.setFullYear(selectedDate.getFullYear() + 18)))
      ) {
        setError("User must be at least 18 years old.");
        toast.error("User must be at least 18 years old.");
        return;
      } else {
        setError("");
      }
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loadingToastId = toast.loading(
      "Please wait while we finalize the details...",
    );

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

    if (!passwordRegex.test(formData.password)) {
      setError(
        "Password must contain at least one uppercase letter, one lowercase letter, one digit, and be at least 8 characters long.",
      );
      toast.error("Invalid password format.");
      toast.dismiss(loadingToastId);
      return;
    }

    setError("");
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      toast.error("Passwords don't match");
      toast.dismiss(loadingToastId);
      return;
    }

    if (
      formData?.profilePhoto?.size > 100 * 1024 * 1024 ||
      formData?.resume?.size > 100 * 1024 * 1024
    ) {
      setError("File size too large! Maximum 10MB limit per file.");
      toast.error("File size too large! Maximum 10MB limit per file.");
      toast.dismiss(loadingToastId);
      return;
    }

    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => form.append(key, value));

    try {
      await addUser(form);
      toast.success("User Added Successfully");
      toast.dismiss(loadingToastId);
      navigate("/all-staff");
    } catch (e) {
      setError(e.message);
      toast.error(e.message);
      toast.dismiss(loadingToastId);
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(0,150,255,0.5)_0%,_#202251_70%)] p-4 sm:pt-25 md:p-10 pt-20 md:pt-30">
      <Back_Button />

      <div className="max-w-3xl mx-auto text-center mb-6 md:mb-10">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white drop-shadow-lg animate-fade-in">
          Add New User
        </h1>
        <p className="text-base md:text-lg text-gray-200 mt-2">
          Fill out the details below to register a new user.
        </p>
      </div>

      <div className="flex justify-center mb-6 md:mb-8 pt-4">
        <div className="w-28 h-28 md:w-40 md:h-40 rounded-full border-4 border-white shadow-xl flex items-center justify-center bg-gray-100 transition-transform hover:scale-105">
          <i className="fa-solid fa-user-plus text-3xl sm:text-4xl md:text-5xl text-[#202251]"></i>
        </div>
      </div>

      <section className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl p-5 sm:p-6 md:p-8">
        {error && (
          <p className="text-red-600 font-semibold text-center mb-4">{error}</p>
        )}

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
        >
          <FormField
            label="Full Name"
            name="fullName"
            type="text"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
          <FormField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <FormField
            label="Address"
            name="address"
            type="text"
            value={formData.address}
            onChange={handleChange}
            required
          />
          <FormField
            label="Date of Birth"
            name="dob"
            type="date"
            value={formData.dob}
            onChange={handleChange}
            max={minDate18}
            required
          />
          <FormField
            label="Gender"
            name="gender"
            type="select"
            value={formData.gender}
            onChange={handleChange}
            required
            options={[
              { value: "", label: "Select Gender" },
              { value: "male", label: "Male" },
              { value: "female", label: "Female" },
              { value: "other", label: "Other" },
            ]}
          />
          <FormField
            label="Mobile Number"
            name="mobNo"
            type="text"
            value={formData.mobNo}
            onChange={handleChange}
            required
          />
          {/* <FormField
            label="Qualification"
            name="qualification"
            type="select"
            value={formData.qualification}
            onChange={handleChange}
            required
            options={qualificationOptions}
          /> */}
          <FormField
            label="Username"
            name="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <FormField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <FormField
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <FormField
            label="Work Location"
            name="workLocation"
            type="select"
            value={formData.workLocation}
            onChange={handleChange}
            required
            options={workLocationOptions}
          />
          <FormField
            label="Department"
            name="department"
            type="select"
            value={formData.department}
            onChange={handleChange}
            required
            options={departmentOptions}
          />
          <FormField
            label="Role"
            name="role"
            type="select"
            value={formData.role}
            onChange={handleChange}
            required
            options={[
              { value: "", label: "Select Role" },
              { value: "Employee", label: "Employee" },
              { value: "Manager", label: "Manager" },
            ]}
          />
          <FormField
            label="Profile Photo"
            name="profilePhoto"
            type="file"
            onChange={handleChange}
            accept="image/*"
          />
          <FormField
            label="Resume"
            name="resume"
            type="file"
            onChange={handleChange}
            accept=".pdf,.doc,.docx"
            required
          />

          <div className="md:col-span-2 flex justify-center">
            <button
              type="submit"
              className="w-full max-w-xs py-3 rounded-lg bg-[radial-gradient(circle_at_top,_rgba(0,150,255,0.5)_0%,_#202251_70%)] text-md font-bold text-white shadow-sm hover:bg-blue-500 transition-colors duration-300"
            >
              Add User
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

function FormField({
  label,
  name,
  type,
  value,
  onChange,
  required,
  options,
  accept,
  max,
}) {
  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium text-[#202251] mb-1">{label}</label>

      {type === "select" ? (
        <select
          name={name}
          value={value}
          onChange={onChange}
          className="p-3 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:[#202251]"
          required={required}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          value={type !== "file" ? value : undefined}
          onChange={onChange}
          className="p-3 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:[#202251]"
          required={required}
          accept={accept}
          max={type === "date" ? max : undefined}
        />
      )}
    </div>
  );
}

export default Add_User;
