import { BlogPost, Category, User, Notification } from '../types';

export const mockUser: User = {
  id: '1',
  name: 'Jasim Uddin',
  email: 'jasimcse27@gmail.com',
  avatar: '',
  bio: 'Travel writer exploring the beauty of Bangladesh through words and lenses.',
  location: 'Mirpur, Dhaka, Bangladesh',
  joinDate: new Date('2023-01-15'),
  followers: 3200,
  following: 400,
  postsCount: 25,
  isVerified: true,
  socialLinks: {
    website: '',
    instagram: 'https://instagram.com/jasim_travels',
    twitter: '',
    youtube: '',
  },
};

export const categories: Category[] = [
  {
    id: '1',
    name: 'Heritage',
    slug: 'heritage',
    description: 'Explore historical landmarks and cultural heritage sites in Bangladesh',
    color: 'bg-yellow-600',
    icon: '🏯',
    postsCount: 12,
  },
  {
    id: '2',
    name: 'Nature',
    slug: 'nature',
    description: 'Natural beauty, hills, rivers, and wildlife of Bangladesh',
    color: 'bg-green-600',
    icon: '🌿',
    postsCount: 15,
  },
  {
    id: '3',
    name: 'Food',
    slug: 'food',
    description: 'Street food and traditional Bangladeshi dishes',
    color: 'bg-red-600',
    icon: '🍛',
    postsCount: 10,
  },
  {
    id: '4',
    name: 'City Life',
    slug: 'city-life',
    description: 'Discovering stories and sights from Dhaka and other cities',
    color: 'bg-blue-600',
    icon: '🏙️',
    postsCount: 8,
  },
];

export const mockPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Exploring the Mangrove Mysteries of Sundarbans',
    slug: 'exploring-sundarbans',
    excerpt: 'A journey into the world’s largest mangrove forest, home of the Royal Bengal Tiger.',
    content: `The Sundarbans, located in the southwestern part of Bangladesh, is a UNESCO World Heritage Site that offers a unique combination of wilderness, waterways, and wildlife...

## Top Experiences:
- Spotting deer and crocodiles along the riverbanks
- Cruising through narrow canals with the sound of birds and monkeys echoing through the forest
- Staying overnight in eco-resorts near Mongla`,
    featuredImage: 'https://images.pexels.com/photos/2422464/pexels-photo-2422464.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=1260&h=750',
    gallery: [],
    author: mockUser,
    category: categories[1],
    tags: ['Sundarbans', 'Wildlife', 'Bangladesh'],
    publishedAt: new Date('2024-04-02'),
    readTime: 6,
    likes: 145,
    views: 5643,
    shares: 32,
    comments: [],
    isLiked: true,
    isBookmarked: false,
    status: 'published',
    location: {
      name: 'Sundarbans, Bangladesh',
      coordinates: { lat: 21.9497, lng: 89.1833 },
    },
    travelDates: {
      start: new Date('2024-03-25'),
      end: new Date('2024-03-29'),
    },
    budget: {
      amount: 12000,
      currency: 'BDT',
    },
    difficulty: 'moderate',
    season: ['Winter'],
  },
  {
    id: '2',
    title: 'A Street Food Journey Through Old Dhaka',
    slug: 'street-food-old-dhaka',
    excerpt: 'From biryani to bakarkhani, explore the flavors of Dhaka’s historic food streets.',
    content: `Old Dhaka is a paradise for food lovers. Walking through Chawk Bazaar or Nazira Bazar is like entering a maze of sizzling kebabs, creamy firni, and spicy street-side chaats.

## Must-Try Foods:
- Haji Biryani
- Kacchi from Fakhruddin
- Bakarkhani and tea at Nanna's
- Seasonal iftar platters during Ramadan`,
    featuredImage: 'https://images.pexels.com/photos/3323688/pexels-photo-3323688.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=1260&h=750',
    gallery: [],
    author: mockUser,
    category: categories[2],
    tags: ['Dhaka', 'Food', 'Culture'],
    publishedAt: new Date('2024-04-20'),
    readTime: 5,
    likes: 201,
    views: 4823,
    shares: 27,
    comments: [],
    isLiked: false,
    isBookmarked: true,
    status: 'published',
    location: {
      name: 'Old Dhaka, Bangladesh',
      coordinates: { lat: 23.7104, lng: 90.4074 },
    },
    travelDates: {
      start: new Date('2024-04-10'),
      end: new Date('2024-04-11'),
    },
    budget: {
      amount: 2500,
      currency: 'BDT',
    },
    difficulty: 'easy',
    season: ['Summer', 'Ramadan'],
  },
  {
    id: '3',
    title: 'A Weekend in Srimangal: The Tea Capital',
    slug: 'weekend-srimangal',
    excerpt: 'Lush tea gardens, lemon orchards, and the smell of seven-layer tea await you in this peaceful town.',
    content: `Srimangal is the ideal destination for a quick getaway. Located in Sylhet, it’s famous for its tea estates, Lawachara rainforest, and hospitality.

## Highlights:
- Seven-layer tea at Nilkantha
- Cycling through tea estates
- Visiting Lawachara National Park`,
    featuredImage: 'https://images.pexels.com/photos/2088213/pexels-photo-2088213.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=1260&h=750',
    gallery: [],
    author: mockUser,
    category: categories[1],
    tags: ['Sylhet', 'Tea', 'Bangladesh'],
    publishedAt: new Date('2024-03-15'),
    readTime: 4,
    likes: 102,
    views: 3290,
    shares: 18,
    comments: [],
    isLiked: false,
    isBookmarked: true,
    status: 'published',
    location: {
      name: 'Srimangal, Bangladesh',
      coordinates: { lat: 24.3081, lng: 91.7296 },
    },
    travelDates: {
      start: new Date('2024-03-10'),
      end: new Date('2024-03-12'),
    },
    budget: {
      amount: 3500,
      currency: 'BDT',
    },
    difficulty: 'easy',
    season: ['Winter'],
  },
];

export const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'like',
    title: 'New Like',
    message: 'Rafi Khan liked your post "Exploring the Mangrove Mysteries of Sundarbans"',
    read: false,
    createdAt: new Date('2024-04-03T10:00:00'),
    actionUrl: '/post/exploring-sundarbans',
  },
  {
    id: '2',
    type: 'comment',
    title: 'New Comment',
    message: 'Nusrat Jahan commented on your post "A Street Food Journey Through Old Dhaka"',
    read: false,
    createdAt: new Date('2024-04-20T19:30:00'),
    actionUrl: '/post/street-food-old-dhaka',
  },
  {
    id: '3',
    type: 'follow',
    title: 'New Follower',
    message: 'Tanvir Hasan started following you',
    read: true,
    createdAt: new Date('2024-04-01T08:20:00'),
    actionUrl: '/profile/tanvir-hasan',
  },
];
