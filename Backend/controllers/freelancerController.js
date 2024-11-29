const {readWork, writeWork} = require('../models/work');
const {ReadAcceptedWorks, writeAcceptedWorks} = require('../models/acceptedWork')

exports.getAllWorks = (req,res)=>{
    const user = req.user;
    console.log("Request User:", user);
    if(user.role =="company") return res.status(400).send("Not authorized to see work!")
    const works = readWork();
     const work = works.filter((work)=> work.isAccepted == false);
     console.log("Works sent to the frontend:", works); // Debugging log
    res.status(200).json(work)
}

exports.acceptWork = (req, res) => {
    const works = readWork();
    const workId = parseInt(req.params.id);
    const {accepted, counter } = req.body;
    const user = req.user;

    if (user.role === "company") return res.status(403).send("Companies cannot accept work!");

    const work = works.find((a) => a.id === workId);
    console.log(work);
    if (!work) return res.status(404).send("Work not found.");

    if (accepted === "counter" && work.isNegotiable) {
        if (counter == null || isNaN(counter) || counter <= 0) {
            return res.status(400).send("Invalid counter offer.");
        }
    } else if (accepted !== "yes" || (accepted === "yes" && counter != null)) {
        return res.status(400).send("Invalid request parameters.");
    }

    const acceptedworks = ReadAcceptedWorks();
    const isAlreadyAccepted = acceptedworks.some(
        (a) => a.workId === workId && a.freelancerName === `${user.firstName} ${user.lastName}`
    );
    if (isAlreadyAccepted) {
        return res.status(400).send("You have already responded to this work.");
    }

    const newAcceptance = {
        id: acceptedworks.length>0 ?  acceptedworks[acceptedworks.length-1].id+1:1,
        workId: work.id,
        workName: work.title, 
        companyName: work.workBy,
        counterOffer: accepted === "counter" ? counter : null,
        freelancerName: `${user.firstName} ${user.lastName}`,
        accepted: accepted ==="yes" ? "yes" : counter
    };
    if(newAcceptance.accepted == "yes")
    {
       work.isAccepted = true;
       writeWork(works);
    }
    acceptedworks.push(newAcceptance);
    writeAcceptedWorks(acceptedworks);

    const message = accepted === "counter" 
        ? "Work sent for counter!" 
        : "Work accepted successfully.";
    res.status(201).send(message);
};


exports.worksOnSkills = (req, res) => {
    const user = req.user;
    if (user.role === "company") return res.status(401).send("Access Denied for Company!");

    const works = readWork();
    const { skills } = req.body;

    if (!skills || !Array.isArray(skills) || skills.length === 0) {
        return res.status(404).send("Invalid Input");
    }

    const lowerCaseSkills = skills.map(skill => skill.toLowerCase());
    const availableWorks = works.filter(
        (work) =>
            !work.isAccepted && 
            work.requirements.some(reqSkill =>
                lowerCaseSkills.includes(reqSkill.toLowerCase())
            )
    );

    if (availableWorks.length === 0) return res.status(400).send("No work to display!");
    return res.status(200).json(availableWorks);
};
