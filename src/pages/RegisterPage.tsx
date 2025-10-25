import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, Phone } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from '../components/common/LoadingSpinner';
import PasswordStrengthIndicator from '../components/common/PasswordStrengthIndicator';
import Captcha from '../components/common/Captcha';
import EmailVerification from '../components/common/EmailVerification';
import { validatePasswordStrength, checkWeakPasswordPatterns, sanitizeInput } from '../utils/security';
import { RegistrationData } from '../types';

const inputBase =
  'appearance-none block w-full pl-10 pr-10 py-2 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm';

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState<RegistrationData>({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false,
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [passwordRequirements, setPasswordRequirements] = useState(validatePasswordStrength(''));
  const [passwordWarnings, setPasswordWarnings] = useState<string[]>([]);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [showEmailVerification, setShowEmailVerification] = useState(false);
  const [isResendingVerification, setIsResendingVerification] = useState(false);
  
  const { register, verifyEmail, resendVerification, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (field: keyof RegistrationData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    if (field === 'password') {
      const requirements = validatePasswordStrength(value as string);
      const warnings = checkWeakPasswordPatterns(value as string);
      setPasswordRequirements(requirements);
      setPasswordWarnings(warnings);
    }
    
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate form data
    if (!formData.name.trim()) {
      setError('Name is required');
      return;
    }

    if (!formData.email.trim()) {
      setError('Email is required');
      return;
    }

    if (!formData.password) {
      setError('Password is required');
      return;
    }

    if (!passwordRequirements.isStrong) {
      setError('Password does not meet security requirements');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!captchaToken) {
      setError('Please complete the CAPTCHA verification');
      return;
    }

    if (!formData.termsAccepted) {
      setError('You must accept the terms and conditions');
      return;
    }

    try {
      // Sanitize input data
      const sanitizedData: RegistrationData = {
        ...formData,
        name: sanitizeInput(formData.name),
        email: sanitizeInput(formData.email).toLowerCase(),
        phone: formData.phone ? sanitizeInput(formData.phone) : undefined,
      };

      await register(sanitizedData);
      setShowEmailVerification(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed. Please try again.');
    }
  };

  const handleEmailVerification = async (token: string) => {
    try {
      await verifyEmail(token);
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Email verification failed');
    }
  };

  const handleResendVerification = async () => {
    setIsResendingVerification(true);
    try {
      await resendVerification('email', formData.email);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to resend verification email');
    } finally {
      setIsResendingVerification(false);
    }
  };

  // Show email verification screen if registration was successful
  if (showEmailVerification) {
    return (
      <EmailVerification
        email={formData.email}
        onResendVerification={handleResendVerification}
        onVerifyEmail={handleEmailVerification}
        isResending={isResendingVerification}
        verificationSent={true}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Join Travel Diary</h2>
          <p className="text-sm text-gray-600 mt-2">
            Create your account and start sharing your adventures
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          <div className="space-y-4">
            {/* Full Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name *
              </label>
              <div className="relative mt-1">
                <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={inputBase}
                  placeholder="Enter your full name"
                  aria-label="Full name"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address *
              </label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={inputBase}
                  placeholder="Enter your email"
                  aria-label="Email address"
                />
              </div>
            </div>

            {/* Phone (Optional) */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone Number (Optional)
              </label>
              <div className="relative mt-1">
                <Phone className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className={inputBase}
                  placeholder="Enter your phone number"
                  aria-label="Phone number"
                />
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Include country code (e.g., +1 for US)
              </p>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password *
              </label>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className={inputBase}
                  placeholder="Create a strong password"
                  aria-label="Password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 focus:outline-none"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              
              {/* Password Strength Indicator */}
              {formData.password && (
                <div className="mt-3">
                  <PasswordStrengthIndicator
                    requirements={passwordRequirements}
                    password={formData.password}
                  />
                  
                  {/* Password Warnings */}
                  {passwordWarnings.length > 0 && (
                    <div className="mt-2 space-y-1">
                      {passwordWarnings.map((warning, index) => (
                        <p key={index} className="text-xs text-yellow-600">
                          ⚠️ {warning}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password *
              </label>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  className={inputBase}
                  placeholder="Confirm your password"
                  aria-label="Confirm password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 focus:outline-none"
                  aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* CAPTCHA */}
          <div>
            <Captcha
              onVerify={setCaptchaToken}
              onError={(error) => console.error('CAPTCHA error:', error)}
              onExpire={() => setCaptchaToken(null)}
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="text-sm text-red-600 text-center" aria-live="polite">
              {error}
            </div>
          )}

          {/* Terms & Conditions */}
          <div className="flex items-start text-sm">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              required
              checked={formData.termsAccepted}
              onChange={(e) => handleInputChange('termsAccepted', e.target.checked)}
              className="h-4 w-4 mt-1 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="terms" className="ml-2 text-gray-700">
              I agree to the{' '}
              <Link to="/terms" className="text-blue-600 hover:underline">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link to="/privacy" className="text-blue-600 hover:underline">
                Privacy Policy
              </Link>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading || !passwordRequirements.isStrong || !captchaToken || !formData.termsAccepted}
            className="w-full flex justify-center items-center gap-2 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {isLoading ? <LoadingSpinner size="small" /> : 'Create Account'}
          </button>

          {/* Redirect to Login */}
          <p className="text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
