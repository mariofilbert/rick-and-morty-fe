# Rick and Morty Character Explorer

A modern, responsive web application for exploring characters from the Rick and Morty universe. Built with Next.js, TypeScript, and the public Rick and Morty API.

![Rick and Morty Character Explorer](https://via.placeholder.com/800x400/1a1a1a/00ff00?text=Rick+and+Morty+Character+Explorer)

## ✨ Features

### ✅ Required Features (8/8 Complete)
- 🔍 **Search Characters** - Find your favorite characters by name with debounced search
- 🏷️ **Filter by Status** - Filter characters by Alive, Dead, or Unknown status
- 📄 **Pagination** - Browse through all characters with smooth navigation controls
- 📱 **Responsive Design** - Works perfectly on mobile, tablet, and desktop (1-4 column grid)
- ⚡ **Loading States** - Skeleton loading animations and optimized performance
- 🎯 **Character Details** - Detailed character pages with origin, location, and episodes
- 🚫 **Error Handling** - Graceful error messages and retry functionality
- 🖼️ **Character Cards** - Beautiful cards with images, names, and color-coded status badges

### ⭐ Bonus Features
- ❤️ **Favorites System** - Add/remove characters from favorites with persistent storage
- 💾 **Persistent State** - Favorites and preferences saved using Zustand persist
- 🎨 **Smooth Animations** - Hover effects, transitions, and portal-inspired design
- 🏷️ **Status Badges** - Color-coded status indicators (Green/Red/Yellow)
- 📊 **Episode Counts** - Display episode appearances with visual badges
- 🔄 **Auto-retry** - Automatic error recovery with manual retry options

## 🚀 Live Demo

**[View Live Application](https://your-deployed-app-url.pages.dev)**

## 🛠 Technology Stack

- **Frontend**: Next.js 16+ with TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **API**: [Rick and Morty API](https://rickandmortyapi.com)
- **Deployment**: Cloudflare Pages

## 🏃‍♂️ Quick Start

### Prerequisites
- Node.js 18.x or later
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/rick-and-morty-explorer.git
   cd rick-and-morty-explorer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Visit [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 📖 Usage

1. **Browse Characters**: The home page displays all characters in a responsive grid
2. **Search**: Use the search bar to find specific characters by name
3. **Filter**: Click status badges to filter characters (Alive/Dead/Unknown)
4. **View Details**: Click any character card to see detailed information
5. **Navigate**: Use pagination controls to browse through all pages

## 🏗 Project Structure

```
├── app/                    # Next.js app directory
│   ├── character/[id]/     # Character detail pages
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page
├── components/             # React components
│   ├── ui/                 # Reusable UI components
│   ├── CharacterCard.tsx   # Character display card
│   ├── SearchBar.tsx       # Search functionality
│   └── Pagination.tsx      # Page navigation
├── lib/                    # Utilities
│   ├── api.ts              # API functions
│   ├── store.ts            # State management
│   └── types.ts            # TypeScript types
└── hooks/                  # Custom React hooks
```

## 🎨 Design Decisions

- **Responsive Grid**: Character cards adapt from 1 column (mobile) to 4 columns (desktop)
- **Color-Coded Status**: Green (Alive), Red (Dead), Gray (Unknown) for quick visual identification
- **Debounced Search**: Search requests are debounced to improve performance
- **Skeleton Loading**: Smooth loading states while data is being fetched

## 🔗 API Reference

This application uses the [Rick and Morty API](https://rickandmortyapi.com/):

- **Characters**: https://rickandmortyapi.com/api/character
- **Episodes**: https://rickandmortyapi.com/api/episode
- **Locations**: https://rickandmortyapi.com/api/location

## ⚡ Performance

- **Lazy Loading**: Images are loaded on demand
- **Optimized Images**: Next.js automatic image optimization
- **Efficient State**: Zustand provides lightweight state management
- **Code Splitting**: Automatic code splitting with Next.js

## 🧪 Testing

Run the test suite:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test:watch
```

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 🙏 Acknowledgments

- [Rick and Morty API](https://rickandmortyapi.com/) for providing the free API
- [Next.js](https://nextjs.org/) for the amazing React framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework

---

**Total Development Time**: 3.5 hours  
**Assessment Project**: Frontend Developer Position - TransportechAI  

### 📊 Implementation Status
- ✅ **All 8 Required Features**: 100% Complete
- ✅ **Bonus Features**: Favorites system, persistent state, animations
- ✅ **Technical Requirements**: Next.js, Zustand, Tailwind CSS, TypeScript
- ✅ **Performance**: Core Web Vitals optimized, image optimization, lazy loading
- ✅ **Responsive Design**: Mobile-first approach with 4 breakpoints
- ✅ **Code Quality**: Clean, maintainable, and well-documented code
