const Work = require("../models/work.model");
const Accepted = require("../models/accepted.model");

exports.getAllWorks = async (req, res) => {
    try {
        if (req.user.role !== 'freelancer') {
            return res.status(401).json({ message: "Access Denied for Company!" });
        }

        // Use lean() to get plain objects and await the query
        const works = await Work.find({ isAccepted: false }).lean();
        
        // Transform the works array to ensure safe JSON serialization
        const safeWorks = works.map(work => ({
            id: work._id,
            title: work.title,
            description: work.description,
            requirements: work.requirements,
            budget: work.budget,
            duration: work.duration,
            workBy: work.workBy,
            isNegotiable: work.isNegotiable,
            isAccepted: work.isAccepted
        }));

        return res.status(200).json(safeWorks);
    } catch (error) {
        console.error('Get All Works Error:', error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.acceptWork = async (req, res) => {
    const workId = req.params.id;
    console.log(workId);
    const user = req.user;
    const { counter } = req.body;
    
    try {
        // Add validation for workId
        if (!workId || workId === 'undefined') {
            return res.status(400).send("Invalid work ID");
        }

        if (user.role === "company") {
            return res.status(401).send("Access Denied for Company!");
        }
            
        const work = await Work.findById(workId);
        
        if (!work) {
            return res.status(404).send("Work not found");
        }

        if (work.isAccepted) {
            return res.status(400).send("Work already accepted");
        }
            
        if (!work.isNegotiable && counter) {
            return res.status(400).send("Work is not negotiable");
        }

        // Handle counter offer
        if (counter) {
            if (isNaN(counter) || counter <= 0 || counter < work.budget) {
                return res.status(400).send("Invalid counter offer");
            }
            
            const newCounter = new Accepted({
                workId: work._id,
                freelancerId: user._id,
                companyName: work.workBy,
                freelancerName: user.name,
                counterOffer: counter,
                accepted: false
            });
            
            await newCounter.save();
            return res.status(201).send("Counter offer sent successfully");
        }

        // Direct acceptance
        const accepted = new Accepted({
            workId: work._id,
            freelancerId: user._id,
            companyName: work.workBy,
            freelancerName: user.name,
            accepted: true,
            price: work.budget
        });
        
        await accepted.save();
        work.isAccepted = true;
        await work.save();
        
        return res.status(201).send("Work accepted successfully");
    } catch (error) {
        console.error("Accept Work Error:", error);
        return res.status(500).send("Internal Server Error");
    }
};

exports.worksOnSkills = async (req, res) => {
    const user = req.user;
    const { skills } = req.query;

    try{
    if (user.role === "company")
        return res.status(401).send("Access Denied for Company!");
    
    const works = await Work.find({ isAccepted: false });
    
    // Extract skills from the query string
    
    if (!skills) {
        return res.status(400).send("Skills query parameter is required");
    }
    
    // Split skills into an array, assuming skills are passed as a comma-separated string
    const skillArray = skills.split(",").map((skill) => skill.trim());
    
    if (skillArray.length === 0) {
        return res.status(400).send("Invalid Input: No skills provided");
    }
    
    // Normalize skills to lowercase
    const lowerCaseSkills = skillArray.map((skill) => skill.toLowerCase());
    
    // Filter works based on the skills
    const availableWorks = works.filter(
        (work) =>
        work.requirements.some((reqSkill) => {
            // Normalize the requirement and check if any skill is a substring
            return lowerCaseSkills.some((skill) =>
            reqSkill.toLowerCase().includes(skill)
            );
        })
    );
    
    // If no works match, return a 400 error
    if (availableWorks.length === 0)
        return res.status(400).send("No work to display!");
    
    // Return the available works as a JSON response
    return res.status(200).json(availableWorks);
}
catch(error){
    console.log(error);
    return res.status(500).send("Internal Server Error");
}
}

exports.getFreelancerProfile = async (req, res) => {
  try {
    if (req.user.role !== 'freelancer') {
      return res.status(401).json({ message: "Access denied!" });
    }
    
    return res.status(200).json({
      name: req.user.name,
      email: req.user.email,
      skills: req.user.skills
    });
  } catch (error) {
    console.error('Get Freelancer Profile Error:', error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};