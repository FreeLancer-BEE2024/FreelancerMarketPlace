const express = require("express");
const cors = require("cors");
const morgan = require("morgan");


require("dotenv").config();
const app = express();
app.use(cors())
app.use(morgan("dev"));
app.use(express.json()); // Middleware to parse JSON bodies

const PORT = process.env.PORT || 3000;

app.get("/first", (req, res) =>{

    data = 5

    res.status(200).json({data})
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
