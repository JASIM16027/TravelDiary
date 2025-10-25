import mongoose from 'mongoose';

const loginAttemptSchema = new mongoose.Schema({
  email: String,
  success: Boolean,
  ip: String,
  userAgent: String,
  timestamp: Date
});

export default mongoose.model('LoginAttempt', loginAttemptSchema);