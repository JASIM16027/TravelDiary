import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, MapPin, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold text-blue-400 mb-4">Travel Diary</h3>
            <p className="text-gray-300 mb-6 max-w-md">
              Your ultimate travel companion, sharing inspiring stories, practical tips, and unforgettable experiences from around the world.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/posts" className="text-gray-300 hover:text-blue-400 transition-colors">
                  All Posts
                </Link>
              </li>
              <li>
                <Link to="/categories" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Categories
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-blue-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Categories</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/category/adventure" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Adventure
                </Link>
              </li>
              <li>
                <Link to="/category/culture" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Culture
                </Link>
              </li>
              <li>
                <Link to="/category/food" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Food
                </Link>
              </li>
              <li>
                <Link to="/category/nature" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Nature
                </Link>
              </li>
              <li>
                <Link to="/category/city" className="text-gray-300 hover:text-blue-400 transition-colors">
                  City Guides
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm">
              © 2024  Travel Diary. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">
                Terms of Service
              </Link>
              <Link to="/sitemap" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;