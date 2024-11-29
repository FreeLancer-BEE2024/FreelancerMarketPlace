import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import './Signup.css';

const Signup = () => {
  const navigate = useNavigate(); // Initialize navigate
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "freelancer",
    workEx: "",
    expertise: "",
    availability: "",
    rates: "",
    projectsCompleted: "",
    companyName: "",
    desc: "",
    companyWebsite: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a copy of formData to avoid mutating state directly
    const dataToSend = { ...formData };

    // If the role is freelancer, remove company-related fields
    if (formData.role === "freelancer") {
      delete dataToSend.companyName;
      delete dataToSend.desc;
      delete dataToSend.companyWebsite;
    }

    // If the role is company, remove freelancer-related fields
    if (formData.role === "company") {
      delete dataToSend.workEx;
      delete dataToSend.expertise;
      delete dataToSend.availability;
      delete dataToSend.rates;
      delete dataToSend.projectsCompleted;
    }

    try {
      const response = await axios.post("http://localhost:3000/signup", dataToSend);
      alert(response.data.message);

      // Redirect to login page on successful signup
      if (response.status === 201) {
        navigate("/login");
      }
    } catch (error) {
      console.error("Error signing up:", error);
      alert("Signup failed. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Signup</h2>
      <input
        type="text"
        name="firstName"
        placeholder="First Name"
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="lastName"
        placeholder="Last Name"
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
        required
      />

      <select name="role" onChange={handleChange} required>
        <option value="freelancer">Freelancer</option>
        <option value="company">Company</option>
      </select>

      {formData.role === "freelancer" && (
        <>
          <input
            type="number"
            name="workEx"
            placeholder="Work Experience"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="expertise"
            placeholder="Expertise (comma-separated)"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="availability"
            placeholder="Availability"
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="rates"
            placeholder="Rates"
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="projectsCompleted"
            placeholder="Projects Completed"
            onChange={handleChange}
            required
          />
        </>
      )}

      {formData.role === "company" && (
        <>
          <input
            type="text"
            name="companyName"
            placeholder="Company Name"
            onChange={handleChange}
            required
          />
          <textarea
            name="desc"
            placeholder="Company Description"
            onChange={handleChange}
            required
          />
          <input
            type="url"
            name="companyWebsite"
            placeholder="Company Website"
            onChange={handleChange}
            required
          />
        </>
      )}

      <button type="submit">Signup</button>
    </form>
  );
};

export default Signup;

