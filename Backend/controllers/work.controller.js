const Work = require('../models/work.model');

exports.createWork =  async(req, res) => {
 
    const { title, description, requirements, duration, budget, isNegotiable } = req.body;
    const user = req.user;
    console.log(user);
    try{
    if(user.role == "freelancer") return res.status(400).send("Frelancer cannot post a work!")
    if (!title || !description || !Array.isArray(requirements) || requirements.length === 0 || !duration || !budget || typeof isNegotiable !='boolean') {
      console.log(isNegotiable);
      return res.status(400).json({ message: 'Invalid input data' });
    }
    const newWork = new Work({
      title,
      description,
      requirements,
      duration,
      budget,
      workBy: user.companyDetails.companyName,
      isNegotiable,
      isAccepted: false
    });
    await newWork.save();
    return res.json({ message: 'Work created successfully' , work: newWork});
  }
  catch(e){
    console.log(e);
    return res.status(400).send(e.message);
  }

};




exports.deleteWork = async (req, res) => {
  
  const workId = req.params.id;
  const user = req.user;
  try{
    const work = await Work.findOne({ _id: workId });
    if (!work) {
      return res.status(404).send("Work not found");
    }
    if (work.workBy != user.companyName) {
      return res.status(401).send("Unauthorized to delete this work");
    }
    await Work.deleteOne({ _id: workId });
    return res.send("Work deleted successfully");
  }
  catch(e){
    return res.status(400).send(e.message);
  }

};


