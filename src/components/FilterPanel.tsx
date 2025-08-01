import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Filter, X } from 'lucide-react';
import type { Filters, ActivityType, Area, Difficulty, Rating, Season, TimeRequired } from '../types/activity';
import clsx from 'clsx';

interface FilterPanelProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
  onClearFilters: () => void;
  activeFilterCount: number;
  onClose?: () => void;
  isMobile?: boolean;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  onFiltersChange,
  onClearFilters,
  activeFilterCount,
  onClose,
  isMobile = false
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['activities', 'areas']));

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(section)) {
      newExpanded.delete(section);
    } else {
      newExpanded.add(section);
    }
    setExpandedSections(newExpanded);
  };

  const updateFilter = (
    filterType: keyof Filters,
    value: any,
    checked: boolean
  ) => {
    const currentValues = filters[filterType] as any[];
    const newValues = checked
      ? [...currentValues, value]
      : currentValues.filter(v => v !== value);
    
    onFiltersChange({
      ...filters,
      [filterType]: newValues
    });
  };

  const activities: ActivityType[] = ['Bike', 'Drive', 'Fish', 'Hike', 'Paddle', 'Ski', 'Tour'];
  const areas: Area[] = ['Anchorage', 'Fairbanks-Denali', 'Kenai', 'Mat-Su', 'Southeast', 'Valdez'];
  const difficulties: Difficulty[] = ['Easy', 'Medium', 'Tough'];
  const ratings: Rating[] = ['1: Top 20', '2: Main Event', '3: Worth Doing', '4: Side Trips'];
  const seasons: Season[] = ['Summer', 'Winter'];
  const timeRequiredOptions: TimeRequired[] = ['Few Hours', 'Full Day', 'Weekend'];

  const FilterSection = ({ 
    title, 
    items, 
    filterKey, 
    sectionKey 
  }: { 
    title: string; 
    items: string[]; 
    filterKey: keyof Filters;
    sectionKey: string;
  }) => (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        onClick={() => toggleSection(sectionKey)}
        className="w-full flex items-center justify-between py-4 sm:py-3 px-4 text-left hover:bg-gray-50 active:bg-gray-100 transition-colors min-h-[60px] sm:min-h-0"
      >
        <span className="font-medium text-gray-900 text-base sm:text-sm">{title}</span>
        {expandedSections.has(sectionKey) ? (
          <ChevronUp className="w-6 h-6 sm:w-4 sm:h-4 text-gray-500" />
        ) : (
          <ChevronDown className="w-6 h-6 sm:w-4 sm:h-4 text-gray-500" />
        )}
      </button>
      
      {expandedSections.has(sectionKey) && (
        <div className="px-4 pb-4 sm:pb-3 space-y-3 sm:space-y-2">
          {items.map(item => {
            const isChecked = (filters[filterKey] as string[]).includes(item);
            return (
              <label 
                key={item} 
                className="flex items-center space-x-4 sm:space-x-2 cursor-pointer py-3 sm:py-1 px-3 sm:px-2 -mx-3 sm:-mx-2 rounded-lg hover:bg-gray-50 active:bg-gray-100 transition-colors min-h-[48px] sm:min-h-0"
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={(e) => updateFilter(filterKey, item, e.target.checked)}
                  className="w-6 h-6 sm:w-4 sm:h-4 rounded border-2 border-gray-300 text-alaska-blue focus:ring-2 focus:ring-alaska-blue focus:ring-offset-2 flex-shrink-0"
                />
                <span className="text-base sm:text-sm text-gray-700 font-medium leading-none select-none">{item}</span>
              </label>
            );
          })}
        </div>
      )}
    </div>
  );

  return (
    <>
      {!isMobile && (
        <>
          {/* Mobile Filter Toggle - Only show when not in mobile overlay */}
          <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-4">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center justify-between w-full min-h-[56px] py-3 px-2 rounded-lg hover:bg-gray-50 active:bg-gray-100 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <Filter className="w-6 h-6 text-gray-600" />
                <span className="font-medium text-gray-900 text-base">Filters</span>
                {activeFilterCount > 0 && (
                  <span className="bg-alaska-blue text-white text-sm px-3 py-1 rounded-full font-medium">
                    {activeFilterCount}
                  </span>
                )}
              </div>
              {isExpanded ? (
                <ChevronUp className="w-6 h-6 text-gray-500" />
              ) : (
                <ChevronDown className="w-6 h-6 text-gray-500" />
              )}
            </button>
          </div>
        </>
      )}

      {/* Filter Panel */}
      <div className={clsx(
        "bg-white",
        isMobile ? "h-full" : "border-r border-gray-200",
        !isMobile && "lg:block lg:w-80 lg:flex-shrink-0",
        !isMobile && (isExpanded ? "block" : "hidden lg:block")
      )}>
        <div className="h-full overflow-y-auto">
          {/* Header */}
          <div className="px-4 py-5 sm:py-4 border-b border-gray-200">
            <div className="flex items-center justify-between min-h-[48px] sm:min-h-0">
              <h2 className="text-xl sm:text-lg font-semibold text-gray-900">Filters</h2>
              <div className="flex items-center space-x-3 sm:space-x-2">
                {activeFilterCount > 0 && (
                  <button
                    onClick={onClearFilters}
                    className="flex items-center space-x-2 sm:space-x-1 text-base sm:text-sm text-alaska-blue hover:text-blue-700 active:text-blue-800 py-2 px-3 sm:py-1 sm:px-2 rounded-lg hover:bg-blue-50 active:bg-blue-100 transition-colors min-h-[44px] sm:min-h-0"
                  >
                    <X className="w-5 h-5 sm:w-4 sm:h-4" />
                    <span className="font-medium">Clear all</span>
                  </button>
                )}
                {isMobile && onClose && (
                  <button
                    onClick={onClose}
                    className="p-3 sm:p-1 text-gray-500 hover:text-gray-700 active:text-gray-800 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors min-h-[44px] min-w-[44px] sm:min-h-0 sm:min-w-0 flex items-center justify-center"
                  >
                    <X className="w-6 h-6 sm:w-5 sm:h-5" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Filter Sections */}
          <div className="divide-y divide-gray-200">
            <FilterSection
              title="Activities"
              items={activities}
              filterKey="activities"
              sectionKey="activities"
            />
            
            <FilterSection
              title="Areas"
              items={areas}
              filterKey="areas"
              sectionKey="areas"
            />
            
            <FilterSection
              title="Difficulty"
              items={difficulties}
              filterKey="difficulties"
              sectionKey="difficulties"
            />
            
            <FilterSection
              title="Rating"
              items={ratings}
              filterKey="ratings"
              sectionKey="ratings"
            />
            
            <FilterSection
              title="Season"
              items={seasons}
              filterKey="seasons"
              sectionKey="seasons"
            />
            
            <FilterSection
              title="Time Required"
              items={timeRequiredOptions}
              filterKey="timeRequired"
              sectionKey="timeRequired"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterPanel; 