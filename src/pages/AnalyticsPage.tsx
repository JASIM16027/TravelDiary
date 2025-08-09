import React, { useState } from 'react';
import { 
  TrendingUp, 
  Eye, 
  Heart, 
  MessageCircle, 
  Share2, 
  Users, 
  Globe,
  Smartphone,
  Monitor,
  Calendar
} from 'lucide-react';
import { format, subDays } from 'date-fns';

const AnalyticsPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d');

  // Mock analytics data
  const analytics = {
    totalViews: 45678,
    totalLikes: 3456,
    totalComments: 892,
    totalShares: 567,
    viewsGrowth: 12.5,
    likesGrowth: 8.3,
    commentsGrowth: 15.7,
    sharesGrowth: 6.2,
    topPosts: [
      { title: 'Discovering the Hidden Gems of Bali', views: 8945, likes: 234, comments: 67 },
      { title: 'A Foodie\'s Guide to Tokyo', views: 7632, likes: 189, comments: 45 },
      { title: 'Hiking the Swiss Alps: A Complete Guide', views: 6543, likes: 312, comments: 89 },
    ],
    viewsOverTime: Array.from({ length: 30 }, (_, i) => ({
      date: format(subDays(new Date(), 29 - i), 'MMM dd'),
      views: Math.floor(Math.random() * 1000) + 500,
    })),
    popularCategories: [
      { category: 'Adventure', count: 45, percentage: 35 },
      { category: 'Food', count: 32, percentage: 25 },
      { category: 'Culture', count: 28, percentage: 22 },
      { category: 'Nature', count: 23, percentage: 18 },
    ],
    audienceInsights: {
      topCountries: [
        { country: 'United States', percentage: 35 },
        { country: 'United Kingdom', percentage: 18 },
        { country: 'Canada', percentage: 12 },
        { country: 'Australia', percentage: 10 },
        { country: 'Germany', percentage: 8 },
      ],
      deviceTypes: [
        { device: 'Mobile', percentage: 65 },
        { device: 'Desktop', percentage: 28 },
        { device: 'Tablet', percentage: 7 },
      ],
      trafficSources: [
        { source: 'Direct', percentage: 40 },
        { source: 'Social Media', percentage: 30 },
        { source: 'Search Engines', percentage: 20 },
        { source: 'Referrals', percentage: 10 },
      ],
    },
  };

  const stats = [
    {
      label: 'Total Views',
      value: analytics.totalViews,
      growth: analytics.viewsGrowth,
      icon: Eye,
      color: 'blue',
    },
    {
      label: 'Total Likes',
      value: analytics.totalLikes,
      growth: analytics.likesGrowth,
      icon: Heart,
      color: 'red',
    },
    {
      label: 'Total Comments',
      value: analytics.totalComments,
      growth: analytics.commentsGrowth,
      icon: MessageCircle,
      color: 'green',
    },
    {
      label: 'Total Shares',
      value: analytics.totalShares,
      growth: analytics.sharesGrowth,
      icon: Share2,
      color: 'purple',
    },
  ];

  const getDeviceIcon = (device: string) => {
    switch (device) {
      case 'Mobile':
        return Smartphone;
      case 'Desktop':
        return Monitor;
      case 'Tablet':
        return Smartphone;
      default:
        return Monitor;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Analytics Dashboard</h1>
          <div className="flex items-center space-x-4">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {stat.value.toLocaleString()}
                  </p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className={`h-4 w-4 text-${stat.color}-500 mr-1`} />
                    <span className={`text-sm font-medium text-${stat.color}-600`}>
                      +{stat.growth}%
                    </span>
                    <span className="text-sm text-gray-500 ml-1">vs last period</span>
                  </div>
                </div>
                <div className={`p-3 bg-${stat.color}-100 rounded-lg`}>
                  <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Views Over Time Chart */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Views Over Time</h3>
            <div className="h-64 flex items-end space-x-1">
              {analytics.viewsOverTime.map((data, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div
                    className="w-full bg-blue-500 rounded-t"
                    style={{
                      height: `${(data.views / Math.max(...analytics.viewsOverTime.map(d => d.views))) * 200}px`,
                    }}
                  />
                  {index % 5 === 0 && (
                    <span className="text-xs text-gray-500 mt-2 transform -rotate-45">
                      {data.date}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Top Posts */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Posts</h3>
            <div className="space-y-4">
              {analytics.topPosts.map((post, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 truncate">{post.title}</h4>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                      <span className="flex items-center">
                        <Eye className="h-4 w-4 mr-1" />
                        {post.views.toLocaleString()}
                      </span>
                      <span className="flex items-center">
                        <Heart className="h-4 w-4 mr-1" />
                        {post.likes}
                      </span>
                      <span className="flex items-center">
                        <MessageCircle className="h-4 w-4 mr-1" />
                        {post.comments}
                      </span>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-gray-400">
                    #{index + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Popular Categories */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Categories</h3>
            <div className="space-y-4">
              {analytics.popularCategories.map((category) => (
                <div key={category.category}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">{category.category}</span>
                    <span className="text-sm text-gray-500">{category.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${category.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Audience by Country */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Countries</h3>
            <div className="space-y-3">
              {analytics.audienceInsights.topCountries.map((country) => (
                <div key={country.country} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Globe className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-700">{country.country}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{country.percentage}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Device Types */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Device Types</h3>
            <div className="space-y-3">
              {analytics.audienceInsights.deviceTypes.map((device) => {
                const DeviceIcon = getDeviceIcon(device.device);
                return (
                  <div key={device.device} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <DeviceIcon className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-700">{device.device}</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">{device.percentage}%</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;