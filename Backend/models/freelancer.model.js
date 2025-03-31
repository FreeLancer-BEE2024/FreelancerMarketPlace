const mongoose = require("mongoose");

const freelancerSchema = new mongoose.Schema({
    userID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    workEx:{
        type: Number,
        required: true
    },
    expertise:{
        type: [String],
        required: true
    },
    rates:{
        type: Number,
        required: true
    },
    reviews:{
        type: Number,
        required: true
    },
    projectsCompleted:{
        type: Number,
        required: true
    }
})


module.exports = mongoose.model("Freelancer", freelancerSchema);
