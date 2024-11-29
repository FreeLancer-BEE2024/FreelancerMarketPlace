// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// // import AcceptedWork from './components/AcceptedWorkList';
// // import PostWork from './components/PostWork';
// import FreelancerDashboard from './components/FreelancerDashboard';
// import CompanyDashboard from './components/CompanyDashboard';
// import WorkList from './components/WorkList';
// import Login from './pages/Login';
// import Signup from './pages/Signup';
// // import Navbar from './components/Navbar'; // Optional: Add a navigation bar

// const App = () => {
//   return (
//     <Router>
//       <div>
//         {/* <Navbar /> Optional: Remove if not using a Navbar */}
//         <Routes>
//           {/* <Route path="/" element={<WorkList />} /> */}
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/freelancer-dashboard" element={<FreelancerDashboard />} />
//         <Route path="/company-dashboard" element={<CompanyDashboard />} />
//           {/* <Route path="/post-work" element={<PostWork />} />
//           <Route path="/accepted-work" element={<AcceptedWork />} /> */}
//         </Routes>
//       </div>
//     </Router>
//   );
// };

// export default App;


import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import FreelancerDashboard from "./components/FreelancerDashboard";
import CompanyDashboard from "./components/CompanyDashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Default route to handle redirection based on role */}
        <Route path="/" element={<RedirectToDashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/freelancer-dashboard" element={<FreelancerDashboard />} />
        <Route path="/company-dashboard" element={<CompanyDashboard />} />
      </Routes>
    </Router>
  );
};

// Component to handle redirection based on role
const RedirectToDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role === "freelancer") {
      navigate("/freelancer-dashboard");
    } else if (role === "company") {
      navigate("/company-dashboard");
    } else {
      navigate("/login"); // Default to login if role is not set
    }
  }, [navigate]);

  return null; // No UI is needed, just redirection
};

export default App;

