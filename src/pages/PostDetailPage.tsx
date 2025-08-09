import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  Heart, 
  MessageCircle, 
  Share2, 
  User, 
  ArrowLeft, 
  MapPin, 
  DollarSign,
  Eye,
  TrendingUp
} from 'lucide-react';
import { format } from 'date-fns';
import { mockPosts } from '../data/mockData';
import ImageGallery from '../components/common/ImageGallery';
import BookmarkButton from '../components/common/BookmarkButton';
import ShareButton from '../components/common/ShareButton';

const PostDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = mockPosts.find(p => p.slug === slug);
  const [isLiked, setIsLiked] = useState(post?.isLiked || false);
  const [likes, setLikes] = useState(post?.likes || 0);

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Post Not Found</h1>
          <Link to="/posts" className="text-blue-600 hover:text-blue-700">
            ← Back to Posts
          </Link>
        </div>
      </div>
    );
  }

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
  };

  const handleBookmarkToggle = (postId: string, isBookmarked: boolean) => {
    console.log(`${isBookmarked ? 'Bookmarked' : 'Unbookmarked'} post ${postId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            to="/posts"
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Posts</span>
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative">
        {post.gallery && post.gallery.length > 0 ? (
          <ImageGallery 
            images={post.gallery} 
            alt={post.title}
            className="h-96 lg:h-[32rem]"
          />
        ) : (
          <div className="h-96 lg:h-[32rem]">
            <img
              src={post.featuredImage}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center space-x-4 mb-4">
              <span className={`${post.category.color} text-white text-sm font-medium px-3 py-1 rounded-full`}>
                {post.category.name}
              </span>
              {post.difficulty && (
                <span className={`text-white text-sm font-medium px-3 py-1 rounded-full ${
                  post.difficulty === 'easy' ? 'bg-green-500' :
                  post.difficulty === 'moderate' ? 'bg-yellow-500' :
                  post.difficulty === 'challenging' ? 'bg-orange-500' :
                  'bg-red-500'
                }`}>
                  {post.difficulty}
                </span>
              )}
              <div className="flex items-center space-x-2 text-white">
                <Calendar className="h-4 w-4" />
                <span className="text-sm">{format(post.publishedAt, 'MMMM dd, yyyy')}</span>
              </div>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
              {post.title}
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl">
              {post.excerpt}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Article Header */}
          <div className="p-8 border-b border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <img
                  src={post.author.avatar || `https://ui-avatars.com/api/?name=${post.author.name}&background=3B82F6&color=fff`}
                  alt={post.author.name}
                  className="h-12 w-12 rounded-full"
                />
                <div>
                  <h3 className="font-semibold text-gray-900 flex items-center">
                    {post.author.name}
                    {post.author.isVerified && (
                      <span className="ml-2 text-blue-500">✓</span>
                    )}
                  </h3>
                  <p className="text-sm text-gray-500">{post.author.bio}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1 text-gray-500">
                  <Eye className="h-4 w-4" />
                  <span className="text-sm">{post.views.toLocaleString()} views</span>
                </div>
                <div className="flex items-center space-x-1 text-gray-500">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm">{post.readTime} min read</span>
                </div>
              </div>
            </div>

            {/* Post Meta Information */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {post.location && (
                <div className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Location</p>
                    <p className="text-sm text-gray-600">{post.location.name}</p>
                  </div>
                </div>
              )}
              
              {post.budget && (
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Budget</p>
                    <p className="text-sm text-gray-600">
                      {post.budget.currency} {post.budget.amount.toLocaleString()}
                    </p>
                  </div>
                </div>
              )}

              {post.travelDates && (
                <div className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Travel Dates</p>
                    <p className="text-sm text-gray-600">
                      {format(post.travelDates.start, 'MMM yyyy')} - {format(post.travelDates.end, 'MMM yyyy')}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleLike}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all ${
                    isLiked
                      ? 'bg-red-100 text-red-600 hover:bg-red-200'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
                  <span>{likes}</span>
                </button>
                
                <BookmarkButton
                  postId={post.id}
                  isBookmarked={post.isBookmarked}
                  onToggle={handleBookmarkToggle}
                  showText
                />
              </div>

              <ShareButton
                url={`${window.location.origin}/post/${post.slug}`}
                title={post.title}
                description={post.excerpt}
              />
            </div>
          </div>

          {/* Article Content */}
          <div className="p-8">
            <div className="prose prose-lg max-w-none">
              {post.content.split('\n').map((paragraph, index) => {
                if (paragraph.startsWith('## ')) {
                  return (
                    <h2 key={index} className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                      {paragraph.replace('## ', '')}
                    </h2>
                  );
                }
                if (paragraph.startsWith('### ')) {
                  return (
                    <h3 key={index} className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                      {paragraph.replace('### ', '')}
                    </h3>
                  );
                }
                if (paragraph.startsWith('- ')) {
                  return (
                    <li key={index} className="text-gray-700 mb-2">
                      {paragraph.replace('- ', '')}
                    </li>
                  );
                }
                if (paragraph.trim() === '') {
                  return <div key={index} className="mb-4" />;
                }
                return (
                  <p key={index} className="text-gray-700 mb-4 leading-relaxed">
                    {paragraph}
                  </p>
                );
              })}
            </div>

            {/* Tags */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full hover:bg-blue-200 transition-colors cursor-pointer"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            Comments ({post.comments.length})
          </h3>
          
          {/* Comment Form */}
          <div className="mb-8">
            <div className="flex items-start space-x-4">
              <img
                src="https://ui-avatars.com/api/?name=You&background=3B82F6&color=fff"
                alt="You"
                className="h-10 w-10 rounded-full"
              />
              <div className="flex-1">
                <textarea
                  placeholder="Share your thoughts..."
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  rows={4}
                />
                <div className="flex justify-end mt-4">
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Post Comment
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Comments List */}
          {post.comments.length === 0 ? (
            <div className="text-center py-8">
              <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No comments yet. Be the first to share your thoughts!</p>
            </div>
          ) : (
            <div className="space-y-6">
              {post.comments.map((comment) => (
                <div key={comment.id} className="flex items-start space-x-4">
                  <img
                    src={comment.author.avatar || `https://ui-avatars.com/api/?name=${comment.author.name}&background=3B82F6&color=fff`}
                    alt={comment.author.name}
                    className="h-10 w-10 rounded-full"
                  />
                  <div className="flex-1">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="font-semibold text-gray-900">{comment.author.name}</span>
                        <span className="text-sm text-gray-500">
                          {format(comment.createdAt, 'MMM dd, yyyy')}
                        </span>
                      </div>
                      <p className="text-gray-700">{comment.content}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Related Posts */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Related Posts</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockPosts
              .filter(p => p.id !== post.id && p.category.id === post.category.id)
              .slice(0, 2)
              .map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  to={`/post/${relatedPost.slug}`}
                  className="group block"
                >
                  <div className="bg-gray-50 rounded-lg overflow-hidden group-hover:shadow-md transition-shadow">
                    <img
                      src={relatedPost.featuredImage}
                      alt={relatedPost.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="p-4">
                      <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {relatedPost.title}
                      </h4>
                      <p className="text-sm text-gray-600 mt-2">{relatedPost.excerpt}</p>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetailPage;