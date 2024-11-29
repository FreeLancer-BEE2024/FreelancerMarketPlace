// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const FreelancerDashboard = () => {
//   const [works, setWorks] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     fetchAllWorks();
//   }, []);

//   const fetchAllWorks = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get("http://localhost:3000/freelancers/works", {
//         withCredentials: true,
//       });
//       setWorks(response.data);
//     } catch (error) {
//       console.error("Error fetching works:", error.response?.data || error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleAcceptWork = async (workId, counter = null) => {
//     try {
//       const response = await axios.post(
//         `http://localhost:3000/freelancer/works/accept/${workId}`,
//         { accepted: counter ? "counter" : "yes", counter },
//         { withCredentials: true }
//       );
//       alert(response.data);
//       fetchAllWorks();
//     } catch (error) {
//       console.error("Error handling work acceptance:", error.response?.data || error.message);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-600">
//       {/* Navbar for Freelancer */}
//       <nav className="bg-blue-600 text-white p-4 flex justify-between items-center shadow-lg">
//         <div className="text-2xl font-bold">
//           <span>FreelancerHub</span>
//         </div>

//         {/* Work Based on Skills Dropdown */}
//         <div className="relative">
//           <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
//             Work Based on Skills
//           </button>
//         </div>
//       </nav>

//       {/* Dashboard Content */}
//       <div className="p-6 max-w-screen-xl mx-auto">
//         <h1 className="text-3xl font-semibold text-white mb-6">Freelancer Dashboard</h1>
//         {loading ? (
//           <p className="text-lg text-gray-200">Loading works...</p>
//         ) : works.length > 0 ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {works.map((work) => (
//               <div
//                 key={work.id}
//                 className="bg-white p-5 rounded-lg shadow-lg hover:shadow-xl transform transition duration-300 ease-in-out hover:scale-105"
//               >
//                 <h3 className="text-2xl font-semibold text-blue-600 mb-2">{work.title}</h3>
//                 <p className="text-gray-700 mb-4">{work.description}</p>
//                 <div className="mb-4">
//                   <span className="font-bold text-gray-800">Company:</span> {work.workBy}
//                 </div>
//                 <div className="mb-4">
//                   <span className="font-bold text-gray-800">Skills Required:</span> {work.requirements.join(", ")}
//                 </div>
//                 <div className="mb-4">
//                   <span className="font-bold text-gray-800">Status:</span> {work.isAccepted ? "Accepted" : "Available"}
//                 </div>
//                 <div className="flex justify-between items-center mt-4">
//                   <button
//                     className="bg-green-500 text-white py-2 px-6 rounded-md hover:bg-green-600 transition"
//                     disabled={work.isAccepted}
//                     onClick={() => handleAcceptWork(work.id)}
//                   >
//                     Accept
//                   </button>
//                   {work.isNegotiable && !work.isAccepted && (
//                     <button
//                       className="bg-yellow-500 text-black py-2 px-6 rounded-md hover:bg-yellow-600 transition"
//                       onClick={() =>
//                         handleAcceptWork(work.id, prompt("Enter your counter offer:"))
//                       }
//                     >
//                       Counter Offer
//                     </button>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p className="text-lg text-white">No works available at the moment.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default FreelancerDashboard;


import React, { useState, useEffect } from "react";
import axios from "axios";

const FreelancerDashboard = () => {
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAllWorks();
  }, []);

  const fetchAllWorks = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3000/freelancers/works", {
        withCredentials: true,
      });
      setWorks(response.data);
    } catch (error) {
      console.error("Error fetching works:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptWork = async (workId, counter = null) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/freelancer/works/accept/${workId}`,
        { accepted: counter ? "counter" : "yes", counter },
        { withCredentials: true }
      );
      alert(response.data);
      fetchAllWorks();
    } catch (error) {
      console.error("Error handling work acceptance:", error.response?.data || error.message);
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: 'url(https://your-image-url-here.com/image.jpg)' }}>
      {/* Overlay Gradient */}
      <div className="bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-600 opacity-80 min-h-screen">
        {/* Navbar for Freelancer */}
        <nav className="bg-blue-600 text-white p-4 flex justify-between items-center shadow-lg">
          <div className="text-2xl font-bold">
            <span>FreelancerHub</span>
          </div>

          {/* Work Based on Skills Dropdown */}
          <div className="relative">
            <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
              Work Based on Skills
            </button>
          </div>
        </nav>

        {/* Dashboard Content */}
        <div className="p-6 max-w-screen-xl mx-auto">
          <h1 className="text-3xl font-semibold text-white mb-6">Freelancer Dashboard</h1>
          {loading ? (
            <p className="text-lg text-gray-200">Loading works...</p>
          ) : works.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {works.map((work) => (
                <div
                  key={work.id}
                  className="bg-white p-5 rounded-lg shadow-lg hover:shadow-xl transform transition duration-300 ease-in-out hover:scale-105"
                >
                  <h3 className="text-2xl font-semibold text-blue-600 mb-2">{work.title}</h3>
                  <p className="text-gray-700 mb-4">{work.description}</p>
                  <div className="mb-4">
                    <span className="font-bold text-gray-800">Company:</span> {work.workBy}
                  </div>
                  <div className="mb-4">
                    <span className="font-bold text-gray-800">Skills Required:</span> {work.requirements.join(", ")}
                  </div>
                  <div className="mb-4">
                    <span className="font-bold text-gray-800">Status:</span> {work.isAccepted ? "Accepted" : "Available"}
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <button
                      className="bg-green-500 text-white py-2 px-6 rounded-md hover:bg-green-600 transition"
                      disabled={work.isAccepted}
                      onClick={() => handleAcceptWork(work.id)}
                    >
                      Accept
                    </button>
                    {work.isNegotiable && !work.isAccepted && (
                    <button
                      className="bg-yellow-500 text-black py-2 px-6 rounded-md hover:bg-yellow-600 transition"
                      onClick={() => handleAcceptWork(work.id, prompt("Enter your counter offer:"))}
                    >
                      Counter Offer
                    </button>
                  )}

                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-lg text-white">No works available at the moment.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FreelancerDashboard;
