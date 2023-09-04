const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const journalSchema = new Schema({
    title: { type: String },
    entry: {
        type: String,
        required: true
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    }
}, {
    timestamps: true
});


module.exports = mongoose.model('Journal', journalSchema);