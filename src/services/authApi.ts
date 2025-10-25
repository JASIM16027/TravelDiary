// src/services/authApi.ts

const API_BASE_URL = 'http://localhost:3000/api';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  phone?: string;
}

export interface AuthResponse {
  data: {
    token: string;
    user: {
      id: string;
      email: string;
      username: string;
      phone?: string;
    };
  };
  message?: string;
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}

/**
 * Login user with email and password
 */
export const loginUser = async (credentials: LoginRequest) => {
  try {
    console.log('Attempting login with:', { 
      email: credentials.email,
      password: '[REDACTED]' 
    });

    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Login successful:', { 
      userId: data.data?.user?.id,
      email: data.data?.user?.email 
    });
    
    return data;
  } catch (error) {
    console.error('Login failed:', error);
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      throw new Error('Cannot connect to server. Please check your internet connection.');
    }
    throw error;
  }
};

/**
 * Register new user
 */
export const registerUser = async (userData: RegisterRequest) => {
  try {
    console.log('Attempting registration with:', { 
      ...userData, 
      password: '[REDACTED]',
      confirmPassword: '[REDACTED]'
    });

    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Registration successful:', { 
      userId: data.data?.user?.id,
      email: data.data?.user?.email 
    });
    
    return data;
  } catch (error) {
    console.error('Registration failed:', error);
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      throw new Error('Cannot connect to server. Please check your internet connection.');
    }
    throw error;
  }
};

/**
 * Verify authentication token
 */
export const verifyToken = async (token: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/verify`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Token verification failed');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Token verification failed:', error);
    throw error;
  }
};

/**
 * Logout user
 */
export const logoutUser = async (token: string) => {
  try {
    await fetch(`${API_BASE_URL}/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      credentials: 'include',
    });
    console.log('Logout successful');
  } catch (error) {
    console.error('Logout API call failed:', error);
    // Silent fail - token will be removed locally anyway
  }
};

/**
 * Request password reset
 */
export const requestPasswordReset = async (email: string): Promise<{ message: string }> => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Password reset request failed');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Password reset request failed:', error);
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      throw new Error('Cannot connect to server. Please check your internet connection.');
    }
    throw error;
  }
};

/**
 * Reset password with token
 */
export const resetPassword = async (
  token: string,
  newPassword: string
): Promise<{ message: string }> => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ token, newPassword }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Password reset failed');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Password reset failed:', error);
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      throw new Error('Cannot connect to server. Please check your internet connection.');
    }
    throw error;
  }
};

/**
 * Get current user profile
 */
export const getCurrentUser = async (token: string): Promise<AuthResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user profile');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch user profile:', error);
    throw error;
  }
};