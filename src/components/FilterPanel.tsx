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
        className="w-full flex items-center justify-between py-3 px-4 text-left hover:bg-gray-50"
      >
        <span className="font-medium text-gray-900">{title}</span>
        {expandedSections.has(sectionKey) ? (
          <ChevronUp className="w-4 h-4 text-gray-500" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-500" />
        )}
      </button>
      
      {expandedSections.has(sectionKey) && (
        <div className="px-4 pb-3 space-y-2">
          {items.map(item => {
            const isChecked = (filters[filterKey] as string[]).includes(item);
            return (
              <label key={item} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={(e) => updateFilter(filterKey, item, e.target.checked)}
                  className="rounded border-gray-300 text-alaska-blue focus:ring-alaska-blue"
                />
                <span className="text-sm text-gray-700">{item}</span>
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
          <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center justify-between w-full"
            >
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-gray-600" />
                <span className="font-medium text-gray-900">Filters</span>
                {activeFilterCount > 0 && (
                  <span className="bg-alaska-blue text-white text-xs px-2 py-1 rounded-full">
                    {activeFilterCount}
                  </span>
                )}
              </div>
              {isExpanded ? (
                <ChevronUp className="w-5 h-5 text-gray-500" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-500" />
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
          <div className="px-4 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
              <div className="flex items-center space-x-2">
                {activeFilterCount > 0 && (
                  <button
                    onClick={onClearFilters}
                    className="flex items-center space-x-1 text-sm text-alaska-blue hover:text-blue-700"
                  >
                    <X className="w-4 h-4" />
                    <span>Clear all</span>
                  </button>
                )}
                {isMobile && onClose && (
                  <button
                    onClick={onClose}
                    className="p-1 text-gray-500 hover:text-gray-700"
                  >
                    <X className="w-5 h-5" />
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