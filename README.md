# Explore 907 Redesign

A modern, user-friendly redesign of the Explore 907 website for discovering outdoor activities in Alaska.

## Features

### 🎨 Modern UI/UX
- Clean, responsive design with Alaska-inspired color scheme
- Intuitive card-based layout for activities
- Smooth animations and transitions
- Mobile-first responsive design

### 🔍 Enhanced Search & Filtering
- Real-time search across activity names, descriptions, and locations
- Multi-category filtering system:
  - Activity types (Hike, Bike, Ski, Paddle, Fish, Drive, Tour)
  - Geographic areas (Anchorage, Kenai, Mat-Su, etc.)
  - Difficulty levels (Easy, Medium, Tough)
  - Ratings (Top 20, Main Event, Worth Doing, Side Trips)
  - Seasons (Summer, Winter)
  - Time requirements (Few Hours, Full Day, Weekend)
- Collapsible filter sections for better mobile experience
- Active filter count indicators
- One-click filter clearing

### 📊 Smart Sorting
- Sort by name, rating, difficulty, or area
- Toggle between ascending and descending order
- Visual indicators for current sort direction

### 👀 Flexible View Modes
- Grid view for visual browsing
- List view for detailed comparison
- Responsive layouts that adapt to screen size

### 📱 Mobile Optimized
- Collapsible mobile filter panel
- Touch-friendly interface
- Optimized typography and spacing
- Smooth scrolling and interactions

## Tech Stack

- **React 18** with TypeScript for type safety
- **Vite** for fast development and building
- **TailwindCSS** for modern styling
- **Lucide React** for beautiful icons
- **Framer Motion** for smooth animations
- **clsx** for conditional class management

## Project Structure

```
src/
├── components/          # React components
│   ├── Header.tsx      # Navigation and search
│   ├── FilterPanel.tsx # Filtering interface
│   ├── SortControls.tsx # Sorting and view controls
│   └── ActivityCard.tsx # Activity display cards
├── data/               # Static data
│   └── activities.ts   # Activity dataset
├── types/              # TypeScript definitions
│   └── activity.ts     # Type definitions
└── App.tsx            # Main application component
```

## Key Improvements Over Original

### Navigation & Usability
- ✅ Replaced clunky filter/sort UI with intuitive controls
- ✅ Added real-time search functionality
- ✅ Improved mobile navigation with collapsible panels
- ✅ Clear visual hierarchy and information architecture

### Visual Design
- ✅ Modern card-based layout vs. plain text list
- ✅ Color-coded difficulty and rating badges
- ✅ Activity type icons for quick recognition
- ✅ Season indicators (summer/winter)
- ✅ Consistent spacing and typography

### Performance & Experience
- ✅ Fast client-side filtering and sorting
- ✅ Responsive design for all screen sizes
- ✅ Smooth animations and transitions
- ✅ Accessible design patterns

### Data Organization
- ✅ Structured TypeScript types for data consistency
- ✅ Enhanced activity metadata (distance, elevation, etc.)
- ✅ Flexible filtering system
- ✅ Logical categorization

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

## Future Enhancements

- 🗺️ Interactive map integration
- 📷 Image galleries for activities
- ⭐ User reviews and ratings
- 📍 GPS coordinates and directions
- 📱 Progressive Web App features
- 🔗 Social sharing capabilities
- 📊 Analytics and activity tracking

## Contributing

This is a demonstration project showcasing modern web development practices for outdoor activity discovery platforms.

## License

MIT License - feel free to use this code for your own projects! 
