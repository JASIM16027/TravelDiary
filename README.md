# TravelDiary 📸✈️

A modern, responsive travel blog platform built with React, TypeScript, and Tailwind CSS. Share your travel adventures, discover new destinations, and connect with fellow travel enthusiasts.

## 🌟 Features

### Core Functionality
- **User Authentication & Registration** - Secure user accounts with email verification
- **Travel Story Creation** - Rich text editor for creating detailed travel posts
- **Image Galleries** - Upload and showcase multiple photos from your journeys
- **Social Features** - Like, bookmark, share, and comment on travel stories
- **User Profiles** - Comprehensive profiles with social links and travel statistics
- **Search & Filtering** - Advanced search with filters for categories, locations, and difficulty levels

### Travel-Specific Features
- **Location Tagging** - Add GPS coordinates and location names to your posts
- **Travel Dates** - Specify start and end dates for your trips
- **Budget Tracking** - Include budget information with currency support
- **Difficulty Levels** - Rate adventures from easy to extreme
- **Seasonal Recommendations** - Tag posts with recommended travel seasons
- **Categories** - Organize content by Heritage, Nature, Food, Adventure, and more

### User Experience
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **Dark/Light Mode** - Customizable theme preferences
- **Analytics Dashboard** - Track your post performance and audience insights
- **Bookmark System** - Save your favorite travel stories for later
- **Notification System** - Stay updated with likes, comments, and follows
- **SEO Optimized** - Clean URLs and meta tags for better search visibility

## 🚀 Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, PostCSS
- **Routing**: React Router DOM v7
- **Icons**: Lucide React
- **Authentication**: Custom auth context with bcryptjs
- **Security**: Google reCAPTCHA integration
- **Date Handling**: date-fns
- **Development**: ESLint, TypeScript ESLint

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/traveldiary.git
   cd traveldiary
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application.

## 🛠️ Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check for code quality issues

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── common/         # Common components (PostCard, SearchBar, etc.)
│   └── layout/         # Layout components (Header, Footer)
├── contexts/           # React contexts (AuthContext)
├── data/              # Mock data and sample content
├── pages/             # Page components
├── types/             # TypeScript type definitions
├── utils/             # Utility functions
└── App.tsx            # Main application component
```

## 🎨 Key Components

### Pages
- **HomePage** - Landing page with featured content and statistics
- **PostsPage** - Browse all travel stories with filtering options
- **PostDetailPage** - Individual post view with comments and interactions
- **CreatePostPage** - Rich editor for creating new travel stories
- **UserProfilePage** - User profiles with travel statistics
- **AnalyticsPage** - Performance analytics and insights
- **BookmarksPage** - Saved travel stories

### Common Components
- **PostCard** - Displays travel story previews
- **ImageGallery** - Photo gallery with lightbox functionality
- **SearchBar** - Advanced search with filters
- **BookmarkButton** - Save/unsave posts
- **ShareButton** - Social media sharing
- **NotificationDropdown** - Real-time notifications

## 🔐 Authentication

The application includes a comprehensive authentication system with:
- User registration with email verification
- Secure password requirements with strength indicator
- Google reCAPTCHA integration for bot protection
- Password hashing using bcryptjs
- Session management with React Context

## 📱 Responsive Design

TravelDiary is fully responsive and optimized for:
- **Desktop** (1200px+) - Full feature set with sidebar navigation
- **Tablet** (768px - 1199px) - Adapted layout with collapsible menus
- **Mobile** (320px - 767px) - Touch-friendly interface with bottom navigation

## 🌍 Travel Categories

- **Heritage** 🏯 - Historical landmarks and cultural sites
- **Nature** 🌿 - Natural beauty, hills, rivers, and wildlife
- **Food** 🍛 - Street food and traditional dishes
- **Adventure** ⛰️ - Outdoor activities and extreme sports
- **City Life** 🏙️ - Urban exploration and city guides
- **Beaches** 🏖️ - Coastal destinations and beach activities
- **Mountains** 🏔️ - Hill stations and mountain adventures
- **Festivals** 🎉 - Cultural events and celebrations

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

### Deploy to Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts to deploy

### Deploy to Netlify
1. Build the project: `npm run build`
2. Upload the `dist/` folder to Netlify
3. Configure redirects for SPA routing

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Jasim Uddin**
- Email: jasimcse27@gmail.com
- Instagram: [@jasim_travels](https://instagram.com/jasim_travels)
- Location: Mirpur, Dhaka, Bangladesh

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - The web framework used
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Lucide React](https://lucide.dev/) - Beautiful icons
- [Vite](https://vitejs.dev/) - Build tool and dev server
- [TypeScript](https://www.typescriptlang.org/) - Type safety

## 📞 Support

If you have any questions or need help, please:
- Open an issue on GitHub
- Contact me at jasimcse27@gmail.com
- Follow me on Instagram for travel updates

---

**Happy Traveling! 🌍✈️📸**