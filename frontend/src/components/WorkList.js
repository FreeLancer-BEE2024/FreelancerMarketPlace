// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";  // For navigation

// const WorkList = () => {
//   const [works, setWorks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchWorks = async () => {
//       try {
//         const response = await axios.get("http://localhost:3000/company/works", {
//           withCredentials: true,
//         });
//         setWorks(response.data);
//       } catch (error) {
//         setError("Error fetching works: " + (error.response?.data || error.message));
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchWorks();
//   }, []);

//   if (loading) {
//     return <p className="text-center text-white">Loading works...</p>;
//   }

//   if (error) {
//     return <p className="text-center text-red-500">{error}</p>;
//   }

//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
//       <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Available Work</h2>
      
//       {works.length === 0 ? (
//         <p className="text-center text-gray-600">No works available.</p>
//       ) : (
//         <ul className="space-y-6">
//           {works.map((work) => (
//             <li key={work.id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
//               <h3 className="text-xl font-bold text-blue-600">{work.title}</h3>
//               <p className="text-gray-700 mt-2">{work.description}</p>
//               <p className="text-green-500 font-semibold mt-3">{work.rate}</p>
//               <Link to={`/work/${work.id}/counterworks`} className="text-blue-500 hover:underline">View Counter Works</Link>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default WorkList;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";  // For navigation

const WorkList = () => {
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);  // Add error state

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        const response = await axios.get("http://localhost:3000/company/works", {
          withCredentials: true,
        });
        setWorks(response.data);
      } catch (error) {
        setError("Error fetching works: " + (error.response?.data || error.message)); // Handle error message properly
      } finally {
        setLoading(false);
      }
    };

    fetchWorks();
  }, []);

  if (loading) {
    return <p className="text-center text-white">Loading works...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{String(error)}</p>;  {/* Convert error to string */}
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Available Work</h2>
      
      {works.length === 0 ? (
        <p className="text-center text-gray-600">No works available.</p>
      ) : (
        <ul className="space-y-6">
          {works.map((work) => (
            <li key={work.id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold text-blue-600">{work.title}</h3>
              <p className="text-gray-700 mt-2">{work.description}</p>
              <p className="text-green-500 font-semibold mt-3">{work.rate}</p>
              <Link to={`/work/${work.id}/counterworks`} className="text-blue-500 hover:underline">View Counter Works</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default WorkList;
