const mongoose = require('mongoose');
const signupSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true }, 
  password: { type: String, required: true },
  comfirmPassword: { type: String, required: true },
  email: { type: String },
  address: { type: String },
  phoneNumber: { type: String },
  district: { type: String }
});

module.exports = mongoose.model('SignUp', signupSchema);