const Work = require("../models/work.model");
const Accepted = require("../models/accepted.model");

exports.readMyWork = async (req, res) => {
  const user = req.user;
  console.log(user.companyDetails.companyName);
  try {
    if(user.role === "freelancer") {
      return res.status(400).json({ message: "Freelancer cannot post a work!" });
    }
    const works = await Work.find({ workBy: user.companyDetails.companyName }).lean();
    return res.status(200).json(works);
  } catch (error) {
    console.error(error); 
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.readMyCounterWorks = async (req, res) => {
  const user = req.user;
  
  try {
    if (!user.companyDetails || !user.companyDetails.companyName) {
      return res.status(400).json({ message: "Company details not found" });
    }

    // Get all responses (both accepted and counter offers)
    const workResponses = await Accepted.find({ 
      companyName: user.companyDetails.companyName
    })
    .populate('workId', 'title description requirements budget duration')
    .populate('freelancerId', 'name')
    .lean();

    // Separate accepted works and counter offers
    const acceptedWorks = [];
    const counterOffers = [];

    workResponses.forEach(response => {
      const formattedResponse = {
        _id: response._id,
        workId: response.workId._id,
        workTitle: response.workId.title,
        workDetails: {
          description: response.workId.description,
          requirements: response.workId.requirements,
          budget: response.workId.budget,
          duration: response.workId.duration
        },
        freelancerName: response.freelancerName,
        counterOffer: response.counterOffer,
        accepted: response.accepted,
        price: response.price
      };

      if (response.accepted) {
        acceptedWorks.push(formattedResponse);
      } else {
        counterOffers.push(formattedResponse);
      }
    });

    return res.status(200).json({
      acceptedWorks,
      counterOffers,
      stats: {
        totalAccepted: acceptedWorks.length,
        totalPending: counterOffers.length,
        total: workResponses.length
      }
    });

  } catch (error) {
    console.error('Read Counter Works Error:', error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.chatBot = (req, res) => {
  const input = req.body.input;
  console.log("Received input:", input); // Log the received input

  if (!input || typeof input !== 'string' || input.trim() === '') {
    console.log("Invalid input:", req.body); // Log invalid input
    return res.status(400).json({
      message: "Invalid input, please provide a valid message.",
    });
  }

  const processedInput = input.trim().toLowerCase();
  console.log("Processed input:", processedInput); // Log processed input

  const questions = chatQuestions;
  let matchedQuestions = [];

  for (let i = 0; i < questions.length; i++) {
    const storedQuestion = questions[i].question.trim().toLowerCase();
    if (storedQuestion.includes(processedInput)) {
      matchedQuestions.push({
        question: questions[i].question,
        reply: questions[i].answer
      });
    }
  }

  if (matchedQuestions.length > 0) {
    return res.status(200).json({
      matches: matchedQuestions,
    });
  } else {
    return res.status(404).json({
      message: "No matching questions found for your input. Connecting to a Human Agent for your help.",
    });
  }
};

exports.companyProfile = async (req, res) => {
  const user = req.user;
  try {
    if(user.role !== "company") {
      return res.status(400).json({ message: "Access denied!" });
    }
    
    return res.status(200).json({
      name: user.name,
      email: user.email,
      role: user.role,
      companyDetails: user.companyDetails
    });
    
  } catch (error) {
    console.error('Company Profile Error:', error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};