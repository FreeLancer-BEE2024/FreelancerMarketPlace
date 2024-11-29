import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CompanyDashboard from "../components/CompanyDashboard";
import FreelancerDashboard from "../components/FreelancerDashboard";

const Dashboard = () => {
    const userRole = localStorage.getItem("role");
    const navigate = useNavigate();

    useEffect(() => {
        if (!userRole) {
            navigate("/"); // Redirect to login if not logged in
        }
    }, [userRole, navigate]);

    return (
        <div>
            {userRole === "company" && <CompanyDashboard />}
            {userRole === "freelancer" && <FreelancerDashboard />}
        </div>
    );
};

export default Dashboard;
