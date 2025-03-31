

// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [error, setError] = useState(null);
//     const navigate = useNavigate();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError(null);

//         try {
//             // Make the login request
//             const response = await axios.post("http://localhost:3000/login", { email, password }, {
//                 withCredentials: true // Ensures cookies are sent with the request
//             });

//             const { role } = response.data.user;

//             // Redirect based on role
//             if (role === "freelancer") {
//                 navigate("/freelancer-dashboard");
//             } else if (role === "company") {
//                 navigate("/company-dashboard");
//             }
//         } catch (err) {
//             setError(err.response?.data || "Something went wrong");
//         }
//     };

//     return (
//         <div>
//             <h2>Login</h2>
//             <form onSubmit={handleSubmit}>
//                 <div>
//                     <label>Email:</label>
//                     <input
//                         type="email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <div>
//                     <label>Password:</label>
//                     <input
//                         type="password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         required
//                     />
//                 </div>
//                 {error && <p style={{ color: "red" }}>{error}</p>}
//                 <button type="submit">Login</button>
//             </form>
//         </div>
//     );
// };

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const response = await axios.post(
                "http://localhost:3000/login",
                { email, password },
                { withCredentials: true }
            );

            const { role } = response.data.user;

            if (role === "freelancer") {
                navigate("/freelancer-dashboard");
            } else if (role === "company") {
                navigate("/company-dashboard");
            } else {
                throw new Error("Invalid user role");
            }
        } catch (err) {
            setError(err.response?.data?.message || "Invalid email or password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600"
            style={{
                fontFamily: "'Arial', sans-serif",
            }}
        >
            <div
                style={{
                    maxWidth: "400px",
                    padding: "20px",
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    backgroundColor: "white",
                    width: "100%",
                }}
            >
                <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: "15px" }}>
                        <label
                            htmlFor="email"
                            style={{
                                display: "block",
                                marginBottom: "5px",
                                fontWeight: "bold",
                            }}
                        >
                            Email:
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={{
                                width: "100%",
                                padding: "10px",
                                fontSize: "16px",
                                border: "1px solid #ccc",
                                borderRadius: "4px",
                            }}
                        />
                    </div>
                    <div style={{ marginBottom: "15px" }}>
                        <label
                            htmlFor="password"
                            style={{
                                display: "block",
                                marginBottom: "5px",
                                fontWeight: "bold",
                            }}
                        >
                            Password:
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{
                                width: "100%",
                                padding: "10px",
                                fontSize: "16px",
                                border: "1px solid #ccc",
                                borderRadius: "4px",
                            }}
                        />
                    </div>
                    {error && (
                        <p style={{ color: "red", marginBottom: "15px" }}>{error}</p>
                    )}
                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            width: "100%",
                            padding: "10px",
                            fontSize: "16px",
                            backgroundColor: loading ? "#ccc" : "#007bff",
                            color: "#fff",
                            border: "none",
                            borderRadius: "4px",
                            cursor: loading ? "not-allowed" : "pointer",
                            fontWeight: "bold",
                        }}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;

