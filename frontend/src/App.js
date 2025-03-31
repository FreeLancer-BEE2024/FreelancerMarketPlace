


// import React, { useEffect } from "react";
// import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
// import FreelancerDashboard from "./components/FreelancerDashboard";
// import CompanyDashboard from "./components/CompanyDashboard";
// import WorkList from "./components/WorkList"; // Ensure this is imported
// import AcceptedWork from "./components/AcceptedWorkList"; // Ensure this is imported
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         {/* Default route to handle redirection based on role */}
//         <Route path="/" element={<RedirectToDashboard />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/freelancer-dashboard" element={<FreelancerDashboard />} />
//         <Route path="/company-dashboard" element={<CompanyDashboard />} />
//         <Route path="/works" element={<WorkList />} /> {/* List of works */}
//         <Route path="/company/:id/acceptedworks" component={AcceptedWork} />{/* Accepted Work Details */}
//       </Routes>
//     </Router>
//   );
// };

// // Component to handle redirection based on role
// const RedirectToDashboard = () => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const role = localStorage.getItem("role");
//     if (role === "freelancer") {
//       navigate("/freelancer-dashboard");
//     } else if (role === "company") {
//       navigate("/company-dashboard");
//     } else {
//       navigate("/login"); // Default to login if role is not set
//     }
//   }, [navigate]);

//   return null; // No UI is needed, just redirection
// };

// export default App;
import { useEffect } from "react";
import React from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import FreelancerDashboard from "./components/FreelancerDashboard";
import CompanyDashboard from "./components/CompanyDashboard";
import WorkList from "./components/WorkList"; // Ensure this is imported
import AcceptedWork from "./components/AcceptedWorkList"; // Ensure this is imported
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
        <Route path="/works" element={<WorkList />} /> {/* List of works */}
        {/* <Route path="/company/:id/acceptedworks" element={<AcceptedWork />} /> Accepted Work Details */}
        <Route path="/company/:id/counterworks" element={<AcceptedWork />} /> {/* Accepted Work Details */}
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

