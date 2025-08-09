import React, { useState } from 'react';
import { mockPosts } from '../data/mockData';
import PostCard from '../components/common/PostCard';
import SearchBar from '../components/common/SearchBar';
import { SearchFilters } from '../types';

const PostsPage: React.FC = () => {
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    sortBy: 'newest',
  });

  const handleSearch = (newFilters: SearchFilters) => {
    setFilters(newFilters);
  };

  const filteredPosts = mockPosts
    .filter(post => {
      // Text search
      const matchesQuery = !filters.query || 
        post.title.toLowerCase().includes(filters.query.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(filters.query.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(filters.query.toLowerCase()));
      
      // Category filter
      const matchesCategory = !filters.category || post.category.slug === filters.category;
      
      // Location filter
      const matchesLocation = !filters.location || 
        (post.location && post.location.name.toLowerCase().includes(filters.location.toLowerCase()));
      
      // Difficulty filter
      const matchesDifficulty = !filters.difficulty || post.difficulty === filters.difficulty;
      
      // Read time filter
      const matchesReadTime = (!filters.minReadTime || post.readTime >= filters.minReadTime) &&
                             (!filters.maxReadTime || post.readTime <= filters.maxReadTime);
      
      return matchesQuery && matchesCategory && matchesLocation && matchesDifficulty && matchesReadTime;
    })
    .sort((a, b) => {
      switch (filters.sortBy) {
        case 'newest':
          return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
        case 'oldest':
          return new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime();
        case 'popular':
          return b.likes - a.likes;
        case 'trending':
          return b.views - a.views;
        case 'relevant':
          // Simple relevance based on likes + views
          return (b.likes + b.views) - (a.likes + a.views);
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Travel Stories
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Explore our collection of travel adventures and get inspired for your next journey.
          </p>
          
          {/* Advanced Search */}
          <SearchBar onSearch={handleSearch} initialFilters={filters} />
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">
            {filteredPosts.length} {filteredPosts.length === 1 ? 'post' : 'posts'} found
          </p>
        </div>

        {filteredPosts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No posts found matching your criteria.</p>
            <p className="text-gray-400 mt-2">Try adjusting your search or filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostsPage;