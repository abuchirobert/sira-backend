const mongoose = require('mongoose')

const reportSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User'
        },
        evidence: {
            type: String,
            trim: true,
            required: [true, '{PATH} is Required']
        },
        issueType: {
            type: String,
            trim: true,
            required: [true, '{PATH} is Required']
        },
        location: {
            type: String,
            trim: true,
            required: [true, '{PATH} is Required']
        },
        description: {
            type: String,
            required: [true, '{PATH} is Required']
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

const Report = mongoose.model('report', reportSchema)
module.exports = Report