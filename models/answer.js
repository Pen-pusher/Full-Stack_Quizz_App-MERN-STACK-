const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const { Schema } = mongoose;

const answerSchema = new Schema({
  text: { type: String, required: true },
  choices: {
    type: [String],
    required: true
  },
  correctAnsIndex: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model("Answer", answerSchema);
