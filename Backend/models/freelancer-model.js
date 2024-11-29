const fs = require('fs');
const path = require('path');
const freelancersFile= path.join(__dirname, '../freelancers.json');


const readFreelancers  = ()=>{
    try {
        if (!fs.existsSync(freelancersFile)) {
          // If the file does not exist, return an empty array
          return [];
        }
        const data = fs.readFileSync(freelancersFile, "utf-8");
        return data.trim() === "" ? [] : JSON.parse(data);
      } catch (error) {
        console.error("Error reading users file:", error.message);
        return []; // Return an empty array if there's an error
      }
}

const writeFreelancers = (data)=>{
    try 
    {
        fs.writeFileSync(freelancersFile, JSON.stringify(data, null, 2), "utf-8");
    } catch (error) {
        console.error("Error writing to users file:", error.message);
      }
}


module.exports = {
    readFreelancers,
    writeFreelancers
}
