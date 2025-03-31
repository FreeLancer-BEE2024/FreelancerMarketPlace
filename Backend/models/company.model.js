const mongoose  = require('mongoose');
const companySchema = new mongoose.Schema({
    userID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    companyName:{
        type: String,
        required: true
    },
    desc:{
        type: String,
        required: true
    },
    companyWebsite:{
        type: String,
        required: true
    }
})
module.exports = mongoose.model("Company", companySchema);