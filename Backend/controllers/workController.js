const {readWork, writeWork} = require('../models/work');

exports.createWork =  (req, res) => {
 
    const { title, description, requirements, duration, budget, isNegotiable } = req.body;
    const user = req.user;
    console.log(user);
    if(user.role == "freelancer") return res.status(400).send("Frelancer cannot post a work!")
    if (!title || !description || !Array.isArray(requirements) || requirements.length === 0 || !duration || !budget || typeof isNegotiable !='boolean') {
      console.log(isNegotiable);
      return res.status(400).json({ message: 'Invalid input data' });
    }
    const work = readWork();
    const newWork=({ 
        id: work.length>0 ? work[work.length-1].id+1:1,
        title, 
        description, 
        requirements, 
        duration, 
        budget ,
        workBy:user.companyName, 
        isNegotiable,
        isAccepted:false
    });
    console.log(newWork.workBy);
    work.push(newWork);
    writeWork(work);

    return res.json({ message: 'Work created successfully' , work: newWork});

};

exports.deleteWork = async (req, res) => {
  

  const works = readWork();
  const id = req.params.id;
  const workIdx = works.findIndex((a)=>a.id==id);
  if(workIdx==-1) return res.status(400).send("no work found!");
  works.splice(workIdx, 1);
  works.forEach((work, idx) => {
    work.id = idx+1;
  });
  writeWork(works);
  return res.status(200).json({message: "Work Deleted succeffully"})

};
