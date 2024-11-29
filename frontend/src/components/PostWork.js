import React, { useState } from "react";
import axios from "axios";

const PostWork = () => {
  const [work, setWork] = useState({
    title: "",
    description: "",
    requirements: [],
    duration: "",
    budget: "",
    isNegotiable: false,
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setWork({
      ...work,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleRequirementsChange = (e) => {
    const { value } = e.target;
    setWork((prevWork) => ({
      ...prevWork,
      requirements: value.split(",").map((req) => req.trim()),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/works",  // Your backend URL
        work,  // The data you're sending
        {
          withCredentials: true,  // Ensures cookies are sent with the request
        }
      );
      alert(response.data.message);  // Show success message
      setWork({
        title: "",
        description: "",
        requirements: [],
        duration: "",
        budget: "",
        isNegotiable: false,
      });  // Clear the form after successful submission
    } catch (error) {
      setError(error.response ? error.response.data.message : "Error posting work");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">Post New Work</h2>
      {error && <div className="mb-4 text-red-500">{error}</div>}

      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium text-gray-600">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Title"
          value={work.title}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium text-gray-600">Description</label>
        <textarea
          name="description"
          id="description"
          placeholder="Description"
          value={work.description}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="requirements" className="block text-sm font-medium text-gray-600">Requirements (comma separated)</label>
        <input
          type="text"
          name="requirements"
          id="requirements"
          placeholder="e.g. React, Node.js, etc."
          value={work.requirements.join(", ")}
          onChange={handleRequirementsChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="duration" className="block text-sm font-medium text-gray-600">Duration</label>
        <input
          type="text"
          name="duration"
          id="duration"
          placeholder="Duration"
          value={work.duration}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="budget" className="block text-sm font-medium text-gray-600">Budget</label>
        <input
          type="number"
          name="budget"
          id="budget"
          placeholder="Budget"
          value={work.budget}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="negotiation" className="block text-sm font-medium text-gray-600">Negotiation Allowed</label>
        <input
          type="checkbox"
          name="isNegotiable"
          id="negotiation"
          checked={work.isNegotiable}
          onChange={handleChange}
          className="w-4 h-4 text-blue-500 focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button 
        type="submit" 
        className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-200"
      >
        Post Work
      </button>
    </form>
  );
};

export default PostWork;
