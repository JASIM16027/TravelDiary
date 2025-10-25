import bcrypt from 'bcryptjs';
import { PasswordRequirements } from '../types';

/**
 * Validates password strength according to security requirements
 * Minimum 12 characters, mix of uppercase, lowercase, numbers, and symbols
 */
export const validatePasswordStrength = (password: string): PasswordRequirements => {
  const minLength = password.length >= 12;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSymbols = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]/.test(password);
  
  const isStrong = minLength && hasUppercase && hasLowercase && hasNumbers && hasSymbols;
  
  return {
    minLength,
    hasUppercase,
    hasLowercase,
    hasNumbers,
    hasSymbols,
    isStrong,
  };
};

/**
 * Generates a secure password hash using bcrypt
 */
export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 12; // Higher rounds for better security
  return await bcrypt.hash(password, saltRounds);
};

/**
 * Verifies a password against its hash
 */
export const verifyPassword = async (password: string, hash: string): Promise<boolean> => {
  return await bcrypt.compare(password, hash);
};

/**
 * Generates a secure verification token
 */
export const generateVerificationToken = (): string => {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};

/**
 * Validates email format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validates phone number format (basic international format)
 */
export const isValidPhone = (phone: string): boolean => {
  // Remove all non-digit characters
  const digits = phone.replace(/\D/g, '');
  // Check if it's between 10-15 digits (international standard)
  return digits.length >= 10 && digits.length <= 15;
};

/**
 * Sanitizes user input to prevent XSS attacks
 */
export const sanitizeInput = (input: string): string => {
  return input
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim();
};

/**
 * Checks if password contains common weak patterns
 */
export const checkWeakPasswordPatterns = (password: string): string[] => {
  const warnings: string[] = [];
  
  // Check for common patterns
  if (password.includes('password') || password.includes('Password')) {
    warnings.push('Avoid using "password" in your password');
  }
  
  if (password.includes('123') || password.includes('abc')) {
    warnings.push('Avoid sequential characters');
  }
  
  if (password.match(/(.)\1{2,}/)) {
    warnings.push('Avoid repeating the same character multiple times');
  }
  
  // Check for keyboard patterns
  const keyboardPatterns = [
    'qwerty', 'asdfgh', 'zxcvbn', 'qwertyuiop', 'asdfghjkl', 'zxcvbnm'
  ];
  
  for (const pattern of keyboardPatterns) {
    if (password.toLowerCase().includes(pattern)) {
      warnings.push('Avoid keyboard patterns');
      break;
    }
  }
  
  return warnings;
};
