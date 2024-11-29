const jwt = require('jsonwebtoken');
const SECRET_KEY = "supersecretkey";
const { readUsers } = require('../models/user');
const { readFreelancers } = require('../models/freelancer-model');

exports.authMiddleware = (req, res, next) => {
    
        // Retrieve the token from cookies
        const token = req.cookies['token'];
        if (!token) {
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }

        // Verify the token
        const decoded = jwt.verify(token, SECRET_KEY);
        if (!decoded) {
            return res.status(400).json({ message: "Invalid token" });
        }

        // Retrieve users and freelancers
        const users = readUsers();
        const freelancers = readFreelancers();

        const user = users.find((a) => a.id == decoded.id && a.role === decoded.role);
        const freelancer = freelancers.find((a) => a.id == decoded.id && a.role === decoded.role);

        if (!user && !freelancer) {
            return res.status(401).json({ message: "Unauthorized: User or freelancer not found" });
        }

        // Attach the correct entity to req.user
        req.user = user || freelancer;
        next();
    
};
