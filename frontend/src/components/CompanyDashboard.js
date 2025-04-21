import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PostWork from './PostWork';
import WorkList from './WorkList';
import AcceptedWork from './AcceptedWorkList';

const CompanyDashboard = () => {
  const [works, setWorks] = useState([]);
  const [acceptedWorks, setAcceptedWorks] = useState([]);
  const [counterOffers, setCounterOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState({
    name: '',
    companyDetails: {
      companyName: '',
      desc: '',
      companyWebsite: ''
    }
  });
  const [stats, setStats] = useState({
    totalAccepted: 0,
    totalPending: 0,
    total: 0
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchMyWorks();
    fetchCounterOffers();
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    try {
      const response = await axios.get('http://localhost:3000/company/profile', {
        withCredentials: true,
      });
      // Update entire user profile including company details
      setUserProfile(response.data);
    } catch (error) {
      console.error('Error fetching user details:', error);
      if (error.response?.status === 401) {
        navigate('/login');
      }
    }
  };

  const fetchMyWorks = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:3000/company/works', {
        withCredentials: true,
      });
      setWorks(response.data);
    } catch (error) {
      console.error('Error fetching works:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCounterOffers = async () => {
    try {
      const response = await axios.get(
        'http://localhost:3000/company/counterworks',
        {
          withCredentials: true,
        }
      );
      
      console.log('Work responses:', response.data);
      
      if (response.data) {
        setAcceptedWorks(response.data.acceptedWorks || []);
        setCounterOffers(response.data.counterOffers || []);
        setStats(response.data.stats || {
          totalAccepted: 0,
          totalPending: 0,
          total: 0
        });
      }
    } catch (error) {
      console.error('Error fetching work responses:', error);
      setAcceptedWorks([]);
      setCounterOffers([]);
    }
  };

  const handleAcceptCounter = async (workId) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/company/counter/${workId}/response`,
        { status: 'accepted' },
        { withCredentials: true }
      );

      if (response.status === 200) {
        alert('Counter offer accepted successfully!');
        fetchCounterOffers(); // Refresh the list
      }
    } catch (error) {
      console.error('Error accepting counter offer:', error);
      alert(error.response?.data?.message || 'Error accepting counter offer');
    }
  };

  const handleRejectCounter = async (workId) => {
    if (!window.confirm('Are you sure you want to reject this counter offer?')) {
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:3000/company/counter/${workId}/response`,
        { status: 'rejected' },
        { withCredentials: true }
      );

      if (response.status === 200) {
        alert('Counter offer rejected successfully!');
        fetchCounterOffers(); // Refresh the list
      }
    } catch (error) {
      console.error('Error rejecting counter offer:', error);
      alert(error.response?.data?.message || 'Error rejecting counter offer');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-blue-600 text-white shadow-lg">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Company Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span>Welcome, {userProfile?.name || 'User'}</span>
            <button 
              onClick={() => navigate('/login')}
              className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Welcome Section */}
      {userProfile?.companyDetails && (
        <div className="bg-white shadow-md mt-6 mx-6 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Welcome to {userProfile.companyDetails.companyName}
          </h2>
          <p className="text-gray-600">{userProfile.companyDetails.desc}</p>
          {userProfile.companyDetails.companyWebsite && (
            <a 
              href={userProfile.companyDetails.companyWebsite}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline mt-2 inline-block"
            >
              Visit Website
            </a>
          )}
        </div>
      )}

      {/* Main Content Grid */}
      <div className="container mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Post New Work Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Post New Work</h2>
          <PostWork onWorkPosted={fetchMyWorks} />
        </div>

        {/* My Posted Works Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">My Posted Works</h2>
          {loading ? (
            <div className="text-center py-4">Loading...</div>
          ) : (
            <div className="space-y-4">
              {works.map(work => (
                <div key={work._id} className="border rounded-lg p-4">
                  <h3 className="font-semibold">{work.title}</h3>
                  <p className="text-gray-600">{work.description}</p>
                  <div className="mt-2">
                    <span className="text-blue-600 font-medium">₹{work.budget}</span>
                    <span className="text-gray-500 ml-2">• {work.duration}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Work Responses Section */}
        <div className="bg-white rounded-lg shadow-md p-6 md:col-span-2">
          {/* Counter Offers */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">
              Pending Responses ({counterOffers.length})
            </h2>
            {counterOffers.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {counterOffers.map(offer => (
                  <div key={offer._id} className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow">
                    <div className="mb-4">
                      <h3 className="font-semibold text-lg text-blue-600">{offer.workTitle}</h3>
                      <p className="text-sm text-gray-600 mt-1">{offer.workDetails.description}</p>
                    </div>

                    <div className="space-y-2 mb-4">
                      <p className="text-sm">
                        <span className="font-medium">Original Budget:</span> 
                        <span className="text-gray-600"> ₹{offer.workDetails.budget}</span>
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Counter Offer:</span> 
                        <span className="text-green-600 font-semibold"> ₹{offer.counterOffer}</span>
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Duration:</span> 
                        <span className="text-gray-600"> {offer.workDetails.duration}</span>
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-4 pt-4 border-t">
                      <div className="flex items-center">
                        <span className="text-sm font-medium mr-2">From:</span>
                        <span className="text-sm text-blue-600 font-semibold">{offer.freelancerName}</span>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleAcceptCounter(offer.workId)}
                          className="px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600 transition-colors"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleRejectCounter(offer.workId)}
                          className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition-colors"
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 text-gray-500">
                <p>No pending responses</p>
              </div>
            )}
          </div>

          {/* Accepted Works */}
          <div>
            <h2 className="text-xl font-bold mb-4">
              Accepted Works ({acceptedWorks.length})
            </h2>
            {acceptedWorks.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {acceptedWorks.map(work => (
                  <div key={work._id} className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow">
                    <div className="mb-4">
                      <h3 className="font-semibold text-lg text-blue-600">{work.workTitle}</h3>
                      <p className="text-sm text-gray-600 mt-1">{work.workDetails.description}</p>
                    </div>

                    <div className="space-y-2 mb-4">
                      <p className="text-sm">
                        <span className="font-medium">Final Price:</span> 
                        <span className="text-green-600 font-semibold"> ₹{work.price}</span>
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Duration:</span> 
                        <span className="text-gray-600"> {work.workDetails.duration}</span>
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-4 pt-4 border-t">
                      <div className="flex items-center">
                        <span className="text-sm font-medium mr-2">Accepted By:</span>
                        <span className="text-sm text-blue-600 font-semibold">{work.freelancerName}</span>
                      </div>
                      <span className="text-sm text-green-600 font-medium">Accepted</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 text-gray-500">
                <p>No accepted works yet</p>
              </div>
            )}
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gray-800 text-white py-8 mt-8">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold">{works.length}</h3>
                <p>Total Works Posted</p>
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold">{stats.totalPending}</h3>
                <p>Pending Responses</p>
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold">{stats.totalAccepted}</h3>
                <p>Accepted Works</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDashboard;

