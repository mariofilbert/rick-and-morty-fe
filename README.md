# Rick and Morty Universe Explorer

A modern, responsive web application for exploring the Rick and Morty multiverse. Browse characters, episodes, and dimensions with an immersive portal-inspired design powered by GSAP animations.

## ✨ Features

### ✅ Core Features (Complete)
- 🔍 **Search Characters** - Find your favorite characters by name with debounced search
- 🏷️ **Advanced Filters** - Filter by status, species, and gender with dropdown menus
- 📄 **Pagination** - Browse through all characters with smooth navigation controls
- 📱 **Responsive Design** - Works perfectly on mobile, tablet, and desktop (1-4 column grid)
- ⚡ **Loading States** - Skeleton loading animations and optimized performance
- 🎯 **Character Details** - Detailed character pages with origin, location, and episodes
- 📺 **Episode Explorer** - Complete episode list with character appearances
- 🚫 **Error Handling** - Graceful 404 pages and error messages
- 🖼️ **Character Cards** - Beautiful cards with images, names, and color-coded status badges

### ⭐ Enhanced Features
- ❤️ **Favorites System** - Add/remove characters from favorites with persistent storage
- 🌙 **Dark/Light Mode** - Dramatic theme switching with enhanced contrast
- 🎨 **GSAP Animations** - Smooth portal animations and floating particles on landing page
- 🎭 **Landing Page** - Immersive hero section with animated portal and feature showcase
- 🔗 **Episode Navigation** - Direct links between characters and their episodes
- 🎪 **Interactive UI** - Hover effects, transitions, and status-based colors
- ⚡ **Performance Optimized** - Core Web Vitals optimized with lazy loading
- 🛠️ **Cloudflare Ready** - Configured for deployment with OpenNext

## 🛠 Technology Stack

- **Frontend**: Next.js 15.5.7 with TypeScript and App Router
- **Styling**: Tailwind CSS 4.0 
- **Animations**: GSAP with ScrollTrigger
- **State Management**: Zustand with persist middleware
- **Testing**: Vitest + React Testing Library with 50/50 tests passing
- **API**: [Rick and Morty API](https://rickandmortyapi.com)
- **Deployment**: Cloudflare Workers with OpenNext

## 🏃‍♂️ Quick Start

### Prerequisites
- Node.js 18.x or later
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd rick_and_morty
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
# Standard Next.js build
npm run build
npm run start

# Cloudflare Workers build
npm run build:worker
npm run preview
```

## 📖 Usage

1. **Landing Page**: Start with the animated portal and feature overview
2. **Browse Characters**: Navigate to `/character` to explore all characters in a responsive grid  
3. **Search & Filter**: Use the search bar and dropdown filters for status, species, and gender
4. **Character Details**: Click any character card to view detailed information and episodes
5. **Episode Explorer**: Browse `/episodes` to see all episodes with character appearances
6. **Favorites**: Heart icon to save characters to your personal favorites list
7. **Theme Toggle**: Switch between dark and light themes with dramatic visual changes

## 🏗 Project Structure

```
├── app/                          # Next.js App Router
│   ├── character/               
│   │   ├── [id]/page.tsx        # Character detail page
│   │   └── page.tsx             # Character list page
│   ├── episodes/
│   │   ├── [id]/page.tsx        # Episode detail page  
│   │   └── page.tsx             # Episode list page
│   ├── not-found.tsx            # 404 page
│   ├── layout.tsx               # Root layout with navbar
│   ├── globals.css              # Global styles and CSS variables
│   └── page.tsx                 # Landing page with GSAP animations
├── src/
│   ├── components/              # React components
│   │   ├── character/           # Character-related components
│   │   ├── episode/             # Episode-related components
│   │   ├── common/              # Shared components
│   │   └── layout/              # Layout components (navbar, theme)
│   ├── services/                # API service layer
│   ├── store/                   # Zustand state management
│   ├── types/                   # TypeScript type definitions
│   └── hooks/                   # Custom React hooks
├── wrangler.jsonc               # Cloudflare Workers configuration
├── open-next.config.ts          # OpenNext configuration
└── next.config.ts               # Next.js configuration
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

**Test Coverage**: 50/50 tests passing with comprehensive coverage of key components.

### Test Suite Includes:
- **CharacterCard Component** (13 tests) - Rendering, interactions, favorite functionality
- **SearchBar Component** (13 tests) - Input handling, debouncing, clear functionality  
- **Favorites Store** (13 tests) - State management, persistence, localStorage integration
- **Character API Service** (11 tests) - API integration, error handling, parameter validation

### Running Tests:
```bash
# Run all tests
npm test

# Run tests in watch mode  
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Test Framework:
- **Vitest** - Fast unit test runner with ESM support
- **React Testing Library** - Component testing utilities
- **jsdom** - DOM environment for testing React components

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

## ⏱️ Development Timeline

**Total Development Time**: ~6.5 hours across multiple sessions

### Phase 1: Core Implementation (2 hours)
- ✅ Project setup with Next.js 15, TypeScript, Tailwind CSS
- ✅ Basic character list with API integration 
- ✅ Search functionality and status filtering
- ✅ Pagination and responsive design

### Phase 2: Enhanced Features (2 hours)  
- ✅ Character detail pages with episode listings
- ✅ Episode explorer with character connections
- ✅ Favorites system with persistent storage
- ✅ Dark/light theme with dramatic styling

### Phase 3: Polish & Animation (2 hours)
- ✅ Landing page with GSAP portal animations
- ✅ Advanced filtering (species, gender)
- ✅ 404 error handling and navigation improvements
- ✅ Cloudflare deployment configuration
- ✅ Performance optimizations and final polish

### Phase 4: Testing Implementation (30 minutes)
- ✅ Vitest configuration setup with React Testing Library
- ✅ CharacterCard component tests (13 tests) 
- ✅ SearchBar component tests (13 tests)
- ✅ Favorites store tests with localStorage mocking (13 tests)
- ✅ Character API service integration tests (11 tests)
- ✅ Fixed all test failures and mock implementations

### 📊 Implementation Status
- ✅ **Core Features**: Character browsing, search, filters, pagination, details
- ✅ **Episode System**: Complete episode explorer with character connections
- ✅ **User Experience**: Favorites, themes, animations, responsive design  
- ✅ **Technical Excellence**: Clean architecture, TypeScript, performance optimization
- ✅ **Quality Assurance**: 50 unit tests covering components, state, and API services
- ✅ **Production Ready**: Build successful, all tests passing, Cloudflare deployment configured
