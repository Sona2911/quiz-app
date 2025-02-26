const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  options: {
    type: [String],
    required: true,
  },
  correctAnswer: {
    type: String,
    required: true,
  },
});

// Prevent model overwrite error
module.exports = mongoose.models.Quiz || mongoose.model('Quiz', quizSchema);
