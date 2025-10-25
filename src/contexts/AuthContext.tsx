import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthState, User, RegistrationData, VerificationToken } from '../types';
import { mockUser } from '../data/mockData';
import { hashPassword, verifyPassword, generateVerificationToken, isValidEmail, isValidPhone } from '../utils/security';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (registrationData: RegistrationData) => Promise<void>;
  sendVerificationEmail: (email: string) => Promise<void>;
  verifyEmail: (token: string) => Promise<void>;
  sendVerificationSMS: (phone: string) => Promise<void>;
  verifyPhone: (token: string) => Promise<void>;
  resendVerification: (type: 'email' | 'phone', identifier: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  // In-memory storage for demo purposes - in production, this would be in a database
  const [pendingVerifications, setPendingVerifications] = useState<Map<string, VerificationToken>>(new Map());

  useEffect(() => {
    // Simulate checking for existing auth token
    const token = localStorage.getItem('auth-token');
    if (token) {
      setAuthState({
        user: mockUser,
        isAuthenticated: true,
        isLoading: false,
      });
    } else {
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  }, []);

  const login = async (email: string, password: string) => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    
    // Validate email format
    if (!isValidEmail(email)) {
      throw new Error('Invalid email format');
    }
    
    // Simulate API call with password verification
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In production, you would verify the password hash here
    // const isValid = await verifyPassword(password, storedHash);
    // if (!isValid) throw new Error('Invalid credentials');
    
    localStorage.setItem('auth-token', 'mock-token');
    setAuthState({
      user: mockUser,
      isAuthenticated: true,
      isLoading: false,
    });
  };

  const logout = () => {
    localStorage.removeItem('auth-token');
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  };

  const register = async (registrationData: RegistrationData) => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    
    try {
      // Validate input data
      if (!registrationData.name.trim()) {
        throw new Error('Name is required');
      }
      
      if (!isValidEmail(registrationData.email)) {
        throw new Error('Invalid email format');
      }
      
      if (registrationData.phone && !isValidPhone(registrationData.phone)) {
        throw new Error('Invalid phone number format');
      }
      
      if (!registrationData.termsAccepted) {
        throw new Error('You must accept the terms and conditions');
      }
      
      // Hash the password
      const hashedPassword = await hashPassword(registrationData.password);
      
      // Simulate API call to create user
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create user with verification status
      const newUser: User = {
        ...mockUser,
        name: registrationData.name.trim(),
        email: registrationData.email.toLowerCase(),
        phone: registrationData.phone,
        isEmailVerified: false,
        isPhoneVerified: false,
      };
      
      // Generate verification token for email
      const emailToken = generateVerificationToken();
      const verificationToken: VerificationToken = {
        token: emailToken,
        type: 'email',
        expiresAt: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes
        userId: newUser.id,
      };
      
      setPendingVerifications(prev => new Map(prev.set(registrationData.email, verificationToken)));
      
      // Send verification email
      await sendVerificationEmail(registrationData.email);
      
      // Store user data temporarily (in production, this would be in database)
      localStorage.setItem('pending-user', JSON.stringify(newUser));
      
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
      
    } catch (error) {
      setAuthState(prev => ({ ...prev, isLoading: false }));
      throw error;
    }
  };

  const sendVerificationEmail = async (email: string) => {
    // Simulate sending verification email
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log(`Verification email sent to ${email}`);
  };

  const verifyEmail = async (token: string) => {
    // Find the verification token
    const verification = Array.from(pendingVerifications.values())
      .find(v => v.token === token && v.type === 'email');
    
    if (!verification) {
      throw new Error('Invalid verification token');
    }
    
    if (verification.expiresAt < new Date()) {
      throw new Error('Verification token has expired');
    }
    
    // Get pending user data
    const pendingUserData = localStorage.getItem('pending-user');
    if (!pendingUserData) {
      throw new Error('No pending registration found');
    }
    
    const user: User = JSON.parse(pendingUserData);
    user.isEmailVerified = true;
    
    // Remove from pending verifications
    setPendingVerifications(prev => {
      const newMap = new Map(prev);
      newMap.delete(user.email);
      return newMap;
    });
    
    // Clear pending user data
    localStorage.removeItem('pending-user');
    
    // Set user as authenticated
    localStorage.setItem('auth-token', 'mock-token');
    setAuthState({
      user,
      isAuthenticated: true,
      isLoading: false,
    });
  };

  const sendVerificationSMS = async (phone: string) => {
    // Simulate sending SMS verification
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log(`Verification SMS sent to ${phone}`);
  };

  const verifyPhone = async (token: string) => {
    // Similar to email verification but for phone
    // Implementation would be similar to verifyEmail
    throw new Error('Phone verification not implemented in demo');
  };

  const resendVerification = async (type: 'email' | 'phone', identifier: string) => {
    if (type === 'email') {
      await sendVerificationEmail(identifier);
    } else {
      await sendVerificationSMS(identifier);
    }
  };

  return (
    <AuthContext.Provider value={{
      ...authState,
      login,
      logout,
      register,
      sendVerificationEmail,
      verifyEmail,
      sendVerificationSMS,
      verifyPhone,
      resendVerification,
    }}>
      {children}
    </AuthContext.Provider>
  );
};