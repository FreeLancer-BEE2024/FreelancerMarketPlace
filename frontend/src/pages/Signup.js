import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "", // Changed from firstName + lastName to name
    email: "",
    password: "",
    role: "freelancer",
    // Freelancer fields
    workEx: "",
    expertise: "",
    rates: "",
    reviews: [], // Added as per backend model
    projectsCompleted: "",
    // Company fields
    companyName: "",
    desc: "",
    companyWebsite: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const { name, email, password, role } = formData;

    if (!name || !email || !password) {
      alert("Please fill all required fields.");
      return false;
    }

    if (!email.includes("@")) {
      alert("Please enter a valid email address.");
      return false;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return false;
    }

    if (role === "freelancer") {
      const { workEx, expertise, rates, projectsCompleted } = formData;
      if (!workEx || !expertise || !rates || !projectsCompleted) {
        alert("Please complete all freelancer-specific fields.");
        return false;
      }
    }

    if (role === "company") {
      const { companyName, desc, companyWebsite } = formData;
      if (!companyName || !desc || !companyWebsite) {
        alert("Please complete all company-specific fields.");
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    const dataToSend = { ...formData };

    if (formData.role === "freelancer") {
      delete dataToSend.companyName;
      delete dataToSend.desc;
      delete dataToSend.companyWebsite;
    } else {
      delete dataToSend.workEx;
      delete dataToSend.expertise;
      delete dataToSend.rates;
      delete dataToSend.projectsCompleted;
    }

    try {
      const response = await axios.post("http://localhost:3000/signup", dataToSend);
      alert(response.data.message);

      if (response.status === 201) {
        navigate("/login");
      }
    } catch (error) {
      console.error("Error signing up:", error);
      alert(error.response?.data?.message || "Signup failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const renderField = (type, name, placeholder, required = true) => (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      onChange={handleChange}
      value={formData[name]}
      required={required}
      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600">
      <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden max-w-4xl">
        {/* Left Section */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center items-center bg-blue-500 text-white">
          <h1 className="text-3xl font-bold mb-4">Welcome to Freelancer Hub</h1>
          <p className="text-sm text-center">
            Sign up to get started and unlock a world of opportunities tailored just for you.
          </p>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Create Your Account</h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            {renderField("text", "name", "Name")}
            {renderField("email", "email", "Email Address")}
            {renderField("password", "password", "Password")}
            <select
              name="role"
              onChange={handleChange}
              value={formData.role}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="freelancer">Freelancer</option>
              <option value="company">Company</option>
            </select>

            {formData.role === "freelancer" && (
              <div className="space-y-4">
                {renderField("number", "workEx", "Years of Work Experience")}
                {renderField("text", "expertise", "Expertise")}
                {renderField("number", "rates", "Hourly Rate")}
                {renderField("number", "projectsCompleted", "Projects Completed")}
              </div>
            )}

            {formData.role === "company" && (
              <div className="space-y-4">
                {renderField("text", "companyName", "Company Name")}
                <textarea
                  name="desc"
                  placeholder="Brief description about your company"
                  onChange={handleChange}
                  value={formData.desc}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {renderField("url", "companyWebsite", "Company Website")}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-bold py-2 rounded-lg hover:bg-blue-600 focus:outline-none"
              disabled={isLoading}
            >
              {isLoading ? "Signing up..." : "Sign Up"}
            </button>
          </form>
          <p className="text-sm text-center mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login Here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
