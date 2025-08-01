import { useState, useMemo } from 'react';
import Header from './components/Header';
import FilterPanel from './components/FilterPanel';
import SortControls from './components/SortControls';
import ActivityCard from './components/ActivityCard';
import { activities } from './data/activities';
import type { Filters, SortOption, SortDirection } from './types/activity';
import clsx from 'clsx';

function App() {
  const [filters, setFilters] = useState<Filters>({
    activities: [],
    areas: [],
    difficulties: [],
    ratings: [],
    seasons: [],
    timeRequired: [],
    searchQuery: ''
  });

  const [sortBy, setSortBy] = useState<SortOption>('title');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Filter activities based on current filters
  const filteredActivities = useMemo(() => {
    return activities.filter(activity => {
      // Search query filter
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        const matchesSearch = 
          activity.title.toLowerCase().includes(query) ||
          activity.description.toLowerCase().includes(query) ||
          activity.location.toLowerCase().includes(query) ||
          activity.area.toLowerCase().includes(query);
        
        if (!matchesSearch) return false;
      }

      // Activity type filter
      if (filters.activities.length > 0) {
        const hasMatchingActivity = activity.activities.some(activityType => 
          filters.activities.includes(activityType)
        );
        if (!hasMatchingActivity) return false;
      }

      // Area filter
      if (filters.areas.length > 0 && !filters.areas.includes(activity.area)) {
        return false;
      }

      // Difficulty filter
      if (filters.difficulties.length > 0 && !filters.difficulties.includes(activity.difficulty)) {
        return false;
      }

      // Rating filter
      if (filters.ratings.length > 0 && !filters.ratings.includes(activity.rating)) {
        return false;
      }

      // Season filter
      if (filters.seasons.length > 0) {
        const hasMatchingSeason = activity.season.some(season => 
          filters.seasons.includes(season)
        );
        if (!hasMatchingSeason) return false;
      }

      // Time required filter
      if (filters.timeRequired.length > 0 && !filters.timeRequired.includes(activity.timeRequired)) {
        return false;
      }

      return true;
    });
  }, [filters]);

  // Sort filtered activities
  const sortedActivities = useMemo(() => {
    const sorted = [...filteredActivities];
    
    sorted.sort((a, b) => {
      let aValue: string | number;
      let bValue: string | number;

      switch (sortBy) {
        case 'title':
          aValue = a.title.toLowerCase();
          bValue = b.title.toLowerCase();
          break;
        case 'rating':
          // Convert rating to numeric for sorting
          aValue = a.rating.includes('Top 20') ? 1 : 
                   a.rating.includes('Main Event') ? 2 :
                   a.rating.includes('Worth Doing') ? 3 : 4;
          bValue = b.rating.includes('Top 20') ? 1 : 
                   b.rating.includes('Main Event') ? 2 :
                   b.rating.includes('Worth Doing') ? 3 : 4;
          break;
        case 'difficulty':
          // Convert difficulty to numeric for sorting
          aValue = a.difficulty === 'Easy' ? 1 : a.difficulty === 'Medium' ? 2 : 3;
          bValue = b.difficulty === 'Easy' ? 1 : b.difficulty === 'Medium' ? 2 : 3;
          break;
        case 'area':
          aValue = a.area.toLowerCase();
          bValue = b.area.toLowerCase();
          break;
        default:
          aValue = a.title.toLowerCase();
          bValue = b.title.toLowerCase();
      }

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return sorted;
  }, [filteredActivities, sortBy, sortDirection]);

  // Calculate active filter count
  const activeFilterCount = useMemo(() => {
    return filters.activities.length + 
           filters.areas.length + 
           filters.difficulties.length + 
           filters.ratings.length + 
           filters.seasons.length + 
           filters.timeRequired.length +
           (filters.searchQuery ? 1 : 0);
  }, [filters]);

  const handleSortChange = (newSortBy: SortOption, newDirection: SortDirection) => {
    setSortBy(newSortBy);
    setSortDirection(newDirection);
  };

  const handleClearFilters = () => {
    setFilters({
      activities: [],
      areas: [],
      difficulties: [],
      ratings: [],
      seasons: [],
      timeRequired: [],
      searchQuery: ''
    });
  };

  const handleSearchChange = (query: string) => {
    setFilters(prev => ({ ...prev, searchQuery: query }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        searchQuery={filters.searchQuery}
        onSearchChange={handleSearchChange}
        onMobileFilterToggle={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
        activeFilterCount={activeFilterCount}
      />
      
      <div className="flex">
        {/* Desktop Filter Panel */}
        <div className="hidden lg:block">
          <FilterPanel
            filters={filters}
            onFiltersChange={setFilters}
            onClearFilters={handleClearFilters}
            activeFilterCount={activeFilterCount}
          />
        </div>

        {/* Mobile Filter Panel Overlay */}
        {isMobileFilterOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex">
            <div 
              className="fixed inset-0 bg-black bg-opacity-50"
              onClick={() => setIsMobileFilterOpen(false)}
            />
            <div className="relative bg-white w-80 max-w-[80vw] h-full overflow-y-auto">
              <FilterPanel
                filters={filters}
                onFiltersChange={setFilters}
                onClearFilters={handleClearFilters}
                activeFilterCount={activeFilterCount}
                onClose={() => setIsMobileFilterOpen(false)}
                isMobile={true}
              />
            </div>
          </div>
        )}
        
        <div className="flex-1 flex flex-col min-h-[calc(100vh-80px)]">
          <SortControls
            sortBy={sortBy}
            sortDirection={sortDirection}
            onSortChange={handleSortChange}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            resultCount={sortedActivities.length}
          />
          
          <div className="flex-1 p-4 sm:p-6">
            {sortedActivities.length === 0 ? (
              <div className="text-center py-8 sm:py-12">
                <div className="text-gray-400 text-4xl sm:text-6xl mb-4">🏔️</div>
                <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">No activities found</h3>
                <p className="text-gray-600 max-w-md mx-auto text-sm sm:text-base">
                  Try adjusting your filters or search terms to find more activities.
                </p>
                <button
                  onClick={handleClearFilters}
                  className="mt-4 btn-primary"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className={clsx(
                viewMode === 'grid' 
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6'
                  : 'space-y-4'
              )}>
                {sortedActivities.map(activity => (
                  <ActivityCard
                    key={activity.id}
                    activity={activity}
                    onClick={() => {
                      // TODO: Implement activity detail modal or navigation
                      console.log('Selected activity:', activity);
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App; 