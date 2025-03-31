import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const FreelancerDashboard = () => {
  const [works, setWorks] = useState([]);
  const [filteredWorks, setFilteredWorks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllWorks();
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    try {
      const response = await axios.get("http://localhost:3000/freelancer/profile", {
        withCredentials: true,
      });
      setUserName(response.data.name);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const fetchAllWorks = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3000/freelancers/works", { // Changed from freelancer to freelancers
        withCredentials: true,
      });
      console.log("Works response:", response.data); // Add this for debugging
      if (Array.isArray(response.data)) {
        setWorks(response.data);
        setFilteredWorks(response.data);
      } else {
        console.error("Invalid response format:", response.data);
        setWorks([]);
        setFilteredWorks([]);
      }
    } catch (error) {
      console.error("Error fetching works:", error.response?.data || error.message);
      setWorks([]);
      setFilteredWorks([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (searchTerm) => {
    const filtered = works.filter(work => 
      work.requirements.some(req => 
        req.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredWorks(filtered);
  };

  const handleFilter = (filterType) => {
    let sorted = [...filteredWorks];
    switch (filterType) {
      case 'budget_asc':
        sorted.sort((a, b) => a.budget - b.budget);
        break;
      case 'budget_desc':
        sorted.sort((a, b) => b.budget - a.budget);
        break;
      case 'duration':
        sorted.sort((a, b) => a.duration.localeCompare(b.duration));
        break;
      default:
        sorted = [...works];
    }
    setFilteredWorks(sorted);
  };

  const handleAcceptWork = async (workId, counter = null) => {
    try {
      // Validate workId
      if (!workId) {
        console.error("Invalid workId:", workId);
        alert("Invalid work ID");
        return;
      }

      // Validate counter offer if present
      if (counter !== null && (isNaN(counter) || counter <= 0)) {
        alert("Please enter a valid counter offer amount");
        return;
      }

      console.log("Sending request with:", { workId, counter }); // Debug log

      const response = await axios.post(
        `http://localhost:3000/freelancers/${workId}/accept`,
        { counter },
        { withCredentials: true }
      );

      if (response.status === 200 || response.status === 201) {
        alert(response.data || 'Work accepted successfully!');
        fetchAllWorks();
      }
    } catch (error) {
      console.error("Error accepting work:", error);
      const errorMessage = error.response?.data || "Error accepting work. Please try again.";
      alert(errorMessage);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-600 text-white py-4 mb-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold">FreelancerHub</Link>
            
            <div className="flex items-center space-x-4">
              <input
                type="text"
                placeholder="Search by skills..."
                className="px-4 py-2 rounded text-black w-64"
                onChange={(e) => handleSearch(e.target.value)}
              />
              <select
                onChange={(e) => handleFilter(e.target.value)}
                className="px-4 py-2 rounded text-black"
              >
                <option value="">All Works</option>
                <option value="budget_asc">Price: Low to High</option>
                <option value="budget_desc">Price: High to Low</option>
                <option value="duration">By Duration</option>
              </select>
            </div>

            <div className="flex items-center space-x-4">
              <span>Welcome, {userName}</span>
              <button 
                onClick={() => window.location.href = '/logout'}
                className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Available Works</h1>

        {loading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWorks.map((work) => (
              <div key={work.id} className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-2">{work.title}</h2>
                <p className="text-gray-600 mb-4">{work.description}</p>
                
                <div className="mb-4">
                  <p className="font-semibold">Budget: ₹{work.budget}</p>
                  <p>Posted by: {work.workBy}</p>
                  <p>Duration: {work.duration}</p>
                </div>

                <div className="mb-4">
                  <p className="font-semibold mb-2">Requirements:</p>
                  <div className="flex flex-wrap gap-2">
                    {work.requirements.map((req, index) => (
                      <span 
                        key={index}
                        className="bg-gray-100 px-2 py-1 rounded text-sm"
                      >
                        {req}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between">
                  <button
                    className={`px-4 py-2 rounded ${
                      work.isAccepted 
                        ? 'bg-gray-300'
                        : 'bg-blue-500 hover:bg-blue-600 text-white'
                    }`}
                    onClick={() => handleAcceptWork(work.id)}
                    disabled={work.isAccepted}
                  >
                    {work.isAccepted ? 'Accepted' : 'Accept Work'}
                  </button>

                  {work.isNegotiable && !work.isAccepted && (
                    <button
                      className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                      onClick={() => {
                        const amount = window.prompt('Enter your counter offer amount:');
                        if (amount) {
                          const numericAmount = parseFloat(amount);
                          if (!isNaN(numericAmount) && numericAmount > 0) {
                            console.log("Making counter offer for work:", work.id); // Debug log
                            handleAcceptWork(work.id, numericAmount);
                          } else {
                            alert('Please enter a valid amount');
                          }
                        }
                      }}
                    >
                      Make Counter Offer
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FreelancerDashboard;
