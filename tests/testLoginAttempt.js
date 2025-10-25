import mongoose from 'mongoose';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Import LoginAttempt model using dynamic import
const LoginAttempt = (await import(path.join(__dirname, '../models/LoginAttempt.js'))).default;

async function testLoginAttempt() {
  try {
    console.log('Attempting to connect to MongoDB...');
    await mongoose.connect('mongodb://127.0.0.1:27017/travel-diary', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Successfully connected to MongoDB');

    // Create a test login attempt
    const loginAttempt = new LoginAttempt({
      email: 'test@example.com',
      success: true,
      ip: '127.0.0.1',
      userAgent: 'Mozilla/5.0 (Test Browser)',
      timestamp: new Date()
    });

    // Save the attempt
    const savedAttempt = await loginAttempt.save();
    console.log('Login attempt saved:', savedAttempt);

    // Fetch all attempts
    const attempts = await LoginAttempt.find();
    console.log('All login attempts:', attempts);

    // Close connection
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

testLoginAttempt();