const fs = require('fs');
const path = require('path');
const userFile= path.join(__dirname,'../users.json');

const readUsers  = ()=>{
    try {
        if (!fs.existsSync(userFile)) {
          // If the file does not exist, return an empty array
          return [];
        }
        const data = fs.readFileSync(userFile, "utf-8");
        return data.trim() === "" ? [] : JSON.parse(data);
      } catch (error) {
        console.error("Error reading users file:", error.message);
        return []; // Return an empty array if there's an error
      }
}

const writeUsers = (data)=>{
    try {
        fs.writeFileSync(userFile, JSON.stringify(data, null, 2), "utf-8");
      } catch (error) {
        console.error("Error writing to users file:", error.message);
      }
}


module.exports = {
    readUsers,
    writeUsers
}
