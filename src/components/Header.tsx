import React from 'react';
import { Mountain, Search, Filter } from 'lucide-react';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onMobileFilterToggle: () => void;
  activeFilterCount: number;
}

const Header: React.FC<HeaderProps> = ({ 
  searchQuery, 
  onSearchChange, 
  onMobileFilterToggle, 
  activeFilterCount 
}) => {
  return (
    <header className="bg-alaska-hero sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="bg-white rounded-full p-2">
              <Mountain className="w-8 h-8 text-alaska-blue" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Explore 907</h1>
              <p className="text-blue-100 text-sm">Discover Alaska's Adventures</p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search activities, locations..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-alaska-blue focus:border-transparent"
              />
            </div>
          </div>

          {/* Mobile Filter Button */}
          <div className="lg:hidden">
            <button 
              onClick={onMobileFilterToggle}
              className="text-white relative p-2 rounded-lg hover:bg-white hover:bg-opacity-20 transition-colors"
            >
              <Filter className="w-6 h-6" />
              {activeFilterCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-alaska-green text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden mt-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search activities..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-alaska-blue focus:border-transparent"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 