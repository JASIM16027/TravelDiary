import React, { useState } from 'react';
import { Share2, Copy, Facebook, Twitter, Link, Mail } from 'lucide-react';

interface ShareButtonProps {
  url: string;
  title: string;
  description?: string;
  size?: 'small' | 'medium' | 'large';
}

const ShareButton: React.FC<ShareButtonProps> = ({
  url,
  title,
  description = '',
  size = 'medium',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

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

  const shareOptions = [
    {
      name: 'Copy Link',
      icon: Copy,
      action: () => {
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        setIsOpen(false);
      },
    },
    {
      name: 'Facebook',
      icon: Facebook,
      action: () => {
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
          '_blank',
          'width=600,height=400'
        );
        setIsOpen(false);
      },
    },
    {
      name: 'Twitter',
      icon: Twitter,
      action: () => {
        window.open(
          `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
          '_blank',
          'width=600,height=400'
        );
        setIsOpen(false);
      },
    },
    {
      name: 'Email',
      icon: Mail,
      action: () => {
        window.location.href = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(
          `${description}\n\n${url}`
        )}`;
        setIsOpen(false);
      },
    },
  ];

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: description,
          url,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={handleNativeShare}
        className={`${buttonSizeClasses[size]} bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition-colors`}
      >
        <Share2 className={sizeClasses[size]} />
      </button>

      {isOpen && !navigator.share && (
        <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 min-w-48">
          {shareOptions.map((option) => (
            <button
              key={option.name}
              onClick={option.action}
              className="flex items-center space-x-3 w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors"
            >
              <option.icon className="h-4 w-4 text-gray-600" />
              <span className="text-sm text-gray-700">
                {option.name === 'Copy Link' && copied ? 'Copied!' : option.name}
              </span>
            </button>
          ))}
        </div>
      )}

      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default ShareButton;