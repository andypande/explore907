import React from 'react';
import { MapPin, Clock, Mountain, Star, Snowflake, Sun } from 'lucide-react';
import type { Activity } from '../types/activity';
import clsx from 'clsx';

interface ActivityCardProps {
  activity: Activity;
  onClick?: () => void;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ activity, onClick }) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Tough': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRatingColor = (rating: string) => {
    if (rating.includes('Top 20')) return 'bg-purple-100 text-purple-800';
    if (rating.includes('Main Event')) return 'bg-blue-100 text-blue-800';
    if (rating.includes('Worth Doing')) return 'bg-green-100 text-green-800';
    return 'bg-gray-100 text-gray-800';
  };

  const getActivityIcon = (activityType: string) => {
    switch (activityType) {
      case 'Hike': return '🥾';
      case 'Bike': return '🚴';
      case 'Ski': return '⛷️';
      case 'Paddle': return '🚣';
      case 'Fish': return '🎣';
      case 'Drive': return '🚗';
      case 'Tour': return '🎯';
      default: return '🏔️';
    }
  };

  return (
    <div 
      className="card cursor-pointer group hover:scale-[1.02] transform transition-all duration-200 active:scale-[0.98]"
      onClick={onClick}
    >
      {/* Image */}
      <div className="h-48 sm:h-64 rounded-t-xl relative overflow-hidden">
        {activity.imageUrl ? (
          <img 
            src={activity.imageUrl} 
            alt={activity.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="h-full bg-gradient-to-br from-alaska-blue to-alaska-green flex items-center justify-center">
            <Mountain className="w-16 h-16 text-white opacity-50" />
          </div>
        )}
        <div className="absolute inset-0 bg-black bg-opacity-20" />
        
        {/* Season indicators */}
        <div className="absolute top-3 right-3 flex space-x-1">
          {activity.season.map(season => (
            <div key={season} className="bg-white bg-opacity-90 rounded-full p-1">
              {season === 'Summer' ? (
                <Sun className="w-4 h-4 text-yellow-600" />
              ) : (
                <Snowflake className="w-4 h-4 text-blue-600" />
              )}
            </div>
          ))}
        </div>

        {/* Activity types */}
        <div className="absolute bottom-3 left-3 flex space-x-1">
          {activity.activities.slice(0, 3).map(activityType => (
            <span key={activityType} className="text-2xl" title={activityType}>
              {getActivityIcon(activityType)}
            </span>
          ))}
          {activity.activities.length > 3 && (
            <span className="bg-white bg-opacity-90 rounded-full px-2 py-1 text-xs font-medium text-gray-700">
              +{activity.activities.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5">
        {/* Header */}
        <div className="mb-3">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 group-hover:text-alaska-blue transition-colors duration-200 mb-2 leading-tight">
            {activity.title}
          </h3>
          
          <div className="flex items-center text-xs sm:text-sm text-gray-600 mb-2">
            <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1 flex-shrink-0" />
            <span className="truncate">{activity.location}</span>
            <span className="mx-1 sm:mx-2">•</span>
            <span className="font-medium text-alaska-blue truncate">{activity.area}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-700 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-3 leading-relaxed">
          {activity.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className={clsx(
            'px-2 py-1 rounded-full text-xs font-medium',
            getDifficultyColor(activity.difficulty)
          )}>
            {activity.difficulty}
          </span>
          
          <span className={clsx(
            'px-2 py-1 rounded-full text-xs font-medium',
            getRatingColor(activity.rating)
          )}>
            {activity.rating}
          </span>
          
          <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-medium flex items-center">
            <Clock className="w-3 h-3 mr-1" />
            {activity.timeRequired}
          </span>
        </div>

        {/* Stats */}
        {(activity.distance || activity.elevationGain) && (
          <div className="flex flex-col sm:flex-row text-xs sm:text-sm text-gray-600 space-y-1 sm:space-y-0 sm:space-x-4">
            {activity.distance && (
              <div className="flex items-center">
                <span className="font-medium">Distance:</span>
                <span className="ml-1">{activity.distance}</span>
              </div>
            )}
            {activity.elevationGain && (
              <div className="flex items-center">
                <span className="font-medium">Elevation:</span>
                <span className="ml-1">{activity.elevationGain}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityCard; 