import React, { useState } from 'react';
import { Mail, CheckCircle, Clock, AlertCircle } from 'lucide-react';

interface EmailVerificationProps {
  email: string;
  onResendVerification: () => Promise<void>;
  onVerifyEmail: (token: string) => Promise<void>;
  isResending?: boolean;
  verificationSent?: boolean;
}

const EmailVerification: React.FC<EmailVerificationProps> = ({
  email,
  onResendVerification,
  onVerifyEmail,
  isResending = false,
  verificationSent = false,
}) => {
  const [verificationToken, setVerificationToken] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState('');

  const handleVerifyEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!verificationToken.trim()) {
      setError('Please enter the verification code');
      return;
    }

    setIsVerifying(true);
    setError('');

    try {
      await onVerifyEmail(verificationToken);
    } catch (err) {
      setError('Invalid verification code. Please try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendVerification = async () => {
    setError('');
    try {
      await onResendVerification();
    } catch (err) {
      setError('Failed to resend verification email. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6 space-y-6">
      <div className="text-center">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 mb-4">
          <Mail className="h-6 w-6 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Verify Your Email</h2>
        <p className="text-gray-600 mt-2">
          We've sent a verification code to <strong>{email}</strong>
        </p>
      </div>

      {verificationSent && (
        <div className="bg-green-50 border border-green-200 rounded-md p-4">
          <div className="flex">
            <CheckCircle className="h-5 w-5 text-green-400" />
            <div className="ml-3">
              <p className="text-sm text-green-800">
                Verification email sent successfully!
              </p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleVerifyEmail} className="space-y-4">
        <div>
          <label htmlFor="verificationCode" className="block text-sm font-medium text-gray-700">
            Verification Code
          </label>
          <input
            id="verificationCode"
            type="text"
            value={verificationToken}
            onChange={(e) => setVerificationToken(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter 6-digit code"
            maxLength={6}
            required
          />
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <div className="flex">
              <AlertCircle className="h-5 w-5 text-red-400" />
              <div className="ml-3">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={isVerifying || !verificationToken.trim()}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isVerifying ? 'Verifying...' : 'Verify Email'}
        </button>
      </form>

      <div className="text-center">
        <p className="text-sm text-gray-600">
          Didn't receive the email?{' '}
          <button
            onClick={handleResendVerification}
            disabled={isResending}
            className="text-blue-600 hover:text-blue-500 font-medium disabled:opacity-50"
          >
            {isResending ? 'Sending...' : 'Resend verification email'}
          </button>
        </p>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
        <div className="flex">
          <Clock className="h-5 w-5 text-yellow-400" />
          <div className="ml-3">
            <p className="text-sm text-yellow-800">
              <strong>Note:</strong> The verification code expires in 15 minutes. 
              Check your spam folder if you don't see the email.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;
