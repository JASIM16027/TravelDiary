import rateLimit from 'express-rate-limit';
import bcrypt from 'bcrypt';
import User from '../models/User.js';
import LoginAttempt from '../models/LoginAttempt.js';

// Rate limiter: 5 requests per 15 minutes per IP for login route
export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many login attempts from this IP, please try again later' }
});

// Authenticate middleware used by POST /api/auth/login
export async function authenticate(req, res, next) {
  const { email, password } = req.body;
  const identifier = (email || '').toString().trim().toLowerCase();

  // basic validation
  if (!identifier || !password) {
    return res.status(400).json({ message: 'email and password are required' });
  }

  try {
    // find user by email or username
    const user = await User.findOne({
      $or: [{ email: identifier }, { username: identifier }]
    });

    // Log helper
    const logAttempt = async (success) => {
      try {
        await LoginAttempt.create({
          email: identifier,
          success,
          ip: req.ip,
          userAgent: req.headers['user-agent'] || '',
          timestamp: new Date()
        });
      } catch (e) {
        // don't block auth on logging errors
        console.error('Failed to log login attempt:', e);
      }
    };

    if (!user) {
      await logAttempt(false);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check for account lockout
    if (user.lockedUntil && user.lockedUntil > Date.now()) {
      return res.status(423).json({ message: 'Account is locked. Try again later.' });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      // increment failed attempts
      user.failedLoginAttempts = (user.failedLoginAttempts || 0) + 1;

      const MAX_FAILED = 5; // threshold
      const LOCK_DURATION_MS = 15 * 60 * 1000; // 15 minutes

      if (user.failedLoginAttempts >= MAX_FAILED) {
        user.lockedUntil = new Date(Date.now() + LOCK_DURATION_MS);
        user.failedLoginAttempts = 0; // reset counter after locking
      }

      await user.save();
      await logAttempt(false);

      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Successful login: reset counters
    user.failedLoginAttempts = 0;
    user.lockedUntil = null;
    await user.save();

    await logAttempt(true);

    // attach user to request for downstream handlers
    req.user = user;
    next();
  } catch (err) {
    console.error('Authentication error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
}