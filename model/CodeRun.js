const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CodeRunSchema = new Schema({
    code: { type: String, required: true },
    input: String,
    output: String,
    language: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('CodeRun', CodeRunSchema);
