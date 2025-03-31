const mongoose = require("mongoose"); 


const workSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  requirements: {
    type: [String],
    required: true,
  },
  budget: {
    type: Number,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },  
  workBy:{
    type: String,
    ref: "Company",
    required: true
  },
  isNegotiable: {
    type: Boolean,
    required: true,
  },
  isAccepted: {
    type: Boolean,
    default: false
  }

})

module.exports = mongoose.model("Work", workSchema);