const {readUsers, writeUsers} = require("../models/user");
const {readFreelancers, writeFreelancers} = require('../models/freelancer-model')
// const {readWork, writeWork} = require('../models/work')
const bcrypt = require('bcrypt');
const validator = require('validator')
const SECRET_KEY = "supersecretkey";
const jwt = require('jsonwebtoken')


exports.signup = async(req, res)=>{
    const {role, ...data} =req.body;
    console.log("Received data:", req.body); 
    console.log("role recived :", role);
    
    if(!role || (role!="freelancer" && role!="company")) return  res.status(401).send("Invalid role specified!");

    if(!data.firstName || !data.lastName || !data.email || !data.password) 
    {
        return res.status(400).send("All common fields are mandatory!")
    }

    if(!validator.isEmail(data.email))
    {
        return res.status(400).send("Invalid email format")
    }
    if(role == " freelancer")
    {
        if (!data.workEx || !Array.isArray(data.expertise) || data.expertise.length === 0 || !data.availability || !data.rates || data.projectsCompleted === undefined || data.projectsCompleted === null) {
            return res.status(400).send("All freelancers fields are mandatory!");
        }
        console.log("klll");
        
        if(typeof data.rates !='number')
        {
            return res.status(400).send("rates should be in numbers")
        }
    }
    else if(role == "company")
    {
        if(!data.companyName || !data.desc || !data.companyWebsite )
        {
            return res.status(400).send("Company-specific fields (companyName,Description ,companyWebsite) are required!")
        }
    }
    const users = readUsers();
    const freelancers = readFreelancers();
    
    const emailExists = (role === "freelancer"
    ? freelancers.find((user) => user.email === data.email)
    : users.find((user) => user.email === data.email)) !== undefined;
    
    if (emailExists) {
        return res.status(400).send("Email already exists!");
    }
    const hashedPassword = await bcrypt.hash(data.password, 10)
    if(role =="freelancer")
    {
        console.log("yes")
        const newFreelancer = {
            id: freelancers.length>0 ? freelancers[freelancers.length-1].id+1:1,
            role:role,
            firstName: data.firstName,
            lastName: data.lastName,
            email:data.email,
            password: hashedPassword,
            expertise :data.expertise,
            workEx:data.workEx,
            rates:data.rates,
            reviews: 0,
            projectsCompleted :data.projectsCompleted
        }
        freelancers.push(newFreelancer);
        writeFreelancers(freelancers);
        return res.status(201).json({message:"New freelancer added", freelancer: newFreelancer});
    }
    else if(role == "company")
    {
        const newCompany = {
            id:users.length>0 ? users[users.length-1].id+1:1,
            role:role,
            firstName: data.firstName,
            lastName: data.lastName,
            email:data.email,
            password: hashedPassword,
            companyName:data.companyName,
            desc:data.desc,
            companyWebsite: data.companyWebsite
        }

        users.push(newCompany);
        writeUsers(users);
        return res.status(201).json({message:"Company Registered!", companyDetails:newCompany});
    }
}

exports.login = async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);
    if (!email || !password) {
        return res.status(400).send("All fields are mandatory");
    }

    // Read data from both sources
    const freelancers = readFreelancers();
    const users = readUsers();

    // Check if the user exists in freelancers or users
    let user = freelancers.find((freelancer) => freelancer.email === email);
    let role = "freelancer";

    if (!user) {
        user = users.find((company) => company.email === email);
        role = "company";
    }

    if (!user) {
        return res.status(404).send("User does not exist");
    }

    // Compare the provided password with the stored hashed password
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
        return res.status(400).send("Invalid credentials");
    }

    // Generate JWT token with role included in payload
    const token = jwt.sign(
        {
            id: user.id,
            role, // Include role in the token payload
        },
        SECRET_KEY,
        { expiresIn: "1h" }
    );

    // Set cookie with the token
    res.cookie("token", token, {
        httpOnly: true,
        maxAge: 3600000, // 1 hour
    });

    return res.status(200).json({
        message: "Login successful",
        user: {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role,
        },
    });
};


// exports.getWorks = (req, res)=>{
//     const works = readWork();
//     return res.status(200).json(works);
// }