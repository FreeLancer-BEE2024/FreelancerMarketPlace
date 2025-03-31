const jwt = require('jsonwebtoken');
const SECRET_KEY = "supersecretkey";
const User = require('../models/user.model');
const Freelancer = require('../models/freelancer.model');
const Company = require('../models/company.model');

exports.authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies['token'];
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const decoded = jwt.verify(token, SECRET_KEY);
        if (!decoded) {
            return res.status(400).json({ message: "Invalid token" });
        }

        // Use lean() to get plain JavaScript objects
        const user = await User.findById(decoded.id).lean();
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        // Create a clean user object with only necessary fields
        req.user = {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        };

        // Add role-specific details
        if (user.role === 'freelancer') {
            const freelancer = await Freelancer.findOne({ userID: user._id }).lean();
            if (freelancer) {
                req.user.freelancerDetails = {
                    workEx: freelancer.workEx,
                    expertise: freelancer.expertise,
                    rates: freelancer.rates,
                    reviews: freelancer.reviews,
                    projectsCompleted: freelancer.projectsCompleted
                };
            }
        } else if (user.role === 'company') {
            const company = await Company.findOne({ userID: user._id }).lean();
            if (company) {
                req.user.companyDetails = {
                    companyName: company.companyName,
                    desc: company.desc,
                    companyWebsite: company.companyWebsite
                };
            }
        }

        next();
    } catch (error) {
        console.error('Auth Middleware Error:', error);
        return res.status(400).json({ message: "Authentication failed", error: error.message });
    }
}