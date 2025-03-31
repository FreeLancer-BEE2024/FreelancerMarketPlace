const mongoose = require('mongoose');

const acceptedSchema = new mongoose.Schema({
    workId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Work",
        required: true
    },
    freelancerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
    freelancerName: {
        type: String,
        required: true
    },
    counterOffer: {
        type: Number,
        default: null
    },
    accepted: {
        type: Boolean,
        default: false
    },
    price: {
        type: Number,
        required: function() {
            return this.accepted === true;
        }
    }
});

module.exports = mongoose.model("Accepted", acceptedSchema);