const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true
  },
  fileUrl: {
    type: String,
    required: [true, 'File URL is required']
  },
  publicId: {
    type: String,
    required: [true, 'Public ID is required']
  }
}, { timestamps: true });

const Resume = mongoose.model('Resume', resumeSchema);

module.exports = Resume;