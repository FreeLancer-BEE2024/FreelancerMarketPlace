const fs = require("fs");
const path = require("path");
const workFile = path.join(__dirname, "../works.json");

const readWork = () => {
  try {
    if (!fs.existsSync(workFile)) {
      return [];
    }
    const data = fs.readFileSync(workFile, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading users file:", error.message);
    return [];
  }
};

const writeWork =(data)=>{
    try{
        fs.writeFileSync(workFile, JSON.stringify(data, null, 2), "utf-8")
    }
    catch(error)
    {
        console.error("Error writing to users file:", error.message);
    }
}

module.exports={
  readWork,
  writeWork
}