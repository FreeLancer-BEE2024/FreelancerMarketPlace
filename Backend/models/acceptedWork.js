const fs = require('fs');
const path = require('path');
const AcceptedFile= path.join(__dirname, '../acceptedWork.json');


const ReadAcceptedWorks  = ()=>{
    try {
        if (!fs.existsSync(AcceptedFile)) {
          // If the file does not exist, return an empty array
          return [];
        }
        const data = fs.readFileSync(AcceptedFile, "utf-8");
        return data.trim() === "" ? [] : JSON.parse(data);
      } catch (error) {
        console.error("Error reading users file:", error.message);
        return []; // Return an empty array if there's an error
      }
}

const writeAcceptedWorks = (data)=>{
    try 
    {
        fs.writeFileSync(AcceptedFile, JSON.stringify(data, null, 2), "utf-8");
    } catch (error) {
        console.error("Error writing to users file:", error.message);
      }
}


module.exports = {
    ReadAcceptedWorks,
    writeAcceptedWorks
}
