import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  MapPin, 
  Calendar, 
  Users, 
  FileText, 
  Heart, 
  MessageCircle, 
  Share2,
  Edit,
  Settings,
  Globe,
  Instagram,
  Twitter,
  Youtube
} from 'lucide-react';
import { format } from 'date-fns';
import { mockUser, mockPosts } from '../data/mockData';
import PostCard from '../components/common/PostCard';

const UserProfilePage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [activeTab, setActiveTab] = useState<'posts' | 'liked' | 'bookmarked'>('posts');
  const [isFollowing, setIsFollowing] = useState(false);
  
  // In a real app, you'd fetch user data based on userId
  const user = mockUser;
  const userPosts = mockPosts.filter(post => post.author.id === user.id);
  const likedPosts = mockPosts.filter(post => post.isLiked);
  const bookmarkedPosts = mockPosts.filter(post => post.isBookmarked);

  const stats = [
    { label: 'Posts', value: user.postsCount, icon: FileText },
    { label: 'Followers', value: user.followers, icon: Users },
    { label: 'Following', value: user.following, icon: Users },
  ];

  const socialLinks = [
    { platform: 'website', icon: Globe, url: user.socialLinks?.website },
    { platform: 'instagram', icon: Instagram, url: user.socialLinks?.instagram },
    { platform: 'twitter', icon: Twitter, url: user.socialLinks?.twitter },
    { platform: 'youtube', icon: Youtube, url: user.socialLinks?.youtube },
  ].filter(link => link.url);

  const getTabContent = () => {
    switch (activeTab) {
      case 'posts':
        return userPosts;
      case 'liked':
        return likedPosts;
      case 'bookmarked':
        return bookmarkedPosts;
      default:
        return userPosts;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Cover Photo */}
      <div className="h-64 lg:h-80 bg-gradient-to-r from-blue-500 to-purple-600 relative">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <img
          src="https://images.pexels.com/photos/1591373/pexels-photo-1591373.jpeg?auto=compress&cs=tinysrgb&w=1920&h=800&dpr=2"
          alt="Cover"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Profile Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative -mt-20 lg:-mt-24">
          <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-8">
            <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-6 lg:space-y-0 lg:space-x-8">
              {/* Avatar */}
              <div className="relative">
                <img
                  src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}&background=3B82F6&color=fff&size=150`}
                  alt={user.name}
                  className="w-32 h-32 lg:w-40 lg:h-40 rounded-full border-4 border-white shadow-lg"
                />
                {user.isVerified && (
                  <div className="absolute bottom-2 right-2 bg-blue-500 text-white rounded-full p-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>

              {/* User Info */}
              <div className="flex-1">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                      {user.name}
                      {user.isVerified && (
                        <span className="ml-2 text-blue-500">✓</span>
                      )}
                    </h1>
                    <p className="text-lg text-gray-600 mb-4">{user.bio}</p>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
                      {user.location && (
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span>{user.location}</span>
                        </div>
                      )}
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>Joined {format(user.joinDate, 'MMMM yyyy')}</span>
                      </div>
                    </div>

                    {/* Social Links */}
                    {socialLinks.length > 0 && (
                      <div className="flex items-center space-x-3 mb-4">
                        {socialLinks.map((link) => (
                          <a
                            key={link.platform}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                          >
                            <link.icon className="h-5 w-5" />
                          </a>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => setIsFollowing(!isFollowing)}
                      className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                        isFollowing
                          ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                    >
                      {isFollowing ? 'Following' : 'Follow'}
                    </button>
                    <button className="p-2 text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                      <MessageCircle className="h-5 w-5" />
                    </button>
                    <button className="p-2 text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                      <Share2 className="h-5 w-5" />
                    </button>
                    <button className="p-2 text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                      <Settings className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-8 pt-8 border-t border-gray-200">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <stat.icon className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-2xl font-bold text-gray-900">
                      {stat.value.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Content Tabs */}
        <div className="mt-8">
          <div className="bg-white rounded-lg shadow-sm">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                {[
                  { key: 'posts', label: 'Posts', count: userPosts.length },
                  { key: 'liked', label: 'Liked', count: likedPosts.length },
                  { key: 'bookmarked', label: 'Bookmarked', count: bookmarkedPosts.length },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key as any)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.key
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {tab.label} ({tab.count})
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-6">
              {getTabContent().length === 0 ? (
                <div className="text-center py-12">
                  <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No {activeTab} yet</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {getTabContent().map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;