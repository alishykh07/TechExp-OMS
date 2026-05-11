const mongoose = require("mongoose");

const ReportSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true,
    },

    username: String,

    userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
    },

    reportDocument: {
        type: String
    },

    startDate: {
        type: Date,
        required: true,
    },

    endDate: {
        type: Date,
        required: true,
    },

    approve: {
        type: Boolean,
        default: false,
    },

    submitedBy: {
        type: String,
        required: true,
    }
},{timestamps:true});

const ReportsModel = mongoose.model('reports', ReportSchema)
module.exports = ReportsModel