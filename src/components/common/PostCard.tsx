import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, Heart, MessageCircle, User, MapPin, Eye } from 'lucide-react';
import { format } from 'date-fns';
import { BlogPost } from '../../types';
import BookmarkButton from './BookmarkButton';
import ShareButton from './ShareButton';

interface PostCardProps {
  post: BlogPost;
  featured?: boolean;
}

const PostCard: React.FC<PostCardProps> = ({ post, featured = false }) => {
  const cardClass = featured
    ? 'group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden'
    : 'group bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 overflow-hidden';

  const handleBookmarkToggle = (postId: string, isBookmarked: boolean) => {
    // In a real app, this would update the backend
    console.log(`${isBookmarked ? 'Bookmarked' : 'Unbookmarked'} post ${postId}`);
  };

  return (
    <article className={cardClass}>
      {/* Image */}
      <div className="relative overflow-hidden">
        <Link to={`/post/${post.slug}`}>
          <img
            src={post.featuredImage}
            alt={post.title}
            className={`w-full object-cover group-hover:scale-105 transition-transform duration-300 ${
              featured ? 'h-64 lg:h-80' : 'h-48'
            }`}
          />
        </Link>
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className={`${post.category.color} text-white text-xs font-medium px-3 py-1 rounded-full`}>
            {post.category.name}
          </span>
        </div>
        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex space-x-2">
          <BookmarkButton
            postId={post.id}
            isBookmarked={post.isBookmarked}
            onToggle={handleBookmarkToggle}
            size="small"
          />
          <ShareButton
            url={`${window.location.origin}/post/${post.slug}`}
            title={post.title}
            description={post.excerpt}
            size="small"
          />
        </div>
        {/* Difficulty Badge */}
        {post.difficulty && (
          <div className="absolute bottom-4 left-4">
            <span className={`text-white text-xs font-medium px-2 py-1 rounded-full ${
              post.difficulty === 'easy' ? 'bg-green-500' :
              post.difficulty === 'moderate' ? 'bg-yellow-500' :
              post.difficulty === 'challenging' ? 'bg-orange-500' :
              'bg-red-500'
            }`}>
              {post.difficulty}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className={`p-6 ${featured ? 'lg:p-8' : ''}`}>
        {/* Author and Date */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <img
              src={post.author.avatar || `https://ui-avatars.com/api/?name=${post.author.name}&background=3B82F6&color=fff`}
              alt={post.author.name}
              className="h-8 w-8 rounded-full"
            />
            <div>
              <span className="text-sm font-medium text-gray-700">{post.author.name}</span>
              {post.author.isVerified && (
                <span className="ml-1 text-blue-500">✓</span>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-1 text-gray-500">
            <Calendar className="h-4 w-4" />
            <span className="text-sm">{format(post.publishedAt, 'MMM dd, yyyy')}</span>
          </div>
        </div>

        {/* Location */}
        {post.location && (
          <div className="flex items-center space-x-1 text-gray-500 mb-3">
            <MapPin className="h-4 w-4" />
            <span className="text-sm">{post.location.name}</span>
          </div>
        )}

        {/* Title */}
        <h3 className={`font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors ${
          featured ? 'text-2xl lg:text-3xl' : 'text-xl'
        }`}>
          <Link to={`/post/${post.slug}`}>{post.title}</Link>
        </h3>

        {/* Excerpt */}
        <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>

        {/* Budget */}
        {post.budget && (
          <div className="mb-4">
            <span className="text-sm text-gray-600">
              Budget: {post.budget.currency} {post.budget.amount.toLocaleString()}
            </span>
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full hover:bg-gray-200 transition-colors"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Meta Info */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <Eye className="h-4 w-4" />
              <span>{post.views.toLocaleString()}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{post.readTime} min read</span>
            </div>
            <div className="flex items-center space-x-1">
              <Heart className="h-4 w-4" />
              <span>{post.likes}</span>
            </div>
            <div className="flex items-center space-x-1">
              <MessageCircle className="h-4 w-4" />
              <span>{post.comments.length}</span>
            </div>
          </div>
          <Link
            to={`/post/${post.slug}`}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
          >
            Read More →
          </Link>
        </div>
      </div>
    </article>
  );
};

export default PostCard;