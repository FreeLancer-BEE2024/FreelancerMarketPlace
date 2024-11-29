

import React, { useState, useEffect } from "react";
import axios from "axios";
import PostWork from "./PostWork";
import WorkList from "./WorkList";
import AcceptedWorksList from "./AcceptedWorkList";

const CompanyDashboard = () => {
  const [myWorks, setMyWorks] = useState([]);
  const [acceptedWorks, setAcceptedWorks] = useState([]);
  const [loadingAcceptedWorks, setLoadingAcceptedWorks] = useState(false);
  const [error, setError] = useState(null);  
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(true);  
  const [showPostWork, setShowPostWork] = useState(false);  
  const [showMyWorks, setShowMyWorks] = useState(false);  
  const [showCounterWorks, setShowCounterWorks] = useState(false);  
  const [companyName, setCompanyName] = useState("Company Name");  

  useEffect(() => {
    fetchMyWorks();
  }, []);

  const fetchMyWorks = async () => {
    try {
      const response = await axios.get("http://localhost:3000/company/works", {
        withCredentials: true,  
      });
      setMyWorks(response.data);
    } catch (error) {
      console.error(error.response?.data || error.message);
      setError(error.response ? error.response.data : error.message);
    }
  };

  const fetchAcceptedWorks = async (workId) => {
    setLoadingAcceptedWorks(true);
    try {
      const response = await axios.get(`http://localhost:3000/company/${workId}/counterworks`, {
        withCredentials: true,  
      });
      setAcceptedWorks(response.data);
    } catch (error) {
      console.error(error.response?.data || error.message);
      setError(error.response ? error.response.data : error.message);  
    } finally {
      setLoadingAcceptedWorks(false);
    }
  };

  const handlePostWorkClick = () => {
    setShowWelcomeMessage(false);
    setShowPostWork(true);
    setShowMyWorks(false);
    setShowCounterWorks(false);
  };

  const handleViewMyWorksClick = () => {
    setShowWelcomeMessage(false);
    setShowPostWork(false);
    setShowMyWorks(true);
    setShowCounterWorks(false);
  };

  const handleMyCounterWorksClick = () => {
    setShowWelcomeMessage(false);
    setShowPostWork(false);
    setShowMyWorks(false);
    setShowCounterWorks(true);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1506748686219-bb0a6f8d5f8e)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Navbar */}
      <nav className="bg-blue-600 p-4 fixed top-0 left-0 w-full z-50">
        <div className="flex justify-between items-center">
          <img
            src="/path-to-your-logo.png" // Replace with your logo path
            alt="Logo"
            className="h-8 w-auto"
          />
          <div className="flex space-x-6 text-white">
            <a
              href="#postWork"
              className="hover:text-blue-300"
              onClick={handlePostWorkClick} 
            >
              Post Work
            </a>
            <a
              href="#viewMyWorks"
              className="hover:text-blue-300"
              onClick={handleViewMyWorksClick} 
            >
              View My Works
            </a>
            <a
              href="#myCounterWorks"
              className="hover:text-blue-300"
              onClick={handleMyCounterWorksClick} 
            >
              My Counter Works
            </a>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-16">
        {/* Welcome Message */}
        {showWelcomeMessage && (
          <div className="text-center mt-6" style={{ color: 'white', fontSize: '24px', zIndex: 10 }}>
            <h2 className="font-semibold">Welcome, {companyName}!</h2>
            <p className="mt-4">Choose an option from the menu to get started.</p>
          </div>
        )}

        {/* Error Message */}
        {error && <div className="text-red-500 text-center mb-4">{String(error)}</div>}

        {/* Conditionally render PostWork component */}
        {showPostWork && (
          <div id="postWork">
            <PostWork onWorkPosted={fetchMyWorks} />
          </div>
        )}

        {/* Conditionally render View My Works */}
        {showMyWorks && (
          <div id="viewMyWorks" className="mt-6">
            <h3 className="text-xl font-bold text-white mb-4">My Posted Works</h3>
            <WorkList
              works={myWorks}
              onViewCounterWorks={fetchAcceptedWorks}  
            />
          </div>
        )}

        {/* Conditionally render My Counter Works */}
        {showCounterWorks && (
          <div id="myCounterWorks" className="mt-6">
            {loadingAcceptedWorks ? (
              <p className="text-white">Loading Accepted Works...</p>
            ) : (
              <>
                <h3 className="text-xl font-bold text-white mb-4">Accepted/Countered Works</h3>
                {acceptedWorks.length > 0 ? (
                  <AcceptedWorksList works={acceptedWorks} />
                ) : (
                  <p className="text-white">No accepted or countered works yet.</p>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyDashboard;
