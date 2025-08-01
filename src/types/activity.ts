export interface Activity {
  id: string;
  title: string;
  description: string;
  location: string;
  area: Area;
  activities: ActivityType[];
  difficulty: Difficulty;
  rating: Rating;
  season: Season[];
  timeRequired: TimeRequired;
  distance?: string;
  elevationGain?: string;
  imageUrl?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  tips?: string;
  mapLink?: string;
  allTrailsLink?: string;
}

export type Area = 
  | 'Anchorage'
  | 'Fairbanks-Denali'
  | 'Kenai'
  | 'Mat-Su'
  | 'Southeast'
  | 'Valdez';

export type ActivityType = 
  | 'Bike'
  | 'Drive'
  | 'Fish'
  | 'Hike'
  | 'Paddle'
  | 'Ski'
  | 'Tour';

export type Difficulty = 'Easy' | 'Medium' | 'Tough';

export type Rating = 
  | '1: Top 20'
  | '2: Main Event'
  | '3: Worth Doing'
  | '4: Side Trips';

export type Season = 'Summer' | 'Winter';

export type TimeRequired = 'Few Hours' | 'Full Day' | 'Weekend';

export interface Filters {
  activities: ActivityType[];
  areas: Area[];
  difficulties: Difficulty[];
  ratings: Rating[];
  seasons: Season[];
  timeRequired: TimeRequired[];
  searchQuery: string;
}

export type SortOption = 'title' | 'rating' | 'difficulty' | 'area';
export type SortDirection = 'asc' | 'desc'; 