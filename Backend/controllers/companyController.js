const { ReadAcceptedWorks } = require("../models/acceptedWork");
const { readWork } = require("../models/work");
const chatQuestions = require("../Questions.json");

exports.readMyWork = (req, res) => {
  const user = req.user;
  const works = readWork();
  const work = works.filter((a) => a.workBy == user.companyName);
  if (work.length == 0) {
    return res.status(404).send("No work by the company");
  }
  res.send(work);
};

exports.readMyCounterWorks = (req, res) => {
  const  workId  = req.params.id;
  // let trimmedWork = workName.trim().toLowerCase();
  console.log('working');
  const works = ReadAcceptedWorks();
  const user = req.user;
  const work = works.filter(
    (a) =>
      a.workId == workId &&
      a.companyName == user.companyName
  );
  return res.status(200).send(work);
};

exports.chatBot = (req, res) => {
  const input = req.body.input.trim().toLowerCase();
  const questions = chatQuestions;
  let matchedQuestions = []; 
  for (let i = 0; i < questions.length; i++) {
   
    const storedQuestion = questions[i].question.trim().toLowerCase();

    if (storedQuestion.includes(input)) 
    {
      matchedQuestions.push(questions[i].question);
    }
  }

  if (matchedQuestions.length > 0) {
    return res.status(200).json({
      matches: matchedQuestions,
    });
  } else {
    return res.status(404).json({
      message: "No matching questions found for your input. Connecting to a Human Agent for your help",
    });
  }
};
