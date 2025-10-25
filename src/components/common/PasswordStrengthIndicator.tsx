import React from 'react';
import { Check, X } from 'lucide-react';
import { PasswordRequirements } from '../types';

interface PasswordStrengthIndicatorProps {
  requirements: PasswordRequirements;
  password: string;
}

const PasswordStrengthIndicator: React.FC<PasswordStrengthIndicatorProps> = ({
  requirements,
  password,
}) => {
  const getStrengthColor = () => {
    if (requirements.isStrong) return 'text-green-600';
    if (password.length >= 8) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getStrengthText = () => {
    if (requirements.isStrong) return 'Strong';
    if (password.length >= 8) return 'Medium';
    return 'Weak';
  };

  const RequirementItem: React.FC<{ met: boolean; text: string }> = ({ met, text }) => (
    <div className="flex items-center gap-2 text-sm">
      {met ? (
        <Check className="h-4 w-4 text-green-600" />
      ) : (
        <X className="h-4 w-4 text-red-500" />
      )}
      <span className={met ? 'text-green-600' : 'text-gray-600'}>{text}</span>
    </div>
  );

  return (
    <div className="space-y-3">
      {/* Strength Meter */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-700">Password Strength</span>
          <span className={`text-sm font-medium ${getStrengthColor()}`}>
            {getStrengthText()}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-300 ${
              requirements.isStrong
                ? 'bg-green-500 w-full'
                : password.length >= 8
                ? 'bg-yellow-500 w-2/3'
                : 'bg-red-500 w-1/3'
            }`}
          />
        </div>
      </div>

      {/* Requirements Checklist */}
      <div className="space-y-2">
        <RequirementItem
          met={requirements.minLength}
          text="At least 12 characters"
        />
        <RequirementItem
          met={requirements.hasUppercase}
          text="One uppercase letter"
        />
        <RequirementItem
          met={requirements.hasLowercase}
          text="One lowercase letter"
        />
        <RequirementItem
          met={requirements.hasNumbers}
          text="One number"
        />
        <RequirementItem
          met={requirements.hasSymbols}
          text="One special character"
        />
      </div>
    </div>
  );
};

export default PasswordStrengthIndicator;
