export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  bio?: string;
  location?: string;
  joinDate: Date;
  followers: number;
  following: number;
  postsCount: number;
  isVerified?: boolean;
  isEmailVerified?: boolean;
  isPhoneVerified?: boolean;
  socialLinks?: {
    website?: string;
    instagram?: string;
    twitter?: string;
    youtube?: string;
  };
}

export interface RegistrationData {
  name: string;
  email: string;
  phone?: string;
  password: string;
  confirmPassword: string;
  termsAccepted: boolean;
}

export interface VerificationToken {
  token: string;
  type: 'email' | 'phone';
  expiresAt: Date;
  userId: string;
}

export interface PasswordRequirements {
  minLength: boolean;
  hasUppercase: boolean;
  hasLowercase: boolean;
  hasNumbers: boolean;
  hasSymbols: boolean;
  isStrong: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  gallery?: string[];
  author: User;
  category: Category;
  tags: string[];
  publishedAt: Date;
  updatedAt?: Date;
  readTime: number;
  likes: number;
  views: number;
  shares: number;
  comments: Comment[];
  isLiked: boolean;
  isBookmarked: boolean;
  status: 'draft' | 'published' | 'archived';
  location?: {
    name: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  travelDates?: {
    start: Date;
    end: Date;
  };
  budget?: {
    amount: number;
    currency: string;
  };
  difficulty?: 'easy' | 'moderate' | 'challenging' | 'extreme';
  season?: string[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  color: string;
  icon?: string;
  postsCount: number;
}

export interface Comment {
  id: string;
  content: string;
  author: User;
  createdAt: Date;
  likes: number;
  replies: Comment[];
  isLiked: boolean;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface Notification {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'mention' | 'post_published';
  title: string;
  message: string;
  read: boolean;
  createdAt: Date;
  actionUrl?: string;
  actor?: User;
}

export interface SearchFilters {
  query: string;
  category?: string;
  tags?: string[];
  author?: string;
  dateRange?: {
    start: Date;
    end: Date;
  };
  location?: string;
  difficulty?: string;
  minReadTime?: number;
  maxReadTime?: number;
  sortBy: 'newest' | 'oldest' | 'popular' | 'trending' | 'relevant';
}

export interface Analytics {
  totalViews: number;
  totalLikes: number;
  totalComments: number;
  totalShares: number;
  topPosts: BlogPost[];
  viewsOverTime: { date: string; views: number }[];
  popularCategories: { category: string; count: number }[];
  audienceInsights: {
    topCountries: { country: string; percentage: number }[];
    deviceTypes: { device: string; percentage: number }[];
    trafficSources: { source: string; percentage: number }[];
  };
}