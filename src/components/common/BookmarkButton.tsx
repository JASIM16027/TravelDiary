import React, { useState } from 'react';
import { Bookmark } from 'lucide-react';

interface BookmarkButtonProps {
  postId: string;
  isBookmarked: boolean;
  onToggle: (postId: string, isBookmarked: boolean) => void;
  size?: 'small' | 'medium' | 'large';
  showText?: boolean;
}

const BookmarkButton: React.FC<BookmarkButtonProps> = ({
  postId,
  isBookmarked,
  onToggle,
  size = 'medium',
  showText = false,
}) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    setIsAnimating(true);
    onToggle(postId, !isBookmarked);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const sizeClasses = {
    small: 'h-4 w-4',
    medium: 'h-5 w-5',
    large: 'h-6 w-6',
  };

  const buttonSizeClasses = {
    small: 'p-1',
    medium: 'p-2',
    large: 'p-3',
  };

  return (
    <button
      onClick={handleClick}
      className={`${buttonSizeClasses[size]} rounded-full transition-all duration-200 ${
        isBookmarked
          ? 'bg-yellow-100 text-yellow-600 hover:bg-yellow-200'
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
      } ${isAnimating ? 'scale-110' : ''}`}
    >
      <div className="flex items-center space-x-1">
        <Bookmark
          className={`${sizeClasses[size]} transition-all duration-200 ${
            isBookmarked ? 'fill-current' : ''
          }`}
        />
        {showText && (
          <span className="text-sm font-medium">
            {isBookmarked ? 'Saved' : 'Save'}
          </span>
        )}
      </div>
    </button>
  );
};

export default BookmarkButton;