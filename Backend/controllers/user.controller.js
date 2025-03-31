const User = require('../models/user.model')
const Freelancer = require('../models/freelancer.model')    
const Company = require('../models/company.model')
// const {readWork, writeWork} = require('../models/work')
const bcrypt = require('bcrypt');
const validator = require('validator')
const SECRET_KEY = "supersecretkey";
const jwt = require('jsonwebtoken')


exports.signup = async(req, res)=>{
    const {role, ...data} =req.body;
    // console.log("Received data:", req.body); 
    // console.log("role recived :", role);
    
    if(!role || (role!="freelancer" && role!="company")) return  res.status(401).send("Invalid role specified!");

    if(!data.name|| !data.email || !data.password) 
    {
        return res.status(400).json("All common fields are mandatory!")
    }

    if(!validator.isEmail(data.email))
    {
        return res.status(400).json("Invalid email format")
    }
    if(role == " freelancer")
    {
        if (!data.workEx || !Array.isArray(data.expertise) || data.expertise.length === 0  || !data.rates || data.projectsCompleted === undefined || data.projectsCompleted === null) {
            return res.status(400).json("All freelancers fields are mandatory!");
        }
        
        if(typeof data.rates !='number')
        {
            return res.status(400).send("rates should be in numbers")
        }
    }
    else if(role == "company")
    {
        if(!data.companyName || !data.desc || !data.companyWebsite )
        {
            return res.status(400).json("Company-specific fields (companyName,Description ,companyWebsite) are required!")
        }
    }
    const emailExists = await User.findOne({email:data.email});

   
    
    if (emailExists) {
        return res.status(400).send("Email already exists!");
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const newUser = new User({
        role:role,
       name: data.name,
        email:data.email,
        password: hashedPassword
    })
    await newUser.save();
    if(role =="freelancer")
    {

        const newFreelancer = new Freelancer({
            userID: newUser._id,
            workEx: data.workEx,
            expertise: data.expertise,
            rates: data.rates,
            reviews: 0,
            projectsCompleted:data.projectsCompleted
        })
      
        await newFreelancer.save();
        return res.status(201).json({message:"New freelancer added", freelancer: newFreelancer});
    }
    else if(role == "company")
    {
        const newCompany = new Company({    
            userID: newUser._id,
            companyName: data.companyName,
            desc: data.desc,
            companyWebsite: data.companyWebsite
        });
        await newCompany.save();
        return res.status(201).json({message:"Company Registered!", companyDetails:newCompany});
    }
}

exports.login = async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);
    if (!email || !password) {
        return res.status(400).send("All fields are mandatory");
    }

    const existingUser = await User.findOne({email: email});
    if (!existingUser) {
        return res.status(400).send("Invalid credentials");
    }
    // Compare the provided password with the stored hashed password
    const valid = await bcrypt.compare(password, existingUser.password);
    if (!valid) {
        return res.status(400).send("Invalid credentials");
    }

    // Generate JWT token with role included in payload
    const token = jwt.sign(
        {
            id: existingUser.id,
            role:existingUser.role, // Include role in the token payload
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
        message: existingUser.role == "company" ? `Company Login successful`: `Freelancer Login successful`,
        user: {
            id: existingUser.id,
            firstName: existingUser.name,
            email: existingUser.email,
            role: existingUser.role,
        },
    });
};


// exports.getWorks = (req, res)=>{
//     const works = readWork();
//     return res.status(200).json(works);
// }