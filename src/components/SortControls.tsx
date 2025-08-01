import React from 'react';
import { ArrowUpDown, Grid, List, SortAsc, SortDesc } from 'lucide-react';
import type { SortOption, SortDirection } from '../types/activity';
import clsx from 'clsx';

interface SortControlsProps {
  sortBy: SortOption;
  sortDirection: SortDirection;
  onSortChange: (sortBy: SortOption, direction: SortDirection) => void;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
  resultCount: number;
}

const SortControls: React.FC<SortControlsProps> = ({
  sortBy,
  sortDirection,
  onSortChange,
  viewMode,
  onViewModeChange,
  resultCount
}) => {
  const sortOptions: { value: SortOption; label: string }[] = [
    { value: 'title', label: 'Name' },
    { value: 'rating', label: 'Rating' },
    { value: 'difficulty', label: 'Difficulty' },
    { value: 'area', label: 'Area' }
  ];

  const handleSortChange = (newSortBy: SortOption) => {
    if (newSortBy === sortBy) {
      // Toggle direction if same sort option
      onSortChange(sortBy, sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // Use ascending for new sort option
      onSortChange(newSortBy, 'asc');
    }
  };

  return (
    <div className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
        {/* Results count */}
        <div className="text-sm text-gray-600">
          <span className="font-medium text-gray-900">{resultCount}</span> activities found
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
          {/* Sort controls */}
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700">Sort by:</span>
            <div className="flex items-center space-x-1 flex-wrap gap-1">
              {sortOptions.map(option => (
                <button
                  key={option.value}
                  onClick={() => handleSortChange(option.value)}
                  className={clsx(
                    'px-2 sm:px-3 py-1.5 text-xs sm:text-sm font-medium rounded-md transition-colors duration-200 flex items-center space-x-1 whitespace-nowrap',
                    sortBy === option.value
                      ? 'bg-alaska-blue text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  )}
                >
                  <span>{option.label}</span>
                  {sortBy === option.value && (
                    sortDirection === 'asc' ? (
                      <SortAsc className="w-3 h-3" />
                    ) : (
                      <SortDesc className="w-3 h-3" />
                    )
                  )}
                </button>
              ))}
            </div>
          </div>
          {/* View mode toggle */}
          <div className="hidden sm:flex items-center bg-gray-100 rounded-lg p-1 self-start sm:self-auto">
            <button
              onClick={() => onViewModeChange('grid')}
              className={clsx(
                'p-1.5 rounded-md transition-colors duration-200',
                viewMode === 'grid'
                  ? 'bg-white text-alaska-blue shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              )}
              title="Grid view"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => onViewModeChange('list')}
              className={clsx(
                'p-1.5 rounded-md transition-colors duration-200',
                viewMode === 'list'
                  ? 'bg-white text-alaska-blue shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              )}
              title="List view"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SortControls; 