
// // import React, { useState } from "react";
// // import axios from "axios";

// // const Login = () => {
// //   const [credentials, setCredentials] = useState({ email: "", password: "" });

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setCredentials({ ...credentials, [name]: value });
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       const response = await axios.post("http://localhost:3000/login", credentials, {
// //         withCredentials: true, // To include cookies with the request
// //       });

// //       alert(response.data.message);
// //     } catch (error) {
// //       console.error("Error logging in:", error);
// //       if (error.response) {
// //         alert("Error logging in: " + error.response.data.message);
// //       } else {
// //         alert("An unknown error occurred.");
// //       }
// //     }
// //   };

// //   return (
// //     <form onSubmit={handleSubmit}>
// //       <h2>Login</h2>
// //       <input
// //         type="email"
// //         name="email"
// //         placeholder="Email"
// //         value={credentials.email}
// //         onChange={handleChange}
// //         required
// //       />
// //       <input
// //         type="password"
// //         name="password"
// //         placeholder="Password"
// //         value={credentials.password}
// //         onChange={handleChange}
// //         required
// //       />
// //       <button type="submit">Login</button>
// //     </form>
// //   );
// // };

// // export default Login;


// // import React, { useState } from "react";
// // import axios from "axios";
// // import { useNavigate } from "react-router-dom"; // Import useNavigate from React Router

// // const Login = () => {
// //   const [credentials, setCredentials] = useState({ email: "", password: "" });
// //   const navigate = useNavigate(); // Initialize the useNavigate hook

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setCredentials({ ...credentials, [name]: value });
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       const response = await axios.post("http://localhost:3000/login", credentials, {
// //         withCredentials: true, // To include cookies with the request
// //       });

// //       alert(response.data.message);

// //       // Assuming the response contains the role of the logged-in user
// //       const userRole = response.data.role; // You should get the role from the response

// //       if (userRole === "freelancer") {
// //         // Redirect to freelancer dashboard
// //         navigate("/freelancer-dashboard");
// //       } else if (userRole === "company") {
// //         // Redirect to company dashboard
// //         navigate("/company-dashboard");
// //       }
// //     } catch (error) {
// //       console.error("Error logging in:", error);
// //       if (error.response) {
// //         alert("Error logging in: " + error.response.data.message);
// //       } else {
// //         alert("An unknown error occurred.");
// //       }
// //     }
// //   };

// //   return (
// //     <form onSubmit={handleSubmit}>
// //       <h2>Login</h2>
// //       <input
// //         type="email"
// //         name="email"
// //         placeholder="Email"
// //         value={credentials.email}
// //         onChange={handleChange}
// //         required
// //       />
// //       <input
// //         type="password"
// //         name="password"
// //         placeholder="Password"
// //         value={credentials.password}
// //         onChange={handleChange}
// //         required
// //       />
// //       <button type="submit">Login</button>
// //     </form>
// //   );
// // };

// // export default Login;



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
//             const response = await axios.post("http://localhost:3000/login", { email, password });
//             const { role } = response.data.user;

//             // Save token to localStorage or context for future requests
//             localStorage.setItem("token", response.data.token);
//             localStorage.setItem("role", role);

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

// export default Login;


import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            // Make the login request
            const response = await axios.post("http://localhost:3000/login", { email, password }, {
                withCredentials: true // Ensures cookies are sent with the request
            });

            const { role } = response.data.user;

            // Redirect based on role
            if (role === "freelancer") {
                navigate("/freelancer-dashboard");
            } else if (role === "company") {
                navigate("/company-dashboard");
            }
        } catch (err) {
            setError(err.response?.data || "Something went wrong");
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p style={{ color: "red" }}>{error}</p>}
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;

